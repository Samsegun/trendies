import axios from "axios";
import { ProductArray } from "@/types/productType";

const constant = "https://fakestoreapi.com/";

export const ApiRequest = () => {
    const config = { baseURL: constant };
    const instance = axios.create(config);
    return instance;
};

export const getAllProducts = () => {
    return ApiRequest().get<ProductArray>("/products");
};

export const getJeweleryProducts = () => {
    return ApiRequest().get<ProductArray>("/products/category/jewelery");
};

export const getElectronicProducts = () => {
    return ApiRequest().get<ProductArray>("/products/category/electronics");
};
