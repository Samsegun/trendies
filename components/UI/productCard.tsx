import Image from "next/image";
import { FC, ReactNode } from "react";
import styles from "../../styles/FeaturedProducts.module.css";
import starIcon from "../../public/assets/star-filled.svg";
import wishIcon from "../../public/assets/wishListIcon.svg";
import addIcon from "../../public/assets/add_shopping_cart.svg";
import { ProductArray } from "@/types/productType";

type Props = { children: ReactNode };

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

const AddToCartBtn = () => {
    return (
        <button
            type='button'
            className={
                "absolute bottom-0 flex justify-center items-center w-full py-4 text-white text-xs uppercase bg-[#000000ba] " +
                styles["cart-btn"]
            }>
            <span className='inline-block p-[0.3rem] w-8 mr-1'>
                <Image src={addIcon} alt='' />
            </span>

            <span>add to cart</span>
        </button>
    );
};

const ProductCard: FC<{ products: ProductArray }> = ({ products }) => {
    return (
        <div className='grid max-w-3xl gap-6 mx-auto xl:gap-12 sm:grid-cols-2'>
            {products.map((product, idx) => {
                return (
                    <CardWrapper key={idx}>
                        <div className={`relative`}>
                            <Image
                                src={product.image}
                                alt=''
                                className='rounded-tl-lg rounded-tr-lg '
                                fill={true}
                                sizes='(max-width: 768px) 372px,
                                        (max-width: 1280px) 372px,
                                             100%'
                                // width={1000}
                                // height={1000}
                            />

                            <button
                                type='button'
                                className={
                                    "absolute top-[10%] right-[10%] p-[0.3rem] bg-[#000000ba] rounded-full w-8 " +
                                    styles["cart-btn"]
                                }>
                                <Image src={wishIcon} alt='add to wish list' />
                            </button>

                            <AddToCartBtn />
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
