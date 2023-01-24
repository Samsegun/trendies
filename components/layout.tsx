import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ParamsProvider } from "@/context/productParams";
import Footer from "./Footer/footer";
import Header from "./Header/Header";
import Loading from "./loader";

NProgress.configure({
    minimum: 0.3,
    easing: "ease",
    speed: 800,
    showSpinner: false,
});

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // const start = () => {
        //     // console.log("start");
        //     setIsLoading(true);
        // };
        // const end = () => {
        //     // console.log("finished");
        //     setIsLoading(false);
        // };
        router.events.on("routeChangeStart", () => NProgress.start());
        router.events.on("routeChangeComplete", () => NProgress.done());
        router.events.on("routeChangeError", () => NProgress.done());
        return () => {
            router.events.off("routeChangeStart", () => NProgress.start());
            router.events.off("routeChangeComplete", () => NProgress.done());
            router.events.off("routeChangeError", () => NProgress.done());
        };
    }, []);

    return (
        <ParamsProvider>
            <div>
                <Header />
                <main className='min-h-screen'>{children}</main>
                {/* {isLoading ? (
                    <Loading />
                ) : (
                    <main className='min-h-screen'>{children}</main>
                )} */}
                <Footer />
            </div>
        </ParamsProvider>
    );
};

export default Layout;
