import { GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Category = () => {
    const router = useRouter();
    const slug = router.query.slug;

    return (
        <div>
            <p> category page - {slug} </p>

            <Link href='/category/womens/product'>women's product page</Link>
        </div>
    );
};

// export async function getStaticPaths() {

//     return {
//         fallback: false,
//         paths: params,
//     };
// }

// export async function getStaticProps(context: GetStaticPropsContext) {
//     const { params } = context;
//     console.log(params);

//     // return {
//     //     props: { productDetails, }
//     // };
// }

export default Category;
