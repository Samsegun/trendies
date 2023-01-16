import React from "react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { Inter } from "@next/font/google";
import { getAllProducts } from "@/utils/ApiRequets";
import { ProductArray } from "@/types/productType";
import ImageContainer from "@/components/UI/ImageContainer";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage<{ products: ProductArray }> = ({ products }) => {
    console.log(products);

    const firstProduct = products[0];

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

            <div>
                <div>
                    <h1>{firstProduct.title}</h1>

                    <p>{firstProduct.description}</p>
                </div>

                <ImageContainer imagePath={firstProduct.image} />
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps<{
    products: ProductArray;
}> = async () => {
    const res = await getAllProducts();
    const products = res.data;

    return { props: { products } };
};

export default Home;
