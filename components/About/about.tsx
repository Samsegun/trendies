import Container from "../UI/container";
import styles from "../../styles/index.module.css";
import ImageContainer from "../UI/ImageContainer";
import entrance from "../../public/assets/store-entrance.jpg";

const About = () => {
    return (
        <Container>
            <div
                className={
                    "flex flex-col gap-8 px-4 my-14 md:flex-row " + styles.about
                }>
                <article className='order-2 text-center md:order-1'>
                    <h2 className='mb-4 text-xl font-medium tracking-widest uppercase xl:mb-8'>
                        bringing you the <br />{" "}
                        <span className='text-[#c66]'>latest</span> trends
                    </h2>

                    <p className='text-[#666] xl:leading-[1.85rem]'>
                        Located at the heart of Lagos City, Trendies is the
                        premier store for high quality male and female wears,
                        jewelry, and electronics. We have a large showroom and
                        luxury demonstration rooms available for you to browse
                        and experience a wide range of our products. Stop by our
                        store to meet some of the fantastic people who make
                        Trendies the best place to buy your outfits and
                        electronics.
                    </p>
                </article>

                <div className='max-w-md mx-auto md:order-2'>
                    <ImageContainer imagePath={entrance} />
                </div>
            </div>
        </Container>
    );
};

export default About;
