import Head from "next/head";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Trendies</title>
                <meta
                    name='description'
                    content='We sell all kinds of trendy outfits'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
                maiores molestias consequatur inventore nihil quis et unde
                suscipit, iure sed debitis repudiandae at tenetur vero ipsa, sit
                ducimus? Exercitationem corrupti natus asperiores eius delectus
                consequuntur illum labore provident, ipsum tempore veritatis,
                sapiente molestiae ipsa, harum ratione quas et? Consequuntur,
                voluptatum.
            </p>
        </>
    );
}
