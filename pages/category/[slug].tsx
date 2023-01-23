import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "@/components/UI/container";
import { ProductArray } from "@/types/productType";
import { getAllCategories, getSingleCategory } from "@/utils/ApiRequets";

type Props = {
    selectedCategory: ProductArray;
};

const Category = ({ selectedCategory }: Props) => {
    console.log(selectedCategory);
    // const router = useRouter();
    // const slug = router.query.slug;

    return (
        <Container>
            <div>
                <p> category page </p>

                <Link href='/category/womens/product'>
                    women's product page
                </Link>
            </div>
        </Container>
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
