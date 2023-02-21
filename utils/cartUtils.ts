import { initialize } from "@/firebase";
import {
    collection,
    doc,
    getDoc,
    onSnapshot,
    setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const { fireStore, auth } = initialize();
const cartCol = collection(fireStore, "cart");

export const setCartFromStorage = (setToCart: (a: []) => void) => {
    const fromStorage: [] = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart")!).cart
        : [];
    setToCart(fromStorage);
};

export const getCartFromDb = async (
    uid: string,
    setToCart: (a: []) => void
) => {
    const singleCart = doc(cartCol, uid);

    try {
        const docSnap = await getDoc(singleCart);

        if (docSnap.exists() && docSnap.data()!.cart) {
            console.log(docSnap.data()!.cart);
            setToCart(docSnap.data()!.cart);
        } else {
            setToCart([]);
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to get cart from store!");
    }
};

export const checkAndSetCartToDb = async (
    uid: string,
    setToCart: (a: []) => void,
    cartFromLocalStorage: any
) => {
    const singleCart = doc(cartCol, uid);

    try {
        const docSnap = await getDoc(singleCart);

        if (docSnap.exists() && docSnap.data()!.cart.length) {
            setToCart(docSnap.data()!.cart);
        } else {
            // set to database
            setDoc(singleCart, {
                cart: [...cartFromLocalStorage],
            });
        }
    } catch (error) {}
};
