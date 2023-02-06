import type { AppProps } from "next/app";
import Layout from "@/components/layout";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "@/styles/globals.css";
// import ErrorBoundary from "@/components/errorBoundary";

export default function App({ Component, pageProps }: AppProps) {
    return (
        // <ErrorBoundary>
        <UserProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </UserProvider>
        // </ErrorBoundary>
    );
}
