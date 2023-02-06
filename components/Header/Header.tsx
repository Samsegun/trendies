import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import styles from "../../styles/Header.module.css";
import navIcon from "../../public/assets/navIcon.svg";
// import wishListIcon from "../../public/assets/wishListIcon.svg";
import accountIcon from "../../public/assets/account_circle.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import ItemCount from "../UI/itemsCount";
import Container from "../UI/container";
import NavLink from "../UI/Navlink";

type Props = {
    handleModal: (text: string) => void;
    cartModal: boolean;
};

const Header = ({ handleModal, cartModal }: Props) => {
    const { cart, totals, addTotals, removeCartItem, resetCart } = useCartStore(
        state => state
    );

    useEffect(() => {
        addTotals();
    }, [cart]);

    return (
        <header className='bg-black text-[#fff]  p-4'>
            <Container>
                <div className='relative'>
                    <div className='flex items-center justify-between w-11/12 mx-auto xl:w-auto'>
                        <div
                            className='cursor-pointer md:hidden'
                            onClick={handleModal.bind(null, "mobileNav")}>
                            <Image src={navIcon} alt='menu button' />
                        </div>

                        <h1 className='text-2xl font-bold'>
                            <Link href='/'>Trendies</Link>
                        </h1>

                        <nav className='hidden md:block'>
                            <ul className='flex items-center gap-8 uppercase '>
                                <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                    <NavLink path='/' children='home' />
                                </li>
                                <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                    <NavLink
                                        path='/category/mens'
                                        children='mens'
                                    />
                                </li>
                                <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                    <NavLink
                                        path='/category/womens'
                                        children='womens'
                                    />
                                </li>
                                <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                    <NavLink
                                        path='/category/jewelery'
                                        children='jewelry'
                                    />
                                </li>
                                <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                                    <NavLink
                                        path='/category/electronics'
                                        children='electronics'
                                    />
                                </li>
                            </ul>
                        </nav>

                        <div className='flex justify-between'>
                            <button
                                className={
                                    styles.wishlist +
                                    " relative mr-4 cursor-pointer"
                                }>
                                <Image src={accountIcon} alt='wish list' />
                            </button>
                            {/* <button
                                className={
                                    styles.wishlist +
                                    " relative mr-4 cursor-pointer"
                                }>
                                <Image src={wishListIcon} alt='wish list' />
                                <ItemCount
                                    position='bottom-[10px] -right-[16px]'
                                    qty={10}
                                />
                            </button> */}

                            <button
                                className='relative cursor-pointer'
                                onClick={handleModal.bind(null, "cart")}>
                                <Image src={cartIcon} alt=' cart' />
                                <ItemCount
                                    position='bottom-4 -right-[14px]'
                                    qty={totals.cartQty}
                                />
                            </button>
                        </div>

                        {/* cart modal */}
                        {cartModal && (
                            <section
                                className='absolute right-0 z-40 w-[90%] 
                            max-w-xs bg-white text-black top-12 h-auto p-2 pb-6 xs:p-4 shadow-xl'>
                                <div className='flex justify-between'>
                                    <h2 className='font-semibold uppercase'>
                                        cart
                                    </h2>
                                    <button
                                        type='button'
                                        onClick={resetCart}
                                        className='opacity-70'>
                                        Remove all
                                    </button>
                                </div>

                                {cart.map((item, idx) => {
                                    return (
                                        <div key={idx}>
                                            <div className='flex items-center justify-between mt-8 mb-6'>
                                                <div className='flex items-center'>
                                                    <div className='relative w-[70px] h-[60px]'>
                                                        <Image
                                                            src={item.image}
                                                            alt='product'
                                                            fill={true}
                                                            sizes='(max-width: 768px) 100%,
                                                (max-width: 1280px) 100%,
                                                     100%'
                                                        />
                                                    </div>

                                                    <div className='basis-1/2 ml-2 text-[0.6rem] xs:text-[0.7rem] opacity-70'>
                                                        <p>{item.name}</p>
                                                        <span className='tracking-wider'>
                                                            {item.qty} x $
                                                            {item.price}
                                                        </span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={removeCartItem.bind(
                                                        null,
                                                        item.id
                                                    )}
                                                    className='text-xs font-semibold opacity-70'>
                                                    X
                                                </button>
                                            </div>

                                            <hr />
                                        </div>
                                    );
                                })}

                                <div className='flex justify-between mt-4 mb-6'>
                                    <span className='uppercase opacity-70'>
                                        total
                                    </span>
                                    <span className='font-semibold'>
                                        ${totals.cartTotals.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    type='button'
                                    className='bg-[#e33f3f] text-white uppercase
                                     px-12 py-4 w-full text-xs font-semibold tracking-widest hover:bg-[#e33f3fe5]'>
                                    checkout
                                </button>
                            </section>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
