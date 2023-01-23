import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/Header.module.css";
import navIcon from "../../public/assets/navIcon.svg";
import wishListIcon from "../../public/assets/wishListIcon.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import ItemCount from "../UI/itemsCount";
import Container from "../UI/container";

const Header = () => {
    return (
        <header className='bg-black text-[#fff]  p-4'>
            <Container>
                <div className='flex items-center justify-between w-11/12 mx-auto xl:w-auto'>
                    <div className='cursor-pointer xl:hidden'>
                        <Image src={navIcon} alt='menu button' />
                    </div>

                    <h1 className='text-2xl font-bold'>
                        <Link href='/'>Trendies</Link>
                    </h1>

                    <ul className='items-center hidden gap-8 uppercase xl:flex '>
                        <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                            <Link href='/'>home</Link>
                        </li>
                        <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                            <Link href='/category/mens'>mens</Link>
                        </li>
                        <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                            <Link href='/category/womens'>womens</Link>
                        </li>
                        <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                            <Link href='/category/jewelery'>jewelry</Link>
                        </li>
                        <li className='hover:text-[#e33f3f] cursor-pointer transition-all duration-300'>
                            <Link href='/category/electronics'>
                                electronics
                            </Link>
                        </li>
                    </ul>

                    <div className='flex justify-between'>
                        <div
                            className={
                                styles.wishlist +
                                " relative mr-4 cursor-pointer"
                            }>
                            <Image src={wishListIcon} alt='wish list' />
                            <ItemCount position='bottom-[10px] -right-[16px]' />
                        </div>

                        <div className='relative cursor-pointer'>
                            <Image src={cartIcon} alt=' cart' />
                            <ItemCount position='bottom-4 -right-[14px]' />
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
