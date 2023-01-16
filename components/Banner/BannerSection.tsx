import Image, { StaticImageData } from "next/image";
import ImageContainer from "../UI/ImageContainer";
import womens from "../../public/assets/banner-1.jpg";
import mens from "../../public/assets/banner-2.jpg";

type BannerType = {
    imagePath: StaticImageData;
    heading: string;
};

const bannerAssets: BannerType[] = [
    { imagePath: womens, heading: "shop women's" },
    { imagePath: mens, heading: "shop men's" },
];

const BannerSection = () => {
    return (
        <>
            {bannerAssets.map((asset: BannerType, idx: number) => {
                return (
                    <div key={idx} className='relative mb-8 cursor-pointer'>
                        <div>
                            <ImageContainer imagePath={asset.imagePath} />
                        </div>

                        <div className='uppercase w-4/5 text-center text-white absolute top-0 left-1/2 -translate-x-1/2 translate-y-1/2'>
                            <span className='text-[1.4rem]'>
                                new collection
                            </span>
                            <h2>{asset.heading}</h2>
                            <button type='button' className='uppercase'>
                                discover now
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default BannerSection;
