import { useState } from "react";
import { textShortener } from "@/utils/productUtils";

type Props = {
    desc: string;
};

const ProductDescription = ({ desc }: Props) => {
    const [showMore, setShowMore] = useState(false);

    const shortenedText = textShortener(desc);

    const ShowBtn = () => {
        if (showMore) {
            return (
                <button
                    onClick={() => setShowMore(false)}
                    className='text-xs text-[#f44b4b] font-bold'>
                    (Show less)
                </button>
            );
        }

        return (
            <button
                onClick={() => setShowMore(true)}
                className='text-xs text-[#f44b4b] font-bold'>
                Show more
            </button>
        );
    };

    return (
        <span>
            {showMore ? desc : shortenedText}
            <ShowBtn />
        </span>
    );
};

export default ProductDescription;
