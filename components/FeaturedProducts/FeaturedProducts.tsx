import { ProductArray } from "@/types/productType";
import { FC, useState } from "react";
import styles from "../../styles/FeaturedProducts.module.css";
import Container from "../UI/container";
import ProductCard from "../UI/productCard";
import { getTwoRandomProducts } from "@/utils/productUtils";

const FeaturedProducts: FC<{ products: ProductArray }> = ({ products }) => {
    const [genderState, setGenderState] = useState({ women: true, men: false });
    const [filteredProducts, setFilteredProducts] = useState<ProductArray>([]);

    const genderHandler = (text: string) => {
        if (text === "men's") {
            setFilteredProducts(getTwoRandomProducts(products, text));
            setGenderState({ women: false, men: true });
        } else {
            setFilteredProducts(getTwoRandomProducts(products, text));
            setGenderState({ women: true, men: false });
        }
    };

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
                        <button
                            type='button'
                            className={`${styles.btn} ${
                                genderState.women && styles["active-btn"]
                            }`}
                            onClick={genderHandler.bind(null, "women's")}>
                            womens clothing
                        </button>

                        <button
                            type='button'
                            className={`${styles.btn} ${
                                genderState.men && styles["active-btn"]
                            }`}
                            onClick={genderHandler.bind(null, "men's")}>
                            mens clothing
                        </button>
                    </div>
                </div>

                <div className='mt-8'>
                    <ProductCard products={filteredProducts} />
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProducts;
