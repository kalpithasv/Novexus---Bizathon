import { Link } from "react-router-dom";
import QRCodeGen from "../components/shared/qr-code";
import { useState } from "react";

const JustForDevHome = () => {
    const [tmp, setTmp] = useState("Hello world :)");
    return (
        <>
            <div className="px-5 flex-col gap-y-4 items-center justify-center h-[80dvh] flex text-black">
                <div className="w-full px-5 py-8 bg-white rounded-md">
                    <div>
                        <h1 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl">
                            Available routes: (Dev Mode)
                        </h1>
                        <ul className="mt-5 space-y-4 list-disc list-inside">
                            <li>
                                <Link to="/auth">/auth</Link>
                            </li>
                            <li>
                                <Link to="/home">/home</Link>
                            </li>
                            <li>
                                <Link to="/mobi-scanner">/mobi-scanner</Link>
                            </li>
                            <li>
                                <Link to="/send">/send</Link>
                            </li>
                            <li>
                                <Link to="/send/approve-txn">/send/approve-txn</Link>
                            </li>
                            <li>
                                <Link to="/send/resp">/send/resp</Link>
                            </li>
                            <li>
                                <Link to="/myaccount">/myaccount</Link>
                            </li>
                            <li>
                                <Link to="/e-kyc">/e-kyc</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full px-5 py-8 rounded-md">
                    <div>
                        {
                            tmp != '' && <QRCodeGen data={tmp} />
                        }
                    </div>
                    <div>
                        <input type="text" value={tmp} placeholder="" className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-12 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm" onChange={(e) => setTmp(e.target.value)} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default JustForDevHome;