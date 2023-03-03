import Image, { StaticImageData } from "next/image";
import styles from "../../styles/BannerSection.module.css";
import ImageContainer from "../UI/ImageContainer";
import womens from "../../public/assets/banner-1.jpg";
import mens from "../../public/assets/banner-2.jpg";
import jewelery from "../../public/assets/jewel.jpg";
import electronics from "../../public/assets/elec.jpg";
import { useRouter } from "next/router";

type BannerType = {
    imagePath: StaticImageData;
    heading: string;
    link: string;
};

const bannerAssets: BannerType[] = [
    { imagePath: womens, heading: "shop women's", link: "/category/womens" },
    { imagePath: mens, heading: "shop men's", link: "/category/mens" },
    {
        imagePath: jewelery,
        heading: "shop jewelry",
        link: "/category/jewelery",
    },
    {
        imagePath: electronics,
        heading: "shop gadgets",
        link: "/category/electronics",
    },
];

const BannerSection = () => {
    const { push } = useRouter();

    return (
        <>
            {bannerAssets.map((asset: BannerType, idx: number) => {
                return (
                    <div
                        key={idx}
                        className={
                            "relative mb-8 md:mb-0 " + styles["banner-wrapper"]
                        }>
                        <div>
                            <ImageContainer imagePath={asset.imagePath} />
                        </div>

                        <div className='absolute top-0 z-20 flex flex-col w-4/5 h-full tracking-widest text-center text-white uppercase transition-all duration-300 -translate-x-1/2 left-1/2 sm:justify-center'>
                            <div className='flex flex-col h-full justify-evenly sm:h-1/2'>
                                <div>
                                    <span className='text-xs md:text-base'>
                                        new collection
                                    </span>
                                    <h2 className='text-2xl tracking-[3px] md:text-3xl'>
                                        {asset.heading}
                                    </h2>
                                </div>
                                <button
                                    type='button'
                                    className='uppercase tracking-widest text-sm p-2 w-fit mx-auto cursor-pointer
                                     border-b-[1px] transition-all duration-200 hover:bg-[#bf4040]'
                                    onClick={() => push(asset.link)}>
                                    discover now
                                </button>
                            </div>
                        </div>

                        {/* overlay */}
                        <div
                            className={
                                "absolute top-0 left-0 right-0 bottom-0 z-10 rounded-lg " +
                                styles.overlay
                            }></div>
                    </div>
                );
            })}
        </>
    );
};

export default BannerSection;
