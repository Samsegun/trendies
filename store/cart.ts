import { initialize } from "@/firebase";
import { ProductArray } from "@/types/productType";
import { collection, doc, setDoc } from "firebase/firestore";
import { create } from "zustand";

interface CartState {
    user: any;
    cart: {
        id: number;
        name: string;
        qty: number;
        price: number;
        image: string;
    }[];
    totals: { cartQty: number; cartTotals: number };
    addToCart: (
        id: number,
        name: string,
        qty: number,
        price: number,
        image: string
    ) => void;
    increaseCartQty: (id: number) => void;
    decreaseCartQty: (id: number) => void;
    removeCartItem: (id: number) => void;
    resetCart: () => void;
    addTotals: () => void;
    setToCart: (cartFromStorage: []) => void;
    setUser: (user: any) => void;
}

interface newCartState {
    id: number;
    name: string;
    qty: number;
    price: number;
    image: string;
}

// const storageCart = localStorage.getItem("cart")
//     ? JSON.parse(localStorage.getItem("cart")!)
//     : null;

export const useCartStore = create<CartState>()(set => {
    // get collection from firestore
    const { fireStore, auth } = initialize();
    const cartCol = collection(fireStore, "cart");

    return {
        user: null,
        cart: [],
        totals: { cartQty: 0, cartTotals: 0 },
        addToCart: (id, name, qty, price, image) =>
            set(state => {
                let newCart: {};
                if (state.cart.find(item => item.id === id)) {
                    newCart = { cart: state.cart };

                    // set to local storage
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    return newCart;
                }

                newCart = {
                    cart: [...state.cart, { id, name, qty, price, image }],
                };

                // set to local storage
                localStorage.setItem("cart", JSON.stringify(newCart));

                return newCart;
            }),
        increaseCartQty: id =>
            set(state => {
                let newCart: {
                    cart: newCartState[];
                };
                const queryIndex = state.cart.findIndex(item => item.id === id);
                const cartState = [...state.cart];
                cartState[queryIndex] = {
                    ...cartState[queryIndex],
                    qty: (cartState[queryIndex].qty += 1),
                };

                newCart = { cart: cartState };

                // set to local storage
                localStorage.setItem("cart", JSON.stringify(newCart));

                // set to database if user is logged in
                if (state.user) {
                    const userCart = doc(cartCol, state.user.uid);

                    setDoc(userCart, {
                        cart: newCart.cart,
                    });
                }

                return newCart;
            }),
        decreaseCartQty: id =>
            set(state => {
                let newCart: {
                    cart: newCartState[];
                };
                const queryIndex = state.cart.findIndex(item => item.id === id);
                const cartState = [...state.cart];

                // check if item's qty is 1 and return
                if (cartState[queryIndex].qty === 1) {
                    return { cart: cartState };
                }

                cartState[queryIndex] = {
                    ...cartState[queryIndex],
                    qty: (cartState[queryIndex].qty -= 1),
                };

                newCart = { cart: cartState };

                // set to local storage
                localStorage.setItem("cart", JSON.stringify(newCart));

                // set to database if user is logged in
                if (state.user) {
                    const userCart = doc(cartCol, state.user.uid);

                    setDoc(userCart, {
                        cart: newCart.cart,
                    });
                }

                return newCart;
            }),
        removeCartItem: id =>
            set(state => {
                let newCart: {
                    cart: newCartState[];
                };
                const filteredCart = state.cart.filter(item => item.id !== id);

                newCart = { cart: filteredCart };

                // set to local storage
                localStorage.setItem("cart", JSON.stringify(newCart));

                // set to database if user is logged in
                if (state.user) {
                    const userCart = doc(cartCol, state.user.uid);

                    setDoc(
                        userCart,
                        {
                            cart: newCart.cart,
                        },
                        { merge: true }
                    );
                }

                return newCart;
            }),
        resetCart: () =>
            set(state => {
                // remove from local storage
                localStorage.removeItem("cart");

                // remove from database if user is logged in
                if (Object.keys(state.user).length) {
                    const userCart = doc(cartCol, state.user.uid);

                    setDoc(userCart, {
                        cart: [],
                    });
                }

                return { cart: [] };
            }),
        addTotals: () =>
            set(state => {
                let quantities = 0;
                let total = 0;
                state.cart.forEach(item => {
                    quantities += item.qty;
                    total += item.qty * item.price;
                });
                return { totals: { cartQty: quantities, cartTotals: total } };
            }),
        setToCart: cartFromStorage => set(state => ({ cart: cartFromStorage })),
        setUser: user =>
            set(state => {
                return { user };
            }),
    };
});
