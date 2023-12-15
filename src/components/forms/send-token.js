import { Suspense, useContext, useEffect, useRef, useState } from "react";
import Preloader from "../shared/preloader";
import QrPayTab from "../web/tabs/qr-pay";
import EmailPayTab from "../web/tabs/email-pay";
import PhonePayTab from "../web/tabs/phone-pay";
import WalletPayTab from "../web/tabs/wallet-pay";
import { useNavigate } from "react-router-dom";
import { BiDollar } from "react-icons/bi";
import { MemStorage } from "../../contexts/storage";
import { CONTRACT_ABI, CONTRACT_ADDRESS, Tokens, chains } from "../../constants";
import { GlobalContext } from "../../contexts/global";
import { message } from "antd";
import { BrowserProvider, ethers, parseEther } from "ethers";


const SendTokenForm = ({ route, data }) => {
    const { account } = useContext(GlobalContext);
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());

    const { gStorage } = useContext(MemStorage);
    const { toast } = useContext(GlobalContext);
    const [view, setView] = useState('loading');
    const navigate = useNavigate(),
        [upiInput, setUpiInput] = useState(data?.data.upi),
        [emailInput, setEmailInput] = useState(data?.data.email),
        [phoneInput, setPhoneInput] = useState(data?.data.phone),
        [walletInput, setWalletInput] = useState(data?.data.walletAddr),
        [amountInput, setAmountInput] = useState(data?.data.amount),
        [chainInput, setChainInput] = useState(data?.data.chain),
        [tokenInput, setTokenInput] = useState(data?.data.token);
    const [redir_addrShow, setRedirAddrShow] = useState('');
    const [pref_addrShow, setPrefAddrShow] = useState('');
    const [sendBtn, setSendBtn] = useState(false)

    const isMounted = useRef(false);
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            setView('data');
            return;
        }
    }, [])

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (route == 'qr-upi') {
            if (upiInput == null || upiInput == "") {
                toast.error("Please enter a valid UPI ID")
                return;
            }
        }
        if (route == 'email') {
            if (emailInput == null || emailInput == "") {
                toast.error("Please enter a valid Email ID")
                return;
            }
        }
        if (chainInput == null || chainInput == "" || tokenInput == null || tokenInput == "" || amountInput == null || amountInput == "") {
            toast.error("Please fill all the required fields")
            return;
        }
        gStorage.setItem('send-token', {
            data: {
                input: upiInput || emailInput,
                chain: chainInput,
                token: tokenInput,
                amount: amountInput
            }
        });

        // setView('loading');
        const txsigner = await provider.getSigner();
        const contract = new ethers
            .Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);

        var d_proceed = false;
        // EMAIL TO WALLET ADDRESS
        const wallet_addr = await contract.mailToWallet(upiInput || emailInput);
        if (wallet_addr == "0x0000000000000000000000000000000000000000") {
            d_proceed = true;
        }

        // GET REDIRECTION DETAILS
        const redir_addr = await contract.Redirection(wallet_addr);
        setRedirAddrShow(redir_addr);
        if (redir_addr == "0x0000000000000000000000000000000000000000") {
            var pref_addr = wallet_addr;
        } else {
            var pref_addr = redir_addr;
        }


        // GET PREFERENCE DETAILS
        const preference = await contract.WalletToPreferences(pref_addr);
        const preferenceNetwork = preference[1];
        const ft = Tokens.filter((v, index) => v.val == preferenceNetwork);
        console.log(ft)
        setPrefAddrShow(ft[0].name);
        // console.log(parseEther(amountInput).toString())

        if (!sendBtn) {
            setSendBtn(true)
        } else {
            // const result  = await contract.Pay(emailInput, {value: parseEther(amountInput)})
            // CODE HERE (1INCH SWAP)
            // console.log(parseEther(amountInput).toString())
            // const payment = await contract.Pay(emailInput
            //     , {value: parseEther(amountInput).toString()}
            //     )
            // const tx = {
            //     to: CONTRACT_ADDRESS,
            //     value: parseEther(amountInput)
            // };
            // const transaction = await txsigner.sendTransaction(tx);
            // console.log(transaction);
            /*TEMPORARY*/

            // navigate('/send/approve-txn');
        }
    }
    return (
        <>
            {
                view == 'loading' && <Preloader text={'Transaction in progress'} />
                || <>
                    <form className="space-y-6" onSubmit={handleFormSubmit}>
                        {
                            route == 'qr-upi' && <QrPayTab data={upiInput} setData={setUpiInput} />
                            || route == 'email' && <EmailPayTab data={emailInput} setData={setEmailInput} />
                            || route == 'phone' && <PhonePayTab data={phoneInput} setData={setPhoneInput} />
                            || route == 'wallet' && <WalletPayTab data={walletInput} setData={setWalletInput} />
                            || route == 'loading' && <Preloader className={'h-[40dvh]'} />
                            || <h1 className="text-center text-lg font-semibold">
                                Invalid Request ( 404 ) <br />
                                <button
                                    className="text-[#8FFF00] text-sm my-2 hover:underline underline-offset-2"
                                    onClick={() => navigate('/home')}
                                >
                                    Go Home
                                </button>
                            </h1>
                        }
                        {
                            redir_addrShow != "" && <p className="text-red-500">This payment is being redirected to <b>{redir_addrShow}</b></p>
                        }

                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="chain" className="block text-sm font-medium">
                                Chain
                            </label>
                            <select
                                id="chain"
                                autoComplete="chain"
                                placeholder="Select Chain"
                                className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-3 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                onChange={e => setChainInput(e.target.value)}
                                value={chainInput}
                            >
                                <option value={null}>Select Chain</option>
                                {
                                    chains.map(chain => <option value={chain.val}>{chain.name}</option>)
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="token" className="block text-sm font-medium">
                                Token
                            </label>
                            <select
                                id="token"
                                autoComplete="token"
                                placeholder="Select Token"
                                className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-3 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                onChange={e => setTokenInput(e.target.value)}
                                value={tokenInput}
                            >
                                <option value={null}>Select Token</option>
                                {Tokens.map(token => <option value={token.val}>{token.name}</option>)}
                            </select>
                            {
                                pref_addrShow != "" && <p className="text-red-500">The user prefers to receive payments in <b>{pref_addrShow}</b>. The tokens will be swapped and sent!</p>
                            }
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <label htmlFor="amount" className="block text-sm font-medium">
                                Amount
                            </label>
                            <div className="mt-1 relative">
                                <BiDollar className="pointer-events-none text-[#929292] absolute top-1/2 transform -translate-y-1/2 left-3" />
                                <input
                                    id="amount"
                                    type="amount"
                                    autoComplete="amount"
                                    placeholder="Enter Amount ( in USD )"
                                    className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-8 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                    onChange={e => setAmountInput(e.target.value)}
                                    value={amountInput}
                                />
                            </div>
                        </div>
                        <div className="pt-10">
                            <button className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                                {sendBtn ? "Send" : "Verify"} Tokens
                            </button>
                        </div>
                    </form>
                </>
            }

        </>
    )
}

export default SendTokenForm;