import styles from "../../styles/FeaturedProducts.module.css";
import Container from "../UI/container";
import ProductCard from "../UI/productCard";

const FeaturedProducts = () => {
    return (
        <section className='bg-[#e4e4e4] mt-8 py-12 px-4'>
            <Container>
                <div className='tracking-widest text-center uppercase'>
                    <h2 className='mb-4 text-xl'>featured products</h2>

                    <div
                        className={
                            "flex flex-col gap-4 w-fit mx-auto tracking-widest " +
                            styles["btn-wrapper"]
                        }>
                        <button className={styles.btn}>womens clothing</button>
                        <button className={styles.btn}>mens clothing</button>
                    </div>
                </div>

                <div className='mt-8'>
                    <ProductCard />
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProducts;
