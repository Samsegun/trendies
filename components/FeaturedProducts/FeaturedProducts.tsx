import styles from "../../styles/FeaturedProducts.module.css";

const FeaturedProducts = () => {
    return (
        <section className='bg-[#e4e4e4] mt-8 py-12 px-4'>
            <div className='uppercase text-center tracking-widest'>
                <h2 className='text-xl mb-4'>featured products</h2>

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
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non,
                quibusdam.
            </div>
        </section>
    );
};

export default FeaturedProducts;
