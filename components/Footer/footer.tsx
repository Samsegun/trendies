import Container from "../UI/container";
import fbIcon from "../../public/assets/fb.svg";
import instaIcon from "../../public/assets/insta.svg";
import twitterIcon from "../../public/assets/twitter.svg";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className='text-white bg-black'>
            <Container>
                <div className='px-6 py-12 tracking-widest text-center'>
                    <div className='flex flex-col gap-12'>
                        <h2 className='text-xl font-semibold uppercase'>
                            Trendies
                        </h2>

                        <ul className='flex flex-col gap-4 uppercase'>
                            <li>home</li>
                            <li>mens</li>
                            <li>womens</li>
                            <li>jewelry</li>
                            <li>electronics</li>
                        </ul>
                    </div>

                    <div className='flex flex-col gap-12 mt-12'>
                        <p className='text-[#666]'>
                            Audiophile is an all in one stop to fulfill your
                            audio needs. We're a small team of music lovers and
                            sound specialists who are devoted to helping you get
                            the most out of personal audio. Come and visit our
                            demo facility - we’re open 7 days a week.
                        </p>

                        <div className='text-[#666] flex flex-col gap-12'>
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
