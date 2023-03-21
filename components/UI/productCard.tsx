import Image from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { onAuthStateChanged } from "firebase/auth";
import { initialize } from "@/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import styles from "../../styles/FeaturedProducts.module.css";
import starIcon from "../../public/assets/star-filled.svg";
import wishIcon from "../../public/assets/wishListIcon.svg";
import addIcon from "../../public/assets/add_shopping_cart.svg";
import { ProductArray, Product } from "@/types/productType";
import { useCartStore } from "@/store/cart";

type Props = { children: ReactNode };
type AddToCart = {
    addToCart: (
        id: number,
        name: string,
        qty: number,
        price: number,
        image: string
    ) => void;
    product: Product;
    cart: {
        id: number;
        name: string;
        qty: number;
        price: number;
        image: string;
    }[];
    removeCartItem: (id: number) => void;
};

export const StarRates = ({ rate }: { rate: number }) => {
    let counts = rate;
    const rates = [0, 0, 0, 0, 0];

    const appliedRates = rates.map(rate => {
        if (counts > 1) {
            counts = counts - 1;
            return { value: rate + 100, id: crypto.randomUUID() };
        } else if (counts === 0) {
            return { value: 0, id: crypto.randomUUID() };
        } else {
            let a = counts;
            counts = counts - counts;

            return {
                value: (rate + a * 100).toFixed(),
                id: crypto.randomUUID(),
            };
        }
    });

    return (
        <div className='flex justify-center w-full md:w-auto star-rating'>
            {appliedRates.map(
                (
                    appliedRate: { value: number | string; id: string },
                    idx: number
                ) => {
                    return (
                        <span key={idx} className='inline-block w-4 '>
                            <svg
                                key={idx}
                                xmlns='http://www.w3.org/2000/svg'
                                height='48'
                                width='48'>
                                <defs>
                                    <linearGradient
                                        id={appliedRate.id}
                                        x1='0%'
                                        y1='0%'
                                        x2='100%'
                                        y2='0%'>
                                        <stop
                                            offset={appliedRate.value + "%"}
                                            stopColor={"rgb(255,255,0)"}
                                            stopOpacity={1}
                                        />

                                        <stop
                                            // offset='100%'
                                            stopColor={"rgb(204, 204, 204)"}
                                            stopOpacity={1}
                                        />
                                    </linearGradient>
                                </defs>
                                <path
                                    fill={`url(#${appliedRate.id})`}
                                    d='m11.65 44 3.25-14.05L4 20.5l14.4-1.25L24 6l5.6 13.25L44 20.5l-10.9 9.45L36.35 44 24 36.55Z'
                                />
                            </svg>
                        </span>
                    );
                }
            )}
        </div>
    );
};

const Stars = ({ rating }: { rating: { rate: number; count: number } }) => {
    return (
        <div className='flex flex-col items-center justify-around mt-4 md:justify-center md:gap-4 md:flex-row'>
            <StarRates rate={rating.rate} />

            <span className='text-[#b3b3b3] ml-2 text-sm block'>
                ({rating.count} Reviews)
            </span>
        </div>
    );
};

const CardWrapper = ({ children }: Props) => {
    return (
        <article
            className={
                "mx-auto transition-all duration-300 grid hover:shadow-xl hover:cursor-pointer max-w-md " +
                styles["card-wrapper"]
            }>
            {children}
        </article>
    );
};

const ProductCard: FC<{ products: ProductArray }> = ({ products }) => {
    const { addToCart, cart, removeCartItem } = useCartStore(state => state);
    const [inCart, setIncart] = useState(false);
    const [loggedinUser, setLoggedinUser] = useState<any>();

    // get collection from firestore
    const { fireStore, auth } = initialize();
    const cartCol = collection(fireStore, "cart");

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setLoggedinUser(user);
            } else {
                setLoggedinUser(null);
            }
        });
    }, []);

    const productInCart = (id: number) => {
        const itemInCart = cart.find(item => item.id === id);
        return itemInCart;
    };

    const addToCartAction = (
        id: number,
        name: string,
        qty: number,
        price: number,
        image: string
    ) => {
        addToCart(id, name, qty, price, image);

        // set to database
        if (loggedinUser) {
            const singleCart = doc(cartCol, loggedinUser.uid);

            setDoc(
                singleCart,
                {
                    cart: [
                        ...cart,
                        {
                            id,
                            name,
                            qty,
                            price,
                            image,
                        },
                    ],
                },
                { merge: true }
            );
        }
    };

    const cartAction = (
        id: number,
        name: string,
        qty: number,
        price: number,
        image: string
    ) => {
        if (productInCart(id)) {
            return removeCartItem(id);
        }

        return addToCartAction(id, name, qty, price, image);
    };

    return (
        <div className='grid max-w-3xl gap-6 mx-auto xl:gap-12 sm:grid-cols-2'>
            {products.map((product, idx) => {
                return (
                    <CardWrapper key={idx}>
                        <div
                            className='relative h-auto w-[inherit] xs:w-[300px]
                             md:w-[375px] '>
                            <Image
                                src={product.image}
                                alt=''
                                className='rounded-tl-lg rounded-tr-lg '
                                fill={true}
                                sizes='(max-width: 768px) 100%,
                                        (max-width: 1280px) 100%,
                                             100%'
                            />

                            {/* <button
                                type='button'
                                className={
                                    "absolute top-[10%] right-[10%] p-[0.3rem] bg-[#000000ba] rounded-full w-8 " +
                                    styles["cart-btn"]
                                }>
                                <Image src={wishIcon} alt='add to wish list' />
                            </button> */}

                            <button
                                type='button'
                                className={
                                    "absolute bottom-0 flex justify-center items-center w-full py-4 text-white text-xs uppercase bg-[#000000ba] " +
                                    styles["cart-btn"]
                                }
                                onClick={() =>
                                    cartAction(
                                        product.id,
                                        product.title,
                                        1,
                                        product.price,
                                        product.image
                                    )
                                }>
                                <span className='inline-block p-[0.3rem] w-8 mr-1'>
                                    <Image src={addIcon} alt='' />
                                </span>

                                <span>
                                    {productInCart(product.id)
                                        ? "remove from cart"
                                        : "add to cart"}
                                </span>
                            </button>
                        </div>

                        {/* product info */}
                        <div
                            className={
                                "px-8 py-6 text-center bg-white rounded-b-lg flex flex-col gap-2 "
                            }>
                            <h4 className='basis-1/3'>{product.title}</h4>
                            <span className='text-[#c66]'>
                                ${product.price}
                            </span>

                            <Stars rating={product.rating} />
                        </div>
                    </CardWrapper>
                );
            })}
        </div>
    );
};

export default ProductCard;
