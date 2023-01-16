import Image from "next/image";
import styles from "../../styles/index.module.css";

const ImageContainer: React.FC<{ imagePath: string }> = ({ imagePath }) => {
    return (
        <div className={styles["image-wrapper"]}>
            <Image src={imagePath} alt='' width='1000' height='1000' />
        </div>
    );
};

export default ImageContainer;
