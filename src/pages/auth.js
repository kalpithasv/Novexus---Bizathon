import { PiArrowLeftBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


import { SafeAuthPack } from "@safe-global/auth-kit";
import { ethers, BrowserProvider } from "ethers";
import { EthersAdapter, SafeFactory } from "@safe-global/protocol-kit";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../contexts/global";
import Preloader from "../components/shared/preloader";

const AuthPage = () => {
    const { account } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     if (!isMounted.current) {
    //         isMounted.current = true;
    //         account.safeAuthPack.init(safeAuthInitOptions).then(r => {
    //             account.safeAuthPack.subscribe('accountsChanged', async (accounts) => {
    //                 if (accounts.length > 0) {
    //                     const { safes, eoa } = await account.safeAuthPack.signIn()
    //                     const provider = account.safeAuthPack.getProvider()

    //                     // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
    //                     account.setChainId(chain.id)
    //                     account.setOwnerAddress(eoa)
    //                     account.setSafes(safes || [])
    //                     if (provider) {
    //                         account.setWeb3Provider(new ethers.BrowserProvider(provider))
    //                     }
    //                     account.setIsAuthenticated(true)
    //                 }
    //             })
    //         });
    //     }
    // }, [])

    useEffect(() => {
        if (account.isAuthenticated == true) {
            navigate('/e-kyc');
        } else {
            if (account.isAuthenticated == false) {
                setLoading(false)
            }
        }
    }, [account.isAuthenticated])

    const loginWeb3Auth = useCallback(async () => {
        if (!account.safeAuthPack) return

        try {
            const { safes, eoa } = await account.safeAuthPack.signIn()
            const provider = account.safeAuthPack.getProvider()

            // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
            // setChainId(chain.id)
            account.setOwnerAddress(eoa)
            account.setSafes(safes || [])
            account.setWeb3Provider(new ethers.BrowserProvider(provider))
            account.setIsAuthenticated(true)
            
        } catch (error) {
            console.log('error: ', error)
        }
    }, [])

    async function loginWeb3() {
        // const safeAuthPack = new SafeAuthPack();
        // var a = await safeAuthPack.init(safeAuthInitOptions);
        // const authKitSignData = await safeAuthPack.signIn();
        // console.log(authKitSignData);
        // console.log(await safeAuthPack.getUserInfo());

        // const provider = new BrowserProvider(safeAuthPack?.getProvider());
        // const signer = await provider.getSigner();
        // const ethAdapter = new EthersAdapter({
        //     ethers,
        //     signerOrProvider: signer,
        // });

        // const safeFactory = await SafeFactory.create({ ethAdapter });
        // const safe = await safeFactory.deploySafe({
        //     safeAccountConfig: { threshold: 1, owners: [authKitSignData?.eoa--] },
        // });
        // console.log("SAFE Created!", await safe.getAddress());
    }
    return (
        <div className="my-6 mx-5">
            {/* Navbar status start */}
            <div>
                <div className="grid grid-cols-12 place-items-center">
                    <div className="col-span-1 cursor-pointer">
                        <Link to="/">
                            <PiArrowLeftBold className="w-5 h-5 mr-2" />
                        </Link>
                    </div>
                    <div className="w-full flex justify-center col-span-10">
                        <h1 className="font-semibold text-lg">Sign In</h1>
                    </div>
                    <div className="col-span-1"></div>
                </div>
            </div>
            {/* Navbar status end */}

            {/* Form start */}
            {/* <div className="my-14">
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Email address
                        </label>
                        <div className="mt-1 relative">
                            <EmailIcon className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="myemail@mail.com"
                                className="w-full placeholder-[#929292] text-[#94A3B8] px-3 pl-12 bg-[#141414] py-3 border border-[#929292] rounded-xl shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <label htmlFor="email" className="block text-sm font-medium">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <Password
                                id="password"
                                name="password"
                                placeholder="At least 8 characters"
                                className=""
                                icon={true}
                            />
                        </div>
                    </div>
                    <div>
                        <p href="javascript:;" className="text-sm text-[#8FFF00] cursor-pointer hover:underline underline-offset-2">
                            Forgot your password?
                        </p>
                    </div>
                    <div>
                        <button className="bg-[#8FFF00] text-black w-full rounded-xl text-lg p-3 font-semibold">
                            Sign In
                        </button>
                    </div>
                </form>
            </div> */}
            {/* Form end */}

            {
                loading == true && <Preloader text={'Please wait'} />
                || <>
                    {/* Social login start */}
                    <div className="mt-12 px-4">
                        {/* <HrLineStyled text="OR" className="uppercase" /> */}

                        <div className="my-4 flex flex-col gap-y-4">
                            <button disabled={loading} onClick={loginWeb3Auth} className="bg-[#000] gap-2 active:border-transparent flex items-center justify-center w-full rounded-xl text-base p-3 font-semibold border-[#fff] border-[1px]">
                                <FcGoogle
                                    className="w-6 h-6"
                                />
                                {
                                    loading == true ? "Please wait" : 'Continue with Google'
                                }
                            </button>
                        </div>
                    </div>
                    {/* Social login end */}
                </>
            }
        </div >
    )
}

export default AuthPage;