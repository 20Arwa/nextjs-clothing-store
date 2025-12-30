import {create} from "zustand"
import {persist} from "zustand/middleware"

export type cartItem = {
    id: string, 
    name: string, 
    image: string,
    price: number,
    quantity: number
}

type cartStore = {
    items: cartItem[],
    addItem: (item: cartItem) => void,
    removeItem: (id: string) => void,
    clearCart: () => void
}

export const useCartStore = create(
    persist<cartStore>(
        (set) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existsItem = state.items.find((i) => i.id === item.id);
                    if (existsItem) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id
                                    ? { ...i, quantity: i.quantity + 1 }
                                    : i
                            ),
                        };
                    }
                    return {
                        items: [...state.items, item],
                    };
                });
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items
                        .map((i) =>
                            i.id === id
                                ? { ...i, quantity: i.quantity - 1 }
                                : i
                        )
                        .filter((i) => i.quantity > 0),
                }));
            },

            clearCart: () => set({ items: [] }),
        }),
        {
            name: "cart-storage", 
        }
    )
)

