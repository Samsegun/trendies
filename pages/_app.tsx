import Layout from "@/components/layout";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import ErrorBoundary from "@/components/errorBoundary";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ErrorBoundary>
    );
}
