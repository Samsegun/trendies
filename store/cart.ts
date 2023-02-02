import { ProductArray } from "@/types/productType";
import { create } from "zustand";

interface CartState {
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
}

export const useCartStore = create<CartState>()(set => ({
    cart: [],
    totals: { cartQty: 0, cartTotals: 0 },
    addToCart: (id, name, qty, price, image) =>
        set(state => {
            if (state.cart.find(item => item.id === id)) {
                return { cart: state.cart };
            }

            return { cart: [...state.cart, { id, name, qty, price, image }] };
        }),
    increaseCartQty: id =>
        set(state => {
            const queryIndex = state.cart.findIndex(item => item.id === id);
            const cartState = [...state.cart];
            cartState[queryIndex] = {
                ...cartState[queryIndex],
                qty: (cartState[queryIndex].qty += 1),
            };

            return { cart: cartState };
        }),
    decreaseCartQty: id =>
        set(state => {
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
            return { cart: cartState };
        }),
    removeCartItem: id =>
        set(state => {
            const filteredCart = state.cart.filter(item => item.id !== id);

            return { cart: [...filteredCart] };
        }),
    resetCart: () => set(state => ({ cart: [] })),
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
}));
