import { MdOutlineQrCodeScanner } from "react-icons/md";
import QRScannerFrameIcon from "../components/icons/qr-scanner-frame";
import AppNav from "../components/shared/nav";
import ActionCard from "../components/web/action-cards";
import { QrReader } from 'react-qr-reader';
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MemStorage } from "../contexts/storage";
import { GlobalContext } from "../contexts/global";
import { validateUPI } from "../functions/fn";

const QRScannerPage = () => {
    const [data, setData] = useState(null);
    const [cameraOn, setCameraOn] = useState(false);
    const navigate = useNavigate();
    const isMounted = useRef(false);
    const { gStorage } = useContext(MemStorage);
    const { toast } = useContext(GlobalContext);

    const camRef = useRef(null);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            setCameraOn(true);
            return;
        }
        // Cleanup function
        return () => {
            setCameraOn(false);
        };
    }, [])

    useEffect(() => {
        if (data == null || data == "") return;
        // const validatedData = validateUPI(data);
        const validatedData = (data);
        if (validatedData == false || "" || null) {
            toast.error('Invalid UPI ID: ' + data);
            setData(null);
            return;
        }
        setCameraOn(false);
        gStorage.setItem('send-token', {
            accessType: 'qr-upi',
            data: {
                upi: validatedData,
            }
        });
        navigate(`/send/qr-upi`);
    }, [data])
    return (
        <>
            <AppNav />
            <div className="flex items-center justify-center my-12 flex-col">
                <div className="h-[347px] w-[347px] max-w-[347px] rounded-[40px] relative">
                    {
                        cameraOn && <QrReader
                            onResult={(result, error) => {
                                if (!!result) {
                                    setData(result?.text);
                                }

                                if (!!error) {
                                }
                            }}
                            constraints={{ facingMode: 'environment', frameRate: { ideal: 25, max: 60 } }}
                            containerStyle={{ height: '100%', width: '100%' }}
                            videoContainerStyle={{ height: '100%', width: '100%' }}
                        />
                    }
                    <QRScannerFrameIcon className="z-20 absolute -top-[0.2px]" />
                </div>
            </div>
            <div className="fixed bottom-0 z-40 left-0 w-full bg-[#483C56] py-8 px-10 flex items-center justify-center rounded-t-2xl">
                <div>
                    <ActionCard
                        title={'Scan any QR code to pay'}
                        type="inverse"
                        className="text-sm font-semibold"
                        icon={<MdOutlineQrCodeScanner className="text-2xl" />}
                    />
                    <div className="my-8">
                        <h6 className="text-sm text-center">Can use our platform to make not only wallet-wallet payments , but also wallet to direct UPI ( INR ) Payments</h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default QRScannerPage;