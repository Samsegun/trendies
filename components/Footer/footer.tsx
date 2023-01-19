import Container from "../UI/container";
import fbIcon from "../../public/assets/fb.svg";
import instaIcon from "../../public/assets/insta.svg";
import twitterIcon from "../../public/assets/twitter.svg";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className='text-white bg-black'>
            <Container>
                <div className='px-6 py-12 tracking-widest text-center md:text-justify'>
                    <div className='flex flex-col gap-12 xl:flex-row xl:justify-between xl:items-center'>
                        <h2 className='text-xl font-semibold uppercase'>
                            Trendies
                        </h2>

                        <ul className='flex flex-col gap-4 uppercase md:flex-row'>
                            <li>home</li>
                            <li>mens</li>
                            <li>womens</li>
                            <li>jewelry</li>
                            <li>electronics</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-12 mt-12'>
                        <p className='text-[#666] xl:w-1/2'>
                            Trendies is an all in one stop to fulfill your wears
                            and gadgets needs. We're a small team of fashion
                            lovers and gadget freaks who are devoted to helping
                            you get the most out of personal needs. Come and
                            visit our store - we’re open 7 days a week.
                        </p>

                        <div className='text-[#666] flex flex-col gap-12 md:flex-row md:justify-between'>
                            <p>
                                &copy;{new Date().getUTCFullYear()}. All Rights
                                Reserved
                            </p>

                            <div className='flex justify-center gap-4'>
                                <Image src={fbIcon} alt='' />
                                <Image src={instaIcon} alt='' />
                                <Image src={twitterIcon} alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
