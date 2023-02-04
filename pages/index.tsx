import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import Error from "next/error";
import { GetStaticProps, NextPage } from "next";
import { getAllProducts } from "@/utils/ApiRequets";
import { ProductArray } from "@/types/productType";
import Link from "next/link";
import { ParamsContext } from "@/context/productParams";
import BannerSection from "@/components/Banner/BannerSection";
import Container from "@/components/UI/container";
import Highlights from "@/components/Highlights/highlights";
import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import About from "@/components/About/about";
// import firebase from "firebase"

const Home: NextPage<{ products: ProductArray }> = ({ products }) => {
    const { setNewParams } = useContext(ParamsContext);

    const productIds = products.map(product => ({ params: product.id }));

    useEffect(() => {
        setNewParams(productIds);
    }, []);

    if (products.length === 0) {
        return <Error statusCode={503} />;
    }

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
    // const result = await getAllProducts();
    // console.log(result.status);

    // const errorCode = result.status > 299 ? result.status : false;
    // const products = result.data;

    // return { props: { errorCode, products } };

    let products: ProductArray;
    try {
        const { data } = await getAllProducts();
        products = data;
    } catch (error) {
        products = [];
        return { props: { products } };
    }
    return { props: { products } };
};

export default Home;
