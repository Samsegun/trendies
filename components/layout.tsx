import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ParamsProvider } from "@/context/productParams";
import Footer from "./Footer/footer";
import Header from "./Header/Header";
import NavLink from "./UI/Navlink";

NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 800,
    showSpinner: false,
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [modal, setModal] = useState({
        mobileNav: false,
        cartModal: false,
        signIn: false,
        overLay: false,
    });
    const router = useRouter();

    const handleModal = (action: string) => {
        if (action === "close") {
            setModal({
                mobileNav: false,
                cartModal: false,
                signIn: false,
                overLay: false,
            });
        }

        if (action === "mobileNav") {
            setModal({
                mobileNav: true,
                cartModal: false,
                signIn: false,
                overLay: true,
            });
        }

        if (action === "cart") {
            setModal({
                mobileNav: false,
                cartModal: !modal.cartModal,
                signIn: false,
                overLay: !modal.overLay,
            });
        }

        if (action === "signIn") {
            setModal({
                mobileNav: false,
                cartModal: false,
                signIn: true,
                overLay: !modal.overLay,
            });
        }
    };

    useEffect(() => {
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => {
            NProgress.done();
            handleModal("close");
        });
        router.events.on("routeChangeError", () => NProgress.done());
        return () => {
            router.events.off("routeChangeStart", () => NProgress.start());
            router.events.off("routeChangeComplete", () => {
                NProgress.done();
                handleModal("close");
            });
            router.events.off("routeChangeError", () => NProgress.done());
        };
    }, []);

    return (
        <ParamsProvider>
            <div className='relative'>
                <Header
                    handleModal={handleModal}
                    cartModal={modal.cartModal}
                    signInModal={modal.signIn}
                />

                {/* overlay */}
                {modal.overLay && (
                    <div
                        className='fixed top-0 bottom-0 left-0 right-0 z-30 bg-[rgba(0,0,0,0.4)] '
                        onClick={handleModal.bind(null, "close")}></div>
                )}

                {/* mobile nav */}
                <div className='md:hidden'>
                    <section
                        className={`fixed top-0 left-0 z-40 w-4/5 h-full px-4 py-8
                     text-white bg-black transition-all duration-300 ${
                         !modal.mobileNav && "-translate-x-full"
                     }`}>
                        <div className='relative'>
                            <button
                                className='absolute -top-[4%] right-[5%] text-2xl text-white hover:scale-105'
                                onClick={handleModal.bind(null, "close")}>
                                X
                            </button>
                            <nav className='flex justify-center h-screen mt-8'>
                                <ul className='flex flex-col items-center gap-8 uppercase '>
                                    <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                        <NavLink path='/' children='home' />
                                    </li>
                                    <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                        <NavLink
                                            path='/category/mens'
                                            children='mens'
                                        />
                                    </li>
                                    <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                        <NavLink
                                            path='/category/womens'
                                            children='womens'
                                        />
                                    </li>
                                    <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                        <NavLink
                                            path='/category/jewelery'
                                            children='jewelry'
                                        />
                                    </li>
                                    <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                        <NavLink
                                            path='/category/electronics'
                                            children='electronics'
                                        />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </section>
                </div>

                <main className='min-h-screen'>{children}</main>
                <Footer />
            </div>
        </ParamsProvider>
    );
};

export default Layout;
