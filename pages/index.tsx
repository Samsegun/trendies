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

            <div className='w-11/12 py-4 mx-auto'>
                <BannerSection />

                <Link href='/category/mens'>men's clothing</Link>
                <Link href='/category/womens'>women's clothing</Link>
                <Link href='/category/jewelery'>jewelery</Link>
                <Link href='/category/electronics'>electronics</Link>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps<{
    products: ProductArray;
}> = async () => {
    // const res = await getAllProducts();
    // const products = res.data;

    const products = [
        {
            id: 15,
            title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            price: 56.99,
            description:
                "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
            category: "women's clothing",
            image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            rating: {
                rate: 2.6,
                count: 235,
            },
        },
    ];

    return { props: { products } };
};

export default Home;
