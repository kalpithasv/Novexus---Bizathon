import { Tooltip } from "@mui/material";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { MdOutlineClose, MdOutlineQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";
const QrPayTab = ({ data, setData = () => {} }) => {
    return (
        <>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="upi_id" className="block text-sm font-medium">
                    QR Code
                </label>
                <div className="mt-1 relative">
                    <input
                        id="upi_id"
                        type="text"
                        autoComplete="upi_id"
                        placeholder="0xABC...DEF"
                        value={data}
                        onChange={e => setData(e.target.value)}
                        className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-3 pr-10 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                    {
                        (data == null || data == "" || data == undefined) && <Link to={'/mobi-scanner'}>
                            <Tooltip title="Scan QR Code" placement="top" className="cursor-pointer" arrow
                                classes={{
                                    tooltip: 'bg-gray-900 text-white rounded-xl shadow-lg',
                                    arrow: 'bg-gray-900',
                                }}
                            >
                                <div className="absolute top-1/2 transform -translate-y-1/2 right-3">
                                    <MdOutlineQrCodeScanner className="text-lg" />
                                </div>
                            </Tooltip>
                        </Link>

                        || <>
                            <Tooltip
                                title="Clear QR Code"
                                placement="top" className="cursor-pointer" arrow
                                classes={{
                                    tooltip: 'bg-gray-900 text-white rounded-xl shadow-lg',
                                    arrow: 'bg-gray-900',
                                }}
                                onClick={() => setData('')}
                            >
                                <div className="absolute top-1/2 transform -translate-y-1/2 right-3">
                                    <MdOutlineClose className="text-lg" />
                                </div>
                            </Tooltip>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default QrPayTab;