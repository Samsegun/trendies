import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import { Inter } from "@next/font/google";
import { getAllProducts } from "@/utils/ApiRequets";
import { ProductArray } from "@/types/productType";
import ImageContainer from "@/components/UI/ImageContainer";
import Link from "next/link";
import { ParamsContext } from "@/context/productParams";
import BannerSection from "@/components/Banner/BannerSection";
import Container from "@/components/UI/container";
import Highlights from "@/components/Highlights/highlights";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import About from "@/components/About/about";

const inter = Inter({ subsets: ["latin"] });

const Home: NextPage<{ products: ProductArray }> = ({ products }) => {
    const { setNewParams } = useContext(ParamsContext);

    const productIds = products.map(product => ({ params: product.id }));

    useEffect(() => {
        setNewParams(productIds);
    }, []);

    // const firstProduct = products[0];

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

            <Container>
                <div className='w-11/12 py-4 mx-auto md:grid md:grid-cols-2 md:gap-4 xl:my-8'>
                    <BannerSection />

                    {/* <Link href='/category/mens'>men's clothing</Link>
                <Link href='/category/womens'>women's clothing</Link>
                <Link href='/category/jewelery'>jewelery</Link>
                <Link href='/category/electronics'>electronics</Link> */}
                </div>
            </Container>

            <Highlights />

            <FeaturedProducts products={products} />

            <About />
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
