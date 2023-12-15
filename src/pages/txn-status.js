import { useNavigate } from "react-router-dom";
import CheckMarkIcon from "../components/icons/check";
import FailedCancelIcon from "../components/icons/failed";
import AppNav from "../components/shared/nav";

const TxnStatusPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <AppNav />
            <div className="my-20 mx-10">
                <div className="bg-[#483C56] rounded-xl shadow-xl py-10 px-8">
                    <div className="flex items-center justify-center flex-col gap-y-2">
                        <CheckMarkIcon className="w-28 h-28 text-[#8FFF00]" />
                        <h1 className="text-2xl font-normal">Transaction Successful</h1>
                        {/* <FailedCancelIcon className="w-28 h-28 text-[#8FFF00]" /> */}
                        {/* <h1 className="text-2xl font-normal">Transaction Failed</h1> */}
                    </div>
                    <div className="flex flex-col gap-y-3 text-sm mt-4">
                        <div className="flex justify-between items-center">
                            <h1>Wallet Address</h1>
                            <p>{' '}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1>Chain</h1>
                            <p>{' '}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1>Token</h1>
                            <p>{' '}</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1>Amount</h1>
                            <p>{' '}</p>
                        </div>
                    </div>
                    <div className="my-8 flex items-center justify-center">&nbsp;</div>
                </div>

                <div className="fixed bottom-5 z-40 left-0 w-full py-8 px-10 flex items-center justify-center rounded-t-2xl">
                    <div className="flex items-center gap-4 w-full">
                        <button onClick={e => navigate('/home')} className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TxnStatusPage;