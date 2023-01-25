import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
import { useContext } from "react";
import { ParamsContext } from "@/context/productParams";
import { getAllProducts, getSingleProduct } from "@/utils/ApiRequets";

type Props = {
    product: {
        id: number;
        title: string;
        price: number;
        category: string;
        description: string;
        image: string;
        rating: {
            rate: number;
            count: number;
        };
    };
};

const ProductPage = ({ product }: Props) => {
    // const { params } = useContext(ParamsContext);
    // console.log(params);

    // const router = useRouter();

    console.log(product);

    return (
        <div>
            <h1>product page</h1>

            {/* <ul> 
                {params.map(param => {
                    return <li>{param}</li>
                })}
            </ul> */}
        </div>
    );
};

export async function getStaticPaths() {
    const products = (await getAllProducts()).data.map(product => {
        let category: string;

        if (product.category === "men's clothing") {
            category = "mens";
        } else if (product.category === "women's clothing") {
            category = "womens";
        }
        category = product.category;

        return { slug: category, id: product.id };
    });

    const paths = products.map(product => ({
        params: { slug: product.slug, product: product.id.toString() },
    }));

    return {
        paths,
        fallback: true,
    };
}

export async function getStaticProps(
    context: GetStaticPropsContext<{ product: string }>
) {
    const { product } = context.params!;

    const productData = (await getSingleProduct(product)).data;

    return {
        props: {
            product: productData,
        },
    };
}

export default ProductPage;
