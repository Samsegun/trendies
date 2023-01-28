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

export const checkAndRemoveDuplicates = (filteredList: ProductArray) => {
    /* check and return different products */
    const noDuplicates: ProductArray = [];

    let index1 = randomIndex(filteredList);
    let index2 = randomIndex(filteredList);

    while (index1 === index2) {
        index2 = randomIndex(filteredList);
    }

    noDuplicates.push(filteredList[index1], filteredList[index2]);

    return noDuplicates;
};

export const getTwoRandomProducts = (list: ProductArray, category: string) => {
    const filteredList = filterByCategory(list, category);

    const noDuplicateProducts = checkAndRemoveDuplicates(filteredList);

    return noDuplicateProducts;
};

// export const adjustCartItemQty = (qty: number, operation: string) => {
//     let itemQty = qty;

//     if (operation === "subtract" && itemQty >= 2) {
//         return (itemQty -= 1);
//     }

//     if (operation === "add") {
//         return (itemQty += 1);
//     }
// };
