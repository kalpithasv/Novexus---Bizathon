import Card from "../components/shared/card";
import AppNav from "../components/shared/nav";

const ApproveTxnPage = () => {
    return (
        <>
            <AppNav />
            <div className="my-20 mx-10">
                <div className="bg-[#483C56] rounded-xl shadow-xl py-10 px-8">
                    <div className="flex flex-col gap-y-5 text-sm">
                        <div className="flex justify-between items-center">
                            <h1>Gas ( estimated )</h1>
                            <p>$3.00</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <h1>Total <br /> ( Amount + Gas )</h1>
                            <p>$53.00</p>
                        </div>
                    </div>
                    <div className="my-8">
                        <Card type="inverse" text={'Watch an ad to waive this gas fee'} />
                    </div>
                    <div className="my-8 flex items-center justify-center">
                        <button className="bg-[#8FFF00] text-black  rounded-2xl text-lg p-2 px-12 font-semibold">
                            Watch Ads
                        </button>
                    </div>
                </div>

                <div className="fixed bottom-5 z-40 left-0 w-full py-8 px-10 flex items-center justify-center rounded-t-2xl">
                    <div className="flex items-center gap-4 w-full">
                        <button className="bg-[#483C56] w-full rounded-xl text-lg p-3 font-semibold">
                            Reject
                        </button>
                        <button className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ApproveTxnPage;