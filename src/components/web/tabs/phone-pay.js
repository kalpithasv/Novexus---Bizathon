import { Tooltip } from "@mui/material";
import { useState } from "react";
import { BiDollar } from "react-icons/bi";
import { MdOutlineCall, MdOutlineClose, MdOutlineQrCodeScanner } from "react-icons/md";
import { Link } from "react-router-dom";
import EmailIcon from "../../icons/email";
const PhonePayTab = ({ data, setData }) => {
    return (
        <>
            <div className="flex flex-col gap-y-2">
                <label htmlFor="phone" className="block text-sm font-medium">
                    Phone Number
                </label>
                <div className="mt-1 relative">
                    <MdOutlineCall className="pointer-events-none text-[#94A3B8] text-lg absolute top-1/2 transform -translate-y-1/2 left-3" />
                    <input
                        id="phone"
                        type="tel"
                        autoComplete="phone"
                        placeholder="+91 917609XXXX"
                        value={data}
                        onChange={e => setData(e.target.value)}
                        className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-10 pr-10 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                    {
                        (data == null || data == "" || data == undefined) && <></>
                        || <>
                            <Tooltip
                                title="Clear input field"
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

export default PhonePayTab;