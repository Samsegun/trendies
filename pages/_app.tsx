import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
// import Layout from "@/components/layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? (page => page);

    return (
        <UserProvider>
            {/* <Layout> */}
            {getLayout(<Component {...pageProps} />)}
            {/* </Layout> */}
        </UserProvider>
    );
}
