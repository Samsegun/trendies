import Image, { StaticImageData } from "next/image";
import styles from "../../styles/BannerSection.module.css";
import ImageContainer from "../UI/ImageContainer";
import womens from "../../public/assets/banner-1.jpg";
import mens from "../../public/assets/banner-2.jpg";
import jewelery from "../../public/assets/jewel.jpg";
import electronics from "../../public/assets/elec.jpg";

type BannerType = {
    imagePath: StaticImageData;
    heading: string;
};

const bannerAssets: BannerType[] = [
    { imagePath: womens, heading: "shop women's" },
    { imagePath: mens, heading: "shop men's" },
    { imagePath: jewelery, heading: "shop jewelry" },
    { imagePath: electronics, heading: "shop gadgets" },
];

const BannerSection = () => {
    return (
        <>
            {bannerAssets.map((asset: BannerType, idx: number) => {
                return (
                    <div
                        key={idx}
                        className={
                            "relative mb-8 cursor-pointer md:mb-0 " +
                            styles["banner-wrapper"]
                        }>
                        <div>
                            <ImageContainer imagePath={asset.imagePath} />
                        </div>

                        <div
                            className='uppercase w-4/5 h-full flex flex-col text-center text-white absolute top-0 left-1/2
                         -translate-x-1/2 tracking-widest z-20 transition-all duration-300 sm:justify-center'>
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
                                    className='uppercase tracking-widest text-sm p-2 w-fit mx-auto
                                     border-b-[1px] transition-all duration-200 hover:bg-[#bf4040]'>
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
