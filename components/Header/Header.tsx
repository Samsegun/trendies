import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import navIcon from "../../public/assets/navIcon.svg";
import wishListIcon from "../../public/assets/wishListIcon.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import ItemCount from "../UI/itemsCount";
import Container from "../UI/container";
import NavLink from "../UI/Navlink";
import { useCartStore } from "@/store/cart";

type Props = {
    handleModal: (text: string) => void;
    cartModal: boolean;
};

const Header = ({ handleModal, cartModal }: Props) => {
    const cart = useCartStore(state => state.cart);
    const [cartQty, setCartQty] = useState(0);

    useEffect(() => {
        let acc = 0;
        cart.forEach(item => {
            acc += item.qty;
        });
        setCartQty(acc);
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
                                <Image src={wishListIcon} alt='wish list' />
                                <ItemCount
                                    position='bottom-[10px] -right-[16px]'
                                    qty={10}
                                />
                            </button>

                            <button
                                className='relative cursor-pointer'
                                onClick={handleModal.bind(null, "cart")}>
                                <Image src={cartIcon} alt=' cart' />
                                <ItemCount
                                    position='bottom-4 -right-[14px]'
                                    qty={cartQty}
                                />
                            </button>
                        </div>

                        {/* cart modal */}
                        {cartModal && (
                            <section
                                className='absolute right-0 z-40 w-[90%] 
                            max-w-xs bg-teal-300 top-12 h-auto p-4'>
                                <div className=''>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Assumenda, quisquam.
                                </div>
                                <hr />
                                <div className=''>
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Assumenda, quisquam.
                                </div>
                                <hr />
                            </section>
                        )}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
