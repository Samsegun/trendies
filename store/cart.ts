import { create } from "zustand";

interface CartState {
    cart: { id: number; name: string; qty: number }[];
    addToCart: (id: number, name: string, qty: number) => void;
    increaseCartQty: (id: number) => void;
    decreaseCartQty: (id: number) => void;
    removeCartItem: (id: number) => void;
}

export const useCartStore = create<CartState>()(set => ({
    cart: [],
    addToCart: (id, name, qty) =>
        set(state => {
            if (state.cart.find(item => item.id === id)) {
                return { cart: state.cart };
            }

            return { cart: [...state.cart, { id, name, qty }] };
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
}));
