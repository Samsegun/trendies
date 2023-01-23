import { ParamsContext } from "@/context/productParams";
import { useRouter } from "next/router";
import { useContext } from "react";

const ProductPage = () => {
    const { params } = useContext(ParamsContext);
    // const router = useRouter();

    console.log(params);

    return (
        <div>
            <h1>product page</h1>

            {/* <ul>
                {params.map(param => {
                    return <li>{param}</li>
                })}
            </ul> */}
        </div>
    );
};

export default ProductPage;
