import { Tooltip } from "@mui/material";
import { IoPersonSharp, IoEllipsisVertical } from "react-icons/io5";
import { Link } from "react-router-dom";
const AppNav = () => {
    return (
        <>
            <div className="h-14 shadow-md bg-[#483C56] flex justify-between px-5">
                <div className="flex items-center justify-between h-full">
                    {/* LOGO */}
                </div>
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center gap-x-5">
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <Link to="/myaccount">
                                <IoPersonSharp className="text-2xl text-white" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-x-2 cursor-pointer">
                            <Tooltip title="Preferences">
                                <Link to="/preferences">
                                    <IoEllipsisVertical className="text-2xl text-white" />
                                </Link>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AppNav;