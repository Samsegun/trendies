import { ProductArray } from "@/types/productType";

export const randomIndex = (list: ProductArray) => {
    return Math.floor(Math.random() * list.length);
};

export const filterByCategory = (list: ProductArray, category: string) => {
    const newList: ProductArray = list.filter(
        item => item.category.split(" ")[0] === category
    );

    return newList;
};

export const checkDuplicates = () => {};

export const getTwoRandomProducts = (list: ProductArray, category: string) => {
    const twoRandomProducts: ProductArray = [];

    const filteredList = filterByCategory(list, category);
    // console.log(list);

    twoRandomProducts.push(filteredList[randomIndex(filteredList)]);
    twoRandomProducts.push(filteredList[randomIndex(filteredList)]);

    return twoRandomProducts;
};
