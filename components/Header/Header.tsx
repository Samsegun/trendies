import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { initialize } from "@/firebase";
import { signInAnonymously } from "firebase/auth";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useCartStore } from "@/store/cart";
import styles from "../../styles/Header.module.css";
import navIcon from "../../public/assets/navIcon.svg";
// import wishListIcon from "../../public/assets/wishListIcon.svg";
import accountIcon from "../../public/assets/account_circle.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import ItemCount from "../UI/itemsCount";
import Container from "../UI/container";
import NavLink from "../UI/Navlink";
import CartModal from "../CartModal";

type Props = {
    handleModal: (text: string) => void;
    cartModal: boolean;
    signInModal: boolean;
};

const Header = ({ handleModal, cartModal, signInModal }: Props) => {
    const { cart, totals, addTotals } = useCartStore(state => state);
    const { push } = useRouter();
    const { isLoading, user, error } = useUser();
    const { auth, fireStore, firebaseApp } = initialize();

    const handleLogin = async () => {
        const result = await signInAnonymously(auth);
        console.log(result.user);
    };

    // const handleLogin = () => push("/api/auth/login");
    const handleLogOut = () => push("/api/auth/logout");

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
                                }
                                onClick={handleModal.bind(null, "signIn")}>
                                <Image
                                    src={user ? user.picture : accountIcon}
                                    alt='wish list'
                                    className='rounded-xl'
                                    width={1000}
                                    height={1000}
                                />
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
                        {cartModal && <CartModal email={user?.email} />}

                        {/* signIn modal */}
                        {signInModal && (
                            <section
                                className='absolute right-0 z-40 w-[90%] flex flex-col gap-4
                          max-w-xs bg-white text-black text-center top-12 h-auto p-2 pb-6 xs:p-4 shadow-xl'>
                                {/* if user is not logged in, display these sign-up and login buttons*/}
                                {!user && (
                                    <>
                                        {" "}
                                        <button
                                            className='bg-[#e33f3f] hover:bg-[#ef5e5e] text-white uppercase px-4 py-2 w-full rounded-2xl'
                                            onClick={handleLogin}>
                                            login
                                        </button>
                                        <button
                                            className='bg-[#fa6d6d] hover:bg-[#fd5757] text-white uppercase px-4 py-2 w-full rounded-2xl'
                                            onClick={handleLogin}>
                                            sign up
                                        </button>{" "}
                                    </>
                                )}

                                {/* if user is logged in, display this content*/}
                                {user && (
                                    <>
                                        <h3>{user.email}</h3>
                                        <button
                                            className='bg-[#fa6d6d] hover:bg-[#fd5757]
                                             text-white uppercase px-4 py-2 w-full rounded-2xl'
                                            onClick={handleLogOut}>
                                            log out
                                        </button>
                                    </>
                                )}
                            </section>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
