import Image from "next/image";
import { FC, ReactNode, useEffect, useState } from "react";
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

const IconWrapper = () => {
    return (
        <span className='inline-block w-4'>
            <Image src={starIcon} alt='' />
        </span>
    );
};

const Stars = () => {
    return (
        <div className='flex justify-center mt-4'>
            <div>
                <IconWrapper />
                <IconWrapper />
                <IconWrapper />
                <IconWrapper />
                <IconWrapper />
            </div>

            <span className='text-[#b3b3b3] ml-2 text-sm'>(200 Reviews)</span>
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

    const productInCart = (id: number) => {
        const itemInCart = cart.find(item => item.id === id);

        return itemInCart;
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

        return addToCart(id, name, qty, price, image);
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

                            <Stars />
                        </div>
                    </CardWrapper>
                );
            })}
        </div>
    );
};

export default ProductCard;
