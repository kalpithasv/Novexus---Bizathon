import { useContext, useEffect, useRef, useState } from "react"
import { GlobalContext } from "../contexts/global";
import { useNavigate } from "react-router-dom";
import Password from "../components/shared/input-password";
// import "@/styles/globals.css";
import { AnonAadhaarProof, AnonAadhaarProvider, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Preloader from "../components/shared/preloader";
import Card from "../components/shared/card";
import { trimWalletAddress } from "../functions/fn";
import { ethers, BrowserProvider } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { Tooltip } from "@mui/material";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../constants";


const AadharKYCPage = () => {
    const [anonAadhaar] = useAnonAadhaar();
    const [view, setView] = useState('loading');
    const [usession, setUsession] = useState({});
    const { toast, account } = useContext(GlobalContext);
    const isMounted = useRef(false);
    const navigate = useNavigate()
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());
    useEffect(() => {
        ; (async () => {
            if (!isMounted.current) {
                isMounted.current = true;
                if (account.isAuthenticated == false) {
                    navigate('/auth')
                    return;
                }
                account.safeAuthPack.signIn().then(resp => {
                    setUsession(resp);
                })
                //check if the user has safe wallets
                if (account.safes.length == 0) {
                    setView('safe-new')
                    console.log(usession)
                    return;
                }
                setView('kyc')
                const user = await account.safeAuthPack.getUserInfo();
                console.log(user.email)
                // const txn = await Tx.contract.mailToWallet(user.email);
                // console.log(Tx.contract)
                // console.log(txn)

                const txsigner = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);
                // Read message from smart contract
                const message = await contract.mailToWallet(user.email);
                // console.log(message)
                if (message == "0x0000000000000000000000000000000000000000") {
                    setView('kyc')
                } else {
                    navigate('/preferences')
                }
            }
        })();
    }, [])

    useEffect(() => {
        ; (async () => {
            if (view == 'kyc') {
                console.log("Anon Aadhaar status: ", anonAadhaar.status);
                var ldata = JSON.parse(localStorage.getItem("anonAadhaar") || "{}");
                if (ldata.status != 'logged-out' && account.isAuthenticated == true) {
                    // console.log(account.safeAuthPack.getUserInfo())
                    const user = await account.safeAuthPack.getUserInfo();
                    const nullifier = anonAadhaar.pcd.proof.nullifier;
                    const email = user.email;
                    console.table({ email, nullifier });
                    const signer = await provider.getSigner();
                    const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), signer);
                    const txn = await contract.KYC(nullifier, email)
                    console.log(txn)
                    const receipt = await txn.wait();
                    console.log(receipt)

                    // navigate('/preferences')
                }
            }
        })();
    }, [anonAadhaar]);

    const createSafe = async () => {
        if (account.safes.length < 1) {
            console.log("Creating Safe...")
            setView('loading')
            try {
                //create safe wallet
                const signer = await provider.getSigner();
                const ethAdapter = new EthersAdapter({
                    ethers,
                    signerOrProvider: signer,
                });
                const safeFactory = await SafeFactory.create({ ethAdapter });
                const safe = await safeFactory.deploySafe({
                    safeAccountConfig: { threshold: 1, owners: [usession.eoa] },
                });
                const newSafe = await safe.getAddress();
                account.setSafes([...account.safes, newSafe])
                console.log("SAFE Created!", account.safes);
                setView('kyc')
                toast.success("Safe Wallet created successfully")
            } catch (error) {
                console.log(error)
                toast.error("Error creating Safe Wallet")
                setView('safe-new')
                return;
            }
        }
    }
    function copyToClipboard(text){
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    } 
    return (
        <>
            {
                view == 'loading' && <Preloader text={'Please wait'} />
                || view == "kyc" &&
                <div className="my-6 mx-6">
                    <h1 className="text-xl">Prove your Identity ( KYC )</h1>

                    <div className="mx-8 my-20">
                        <div className="bg-[#483C56] rounded-xl shadow-xl py-10 px-8">
                            <div className="flex flex-col gap-y-5 text-sm">
                                <div className="flex  justify-between items-center">
                                    <h1>EOA</h1>
                                    <Tooltip title={usession.eoa}>
                                        <p onClick={e => copyToClipboard(usession.eoa)}>{trimWalletAddress(usession.eoa || "") || "..."}</p>
                                    </Tooltip>
                                </div>
                                <div className="flex  justify-between items-center">
                                    <h1>Address</h1>
                                    <Tooltip title={account.safes[0]}>
                                        <p>{trimWalletAddress(account.safes[0] || "") || "..."}</p>
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="my-8 flex items-center justify-center">
                                {anonAadhaar?.status !== "logged-in" && <div className="my-12 w-full flex items-center justify-center">
                                    <LogInWithAnonAadhaar />
                                </div> || anonAadhaar?.status === "logged-in" && <Preloader text={'Please wait...'} />}
                            </div>
                        </div>
                    </div>
                </div>
                || view == "safe-new" && <div>
                    <div className="my-6 mx-6">
                        <h1 className="text-xl">Create a new Safe Wallet</h1>
                        <div className="my-20 mx-10">
                            <div className="bg-[#483C56] rounded-xl shadow-xl py-10 px-8">
                                <div className="flex flex-col gap-y-5 text-sm">
                                    <div className="flex  justify-between items-center">
                                        <h1>EOA</h1>
                                        {/* <p>{trimWalletAddress(usession.eoa || "") || "..."}</p> */}
                                        <p>{usession.eoa || "" || "..."}</p>
                                    </div>
                                </div>
                                <div className="my-8 flex items-center justify-center">
                                    <button onClick={createSafe} className="bg-[#8FFF00] text-black  rounded-2xl text-lg p-2 px-12 font-semibold">
                                        Create Safe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            {/* <p>{anonAadhaar?.status}</p>
                <div>
                    {anonAadhaar?.status === "logged-in" && (
                        <>
                            <p>✅ Proof is valid</p>
                            <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
                        </>
                    )}
                </div> */}
            {/* </div> */}
        </>
    )
}

export default AadharKYCPage