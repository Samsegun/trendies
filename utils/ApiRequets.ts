import axios from "axios";
import { Categories, ProductArray } from "@/types/productType";

const constant = "https://fakestoreapi.com/";

export const ApiRequest = () => {
    const config = { baseURL: constant };
    const instance = axios.create(config);
    return instance;
};

export const ApiGetRequest = (endPoint: string) => {
    return ApiRequest().get<ProductArray>(endPoint);
};

export const ApiGetCategories = (endPoint: string) => {
    return ApiRequest().get<Categories>(endPoint);
};

export const getAllProducts = () => {
    return ApiGetRequest("/products");
};

export const getAllCategories = () => {
    return ApiGetCategories("/products/categories");
};

export const getSingleCategory = (name: string) => {
    return ApiGetRequest(`/products/category/${name}`);
};

export const getSingleProduct = (id: string) => {
    return ApiGetRequest(`/products/${id}`);
};

export const getJeweleryProducts = () => {
    return ApiGetRequest("/products/category/jewelery");
};

export const getElectronicProducts = () => {
    return ApiGetRequest("/products/category/electronics");
};

export const getMensProducts = () => {
    return ApiGetRequest("/products/category/men's%20clothing");
};

export const getWomensProducts = () => {
    return ApiGetRequest("/products/category/women's%20clothing");
};
