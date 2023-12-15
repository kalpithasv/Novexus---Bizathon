import { MdOutlineQrCodeScanner } from "react-icons/md";
import AppNav from "../components/shared/nav";
import ActionCard from "../components/web/action-cards";
import BankIcon from "../components/icons/bank";
import ContactIcon from "../components/icons/contacts";
import TransferIcon from "../components/icons/transfer";
import HrLineStyled from "../components/shared/hr-styled";
import Card from "../components/shared/card";
import { AiFillBank, AiOutlineUserSwitch } from "react-icons/ai";
import { TiContacts } from "react-icons/ti";
import { IoMailOutline } from "react-icons/io5";

const AppHome = () => {
    return (
        <div>
            <AppNav />

            <div className="my-20 mx-10">
                {/* Hero section start */}
                <div className="flex items-center justify-center gap-16">
                    <ActionCard
                        icon={<MdOutlineQrCodeScanner className="text-2xl" />}
                        title={'Scan QR'}
                        route={'/mobi-scanner'}
                    />
                    <ActionCard
                        icon={<IoMailOutline className="text-2xl" />}
                        title={'Transfer to Email'}
                        route={'/send/email'}
                    />

                </div>
                {/* Hero section end */}


                {/* Account balance card start */}
                <div className="my-12 bg-[#483C56] px-4 py-3 rounded-xl font-[Inter]">
                    <h6 className="text-xs font-semibold">
                        Chain
                    </h6>
                    <div className="my-3">
                        <h1 className="text-4xl">50 ETH</h1>
                        <p className="text-xs my-2">$50,000</p>
                    </div>
                </div>
                {/* Account balance card end */}

                <div className="py-6">
                    <HrLineStyled />
                    <div className="my-12">
                        <div className="flex flex-col gap-4">
                            <Card text={'See transaction history'} />
                            <Card text={'Revolutionize Gifting with Lifafa'} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AppHome;