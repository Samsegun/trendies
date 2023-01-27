import { create } from "zustand";

interface CartState {
    cart: { id: number; name: string; qty: number }[];
    addToCart: (id: number, name: string, qty: number) => void;
    increaseCartQty: (id: number) => void;
}

export const useCartStore = create<CartState>()(set => ({
    cart: [{ id: 0, name: "sam", qty: 889 }],
    addToCart: (id, name, qty) =>
        set(state => ({ cart: [...state.cart, { id, name, qty }] })),
    increaseCartQty: id =>
        set(state => {
            const queryItem = state.cart.findIndex(item => item.id === id);
            const cartState = [...state.cart];
            cartState[queryItem] = {
                ...cartState[queryItem],
                qty: cartState[queryItem].qty++,
            };

            return { cart: cartState };
        }),
}));
