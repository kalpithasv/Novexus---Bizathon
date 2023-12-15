import EmailIcon from "../components/icons/email";
import HrLineStyled from "../components/shared/hr-styled";
import AppNav from "../components/shared/nav";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useContext, useEffect, useRef, useState } from "react";
import { CONTRACT_ABI, CONTRACT_ADDRESS, Tokens, chains } from "../constants";
import { GlobalContext } from "../contexts/global";
import { useNavigate } from "react-router-dom";
import { BrowserProvider, ethers } from "ethers";
import Preloader from "../components/shared/preloader";
const PreferencesPage = () => {
    const [tokenSelect, setTokenSelect] = useState(false);
    const [chainSelect, setChainSelect] = useState(false);
    const [selectedToken, setSelectedToken] = useState("");
    const [selectedChain, setSelectedChain] = useState("");
    const [redirectWallet, setRedirectWallet] = useState("");

    const { account, toast } = useContext(GlobalContext);
    const isMounted = useRef(false);
    const navigate = useNavigate()
    const provider = new BrowserProvider(account.safeAuthPack.getProvider());
    const [view, setView] = useState('loading');
    useEffect(() => {
        ; (async () => {
            if (!isMounted.current) {
                isMounted.current = true;
                //check if the user has logged in
                if (account.isAuthenticated == false) {
                    navigate('/auth')
                    return;
                }
                //check if the user is kyc verified
                const user = await account.safeAuthPack.getUserInfo();
                console.log(user.email)
                const txsigner = await provider.getSigner();
                const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);
                // Read message from smart contract
                const message = await contract.mailToWallet(user.email);
                // console.log(message)
                if (message == "0x0000000000000000000000000000000000000000") {
                    navigate('/e-kyc')
                } else {
                    setView('data')
                }
            }
        })();
    }, [])

    const handleRedirectReq = async (e) => {
        e.preventDefault();
        //validate data
        if(redirectWallet == ''){
            toast.error("Please enter a valid wallet address")
            return;
        }
        //send data to smart contract
        setView('loading')
        const txsigner = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);
        // Read message from smart contract
        const message = await contract.SetRedirection(redirectWallet);
        console.log(message)
        toast.success("Wallet redirection request sent")
        setView('data')
    }

    const handleSetPreferences = async (e) => {
        e.preventDefault();
        //validate data
        if(selectedToken == '' || selectedChain == ''){
            toast.error("Please select a valid token and chain")
            return;
        }
        //send data to smart contract
        setView('loading')
        const txsigner = await provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, JSON.parse(JSON.stringify(CONTRACT_ABI)), txsigner);
        // Read message from smart contract
        const message = await contract.SetPreferences(selectedChain.val, selectedToken.val);
        console.log(message)
        toast.success("Preferences set")
        setView('data')

    }
    return (
        <>
            <AppNav />
            <div className="m-6">
                <h1 className="text-xl">Preferred Wallet Address</h1>
                <div className="my-12">
                    {
                        view == 'loading' && <Preloader text={"Please wait"} />
                        || view == 'data' && <>
                            <div>
                                <form className="flex flex-col gap-y-2" onSubmit={handleRedirectReq}>
                                    <label htmlFor="w" className="block text-sm font-medium">
                                        Redirect this wallet
                                    </label>
                                    <div className="mt-1 relative">
                                        <EmailIcon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                                        <input
                                            id="wallet"
                                            value={redirectWallet}
                                            onChange={e => setRedirectWallet(e.target.value)}
                                            type="wallet"
                                            autoComplete="wallet"
                                            placeholder="0x47291F7f6d9d6c81D6C0...."
                                            className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-12 pr-24 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                        />
                                        <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                                            <button disabled={redirectWallet.length == 0} className="bg-[#483C56] p-3 w-full rounded-r-xl px-5 text-sm text-white font-semibold">
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="my-12">
                                    <HrLineStyled />
                                </div>
                                <form onSubmit={handleSetPreferences}>
                                    <h2 className="font-semibold text-sm mb-6">Preferred Assets</h2>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-y-2">
                                            <label htmlFor="w" className="block text-sm font-medium">
                                                Select Preferred Token
                                            </label>
                                            <div onClick={e => setTokenSelect(true)} className="mt-1 relative">
                                                <EmailIcon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                                                <input
                                                    id="token"
                                                    type="text"
                                                    value={selectedToken?.name || ""}
                                                    autoComplete="token"
                                                    placeholder="USDT"
                                                    className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-12 pr-24 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                                />
                                                <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                                                    <button className="bg-[#483C56] p-3 w-full rounded-r-xl px-5 text-sm text-white font-semibold">
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-y-2">
                                            <label htmlFor="w" className="block text-sm font-medium">
                                                Select Preferred Chain
                                            </label>
                                            <div onClick={e => setChainSelect(true)} className="mt-1 relative">
                                                <EmailIcon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                                                <input
                                                    id="chain"
                                                    type="text"
                                                    value={selectedChain?.name || ""}
                                                    autoComplete="chain"
                                                    placeholder="Polygon"
                                                    className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-12 pr-24 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                                                />
                                                <div className="absolute top-1/2 transform -translate-y-1/2 right-0">
                                                    <button className="bg-[#483C56] p-3 w-full rounded-r-xl px-5 text-sm text-white font-semibold">
                                                        Change
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fixed bottom-5 z-40 left-0 w-full py-8 px-10 flex items-center justify-center rounded-t-2xl">
                                        <div className="flex items-center gap-4 w-full">
                                            <button className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                                                Configure
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </>
                    }
                </div>
            </div>
            <Dialog maxWidth="xl" fullWidth onClose={() => setTokenSelect(false)} open={tokenSelect}>
                <DialogTitle>Select Preferred Token</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {Tokens.map((token, index) => (
                        <ListItem disableGutters key={token.name}>
                            <ListItemButton onClick={() => { setSelectedToken({
                                id: index + 1,
                                val: token.val,
                                name: token.name
                            }); setTokenSelect(false) }}>
                                <ListItemText primary={token.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
            <Dialog maxWidth="xl" fullWidth onClose={() => setChainSelect(false)} open={chainSelect}>
                <DialogTitle>Select Preferred Chain</DialogTitle>
                <List sx={{ pt: 0 }}>
                    {chains.map((chain, index) => (
                        <ListItem disableGutters key={chain.name}>
                            <ListItemButton onClick={() => { setSelectedChain({
                                id: index + 1,
                                val: chain.val,
                                name: chain.name
                            }); setChainSelect(false) }}>
                                <ListItemText primary={chain.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </>
    )
}

export default PreferencesPage;