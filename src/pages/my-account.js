import { Link, useNavigate } from "react-router-dom";
import ProfileBlankIcon from "../components/icons/profile-blank";
import AppNav from "../components/shared/nav";
import { MdOutlineQrCode, MdOutlineQrCodeScanner } from "react-icons/md";
import { AiFillBank, AiOutlineUserSwitch } from "react-icons/ai";
import BankIcon from "../components/icons/bank";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/global";
import Preloader from "../components/shared/preloader";
import { trimWalletAddress } from "../functions/fn";
import { Tooltip } from "@mui/material";
import QRCodeGen from "../components/shared/qr-code";
import { IoMailOutline } from "react-icons/io5";

const MyAccountPage = () => {
    const { account, toast } = useContext(GlobalContext);
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const [user, setUser] = useState(false);
    const [usession, setUsession] = useState(false);
    useEffect(() => {
        ; (async () => {
            if (!isMounted.current) {
                isMounted.current = true;
                if (account.isAuthenticated == false) {
                    navigate('/auth')
                    return;
                }
                const user = await account.safeAuthPack.getUserInfo();
                setUser(user);
                account.safeAuthPack.signIn().then(resp => {
                    setUsession(resp);
                })
            }
        })();
    })
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
        toast.success("Copied to clipboard")
    } 
    return (
        <>
            <AppNav />
            <div className="my-10 mx-8">
                {
                    user == false && <Preloader text={'Please wait'} />
                    || <>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h1 className="text-2xl">{user.name || "-"}</h1>

                                <div className="mt-4 space-y-2">
                                    <Tooltip title={usession.eoa}>
                                        <p onClick={e => copyToClipboard(usession.eoa)} className="text-sm">{trimWalletAddress(usession.eoa || "")}</p>
                                    </Tooltip>
                                    <p className="text-sm">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                {/* <ProfileBlankIcon /> */}
                                <img src={user.profileImage} className="rounded-full" />
                            </div>
                        </div>

                        <div className="flex items-center justify-center my-12">
                            {/* <MdOutlineQrCodeScanner className="w-44 h-44" /> */}
                            <QRCodeGen data={usession.eoa} />
                        </div>

                        <div className="my-12">
                            <div className="bg-[#483C56] rounded-xl shadow-xl py-4 px-8">
                                <div>
                                    <h1 className="text-sm">Set up payment methods</h1>
                                    <div className="my-8 mx-5 flex items-center justify-between">
                                        <Link to="/send/qr-upi"><MdOutlineQrCodeScanner className="h-16 w-16 cursor-pointer" /></Link>
                                        <Link to="/send/email"><IoMailOutline className="h-16 w-16 cursor-pointer" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full py-8 flex items-center justify-center rounded-t-2xl">
                            <div className="flex items-center gap-4 w-full">
                                <button onClick={e => navigate('/home')} className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                                    Done
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default MyAccountPage;