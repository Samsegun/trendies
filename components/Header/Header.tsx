import Image from "next/image";
import styles from "../../styles/Header.module.css";
import navIcon from "../../public/assets/navIcon.svg";
import wishListIcon from "../../public/assets/wishListIcon.svg";
import cartIcon from "../../public/assets/cartIcon.svg";
import ItemCount from "../UI/itemsCount";

const Header = () => {
    return (
        <header className='bg-black text-[#fff] flex justify-between items-center p-4'>
            <div className='cursor-pointer'>
                <Image src={navIcon} alt='mobile menu' />
            </div>

            <h1 className='text-2xl font-bold'>Trendies</h1>

            <div className='flex justify-between'>
                <div
                    className={
                        styles.wishlist + " relative mr-2 cursor-pointer"
                    }>
                    <Image src={wishListIcon} alt='wish list' />
                    {/* <ItemCount position='bottom-[10px] -right-[16px]' /> */}
                </div>

                <div className='cursor-pointer relative'>
                    <Image src={cartIcon} alt=' cart' />
                    {/* <ItemCount position='bottom-4 -right-[14px]' /> */}
                </div>
            </div>
        </header>
    );
};

export default Header;
