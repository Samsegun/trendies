import React, { useState } from "react";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import Container from "@/components/UI/container";
import { ProductArray } from "@/types/productType";
import { getAllCategories, getSingleCategory } from "@/utils/ApiRequets";
import Image from "next/image";

type Props = {
    selectedCategory: ProductArray;
};

const Category = ({ selectedCategory }: Props) => {
    // const [loading, setLoading] = useState(false);
    // const router = useRouter();

    const adjustText = (text: string) => {
        let category = text;

        if (text === "men's clothing") {
            category = "mens";
        } else if (text === "women's clothing") {
            category = "womens";
        }

        return category;
    };

    console.log(selectedCategory);

    return (
        <div>
            <div className='p-8 text-xl font-semibold tracking-wide text-center text-white uppercase bg-black'>
                <h1>{selectedCategory[0].category}</h1>
            </div>

            <Container>
                <section className='px-4 mt-8 '>
                    {selectedCategory.map((product, idx) => {
                        return (
                            <article
                                key={idx}
                                className='mb-16 text-center md:flex md:gap-4 xl:gap-8'>
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
                                        {product.description}
                                    </p>

                                    <button
                                        type='button'
                                        className='bg-[#e33f3f] hover:bg-[#f44b4b] transition-all duration-300 text-white uppercase py-4 px-8'>
                                        <Link
                                            href={`/category/${adjustText(
                                                product.category
                                            )}/${product.id}`}>
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

    const categoryData = (await getSingleCategory(slug)).data;

    // console.log(params);

    return {
        props: {
            selectedCategory: categoryData,
        },
    };
}

export default Category;
