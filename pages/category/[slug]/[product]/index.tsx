import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getSingleProduct } from "@/utils/ApiRequets";
import Container from "@/components/UI/container";
import About from "@/components/About/about";
import { useCartStore } from "@/store/cart";

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
    const cart = useCartStore(state => state.cart);
    const router = useRouter();

    console.log(cart);

    return (
        <Container>
            <div className='px-4'>
                <button
                    className='px-4 my-16 text-lg font-medium transition-all duration-200 cursor-pointer hover:scale-105 md:px-6 opacity-70'
                    onClick={() => router.back()}>
                    Go Back
                </button>

                <article className='mb-20 text-center md:flex md:gap-4 xl:gap-8'>
                    <div
                        className='relative w-auto h-[40vh] xs:w-[300px]
                             xs:h-[360px] max-w-lg mx-auto md:basis-1/2 md:min-h-[460px] xl:min-h-[512px]'>
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

                        <div className='flex items-center gap-4'>
                            <div
                                className='w-[120px] h-12 py-7 px-4 flex items-center
                             justify-around font-medium bg-slate-300'>
                                <button>-</button>
                                <span>1</span>
                                <button>+</button>
                            </div>

                            <button
                                type='button'
                                className='bg-[#e33f3f] hover:bg-[#f44b4b] font-bold transition-all
                                 duration-300 text-white uppercase py-4 px-8'>
                                add to cart
                            </button>
                        </div>
                    </div>
                </article>

                <hr />

                <About />
            </div>
        </Container>
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
