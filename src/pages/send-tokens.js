import { Suspense, lazy, useContext, useEffect, useRef, useState } from "react";
import AppNav from "../components/shared/nav";
import { MemStorage } from "../contexts/storage";
import { useNavigate, useParams } from "react-router-dom";
import ActionCard from "../components/web/action-cards";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import { AiOutlineUserSwitch } from "react-icons/ai";
import Preloader from "../components/shared/preloader";
const SendTokenForm = lazy(() => import('../components/forms/send-token'));

const SendTokensPage = () => {
    const { gStorage } = useContext(MemStorage);
    const isMounted = useRef(false);
    const [tabActive, setTabActive] = useState('loading');
    const { tab } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            if (tab == null || tab == "" || tab == undefined) {
                setTabActive('qr-upi');
                return;
            }
            return;
        }
    }, [])

    useEffect(() => {
        if (tab != null && tab != undefined) {
            setTabActive(tab);
        } else {
            setTabActive('qr-upi');
        };
    }, [tab])

    const tabs = [
        {
            title: 'QR Code',
            icon: <MdOutlineQrCodeScanner className="text-2xl" />,
            tab: 'qr-upi',
        },
        {
            title: 'Email Address',
            icon: <IoMailOutline className="text-2xl" />,
            tab: 'email',
        }
    ]
    return (
        <>
            <AppNav />

            <div className="my-10 mx-8">
                {/* header start */}
                <div>
                    <h1 className="text-2xl">Send Tokens</h1>
                    <p className="my-4">Via</p>
                </div>
                {/* header end */}

                {/* tabs start */}
                <div className="my-8">
                    <div className="flex items-center justify-center gap-8">
                        {
                            tabs.map((tab, index) => (
                                <ActionCard
                                    key={index}
                                    title={tab.title}
                                    icon={tab.icon}
                                    type="inverse"
                                    selected={tabActive == tab.tab}
                                    // onClick={() => { tabActive != 'loading' && navigate(`/send/${tab.tab}`) }}
                                    route={tabActive != 'loading' && `/send/${tab.tab}` || ''}
                                    className={tabActive == "loading" && "animate-pulse disabled"}
                                />
                            ))
                        }
                    </div>
                </div>
                {/* tabs end */}

                {/* content start */}
                <div className="my-12">
                    <Suspense fallback={<Preloader className={'h-[40dvh]'} />}>
                        <SendTokenForm route={tabActive} data={gStorage.getItem('send-token')} />
                    </Suspense>
                </div>
                {/* content end */}
            </div>

        </>
    )
}

export default SendTokensPage;