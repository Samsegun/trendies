import React, { ReactElement, useState } from "react";
import { GetStaticPropsContext } from "next";
import Error from "next/error";
import Image from "next/image";
import Link from "next/link";
import { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/layout";
import Container from "@/components/UI/container";
import { ProductArray } from "@/types/productType";
import { getSingleCategory } from "@/utils/ApiRequets";
import ProductDescription from "@/components/ProductDesc";

type Props = {
    selectedCategory: ProductArray;
};

const Category: NextPageWithLayout<Props> = ({ selectedCategory }) => {
    const adjustText = (text: string) => {
        let category = text;

        if (text === "men's clothing") {
            category = "mens";
        } else if (text === "women's clothing") {
            category = "womens";
        }

        return category;
    };

    if (selectedCategory === null) {
        return <Error statusCode={503} />;
    }

    return (
        <div>
            <div className='p-8 text-xl font-semibold tracking-wide text-center text-white uppercase bg-black'>
                <h1>
                    {selectedCategory
                        ? selectedCategory[0].category
                        : "An error occured"}
                </h1>
            </div>

            <Container>
                <section className='px-4 mt-8 '>
                    {selectedCategory &&
                        selectedCategory.map((product, idx) => {
                            return (
                                <article
                                    key={idx}
                                    className='mb-16 text-center md:flex md:gap-4 xl:gap-24 xl:w-[90%] xl:mx-auto'>
                                    <div
                                        className={`relative w-auto h-[40vh] xs:w-[300px]
                             xs:h-[360px] max-w-lg mx-auto md:basis-1/2 md:min-h-[460px] xl:min-h-[512px]  ${
                                 idx % 2 === 0 ? "md:-order-1" : "md:order-1"
                             }`}>
                                        <Image
                                            src={product.image}
                                            alt='product'
                                            fill={true}
                                            sizes='(max-width: 768px) 100%,
                                                (max-width: 1280px) 100%,
                                                     100%'
                                            style={{
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </div>

                                    <div className='mx-auto sm:w-2/3 md:w-auto md:basis-1/2 md:self-center md:text-left'>
                                        <h2 className='my-6 text-3xl font-semibold tracking-wide'>
                                            {product.title}
                                        </h2>

                                        <p className='text-sm mb-6 px-2 leading-[25px] xl:w-3/4'>
                                            <ProductDescription
                                                desc={product.description}
                                            />
                                        </p>

                                        <button
                                            type='button'
                                            className='bg-[#e33f3f] hover:bg-[#f44b4b] transition-all duration-300 text-white uppercase '>
                                            <Link
                                                href={`/category/${adjustText(
                                                    product.category
                                                )}/${product.id}`}
                                                className='block px-8 py-4'>
                                                see product
                                            </Link>
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                </section>
            </Container>
        </div>
    );
};

Category.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
    // const categories = (await getAllCategories()).data.map(
    //     category => category
    // );

    // const params = categories.map(category => ({ params: { slug: category } }));

    return {
        paths: [
            { params: { slug: "electronics" } },
            { params: { slug: "jewelery" } },
            { params: { slug: "mens" } },
            { params: { slug: "womens" } },
        ],
        fallback: true,
    };
}

export async function getStaticProps(
    context: GetStaticPropsContext<{ slug: string }>
) {
    let { slug } = context.params!;

    if (slug === "mens") {
        slug = "men's%20clothing";
    } else if (slug === "womens") {
        slug = "women's%20clothing";
    }

    let categoryData;
    try {
        categoryData = (await getSingleCategory(slug)).data;
        return {
            props: {
                selectedCategory: categoryData,
            },
        };
    } catch (error) {
        categoryData = null;
        return { props: { selectedCategory: categoryData } };
    }

    // return {
    //     props: {
    //         selectedCategory: categoryData,
    //     },
    // };
}

export default Category;
