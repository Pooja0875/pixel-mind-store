import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

type Store = {
  search: string;
  category: string;
  cart: Product[];
  products: Product[];
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  isAdmin: boolean;
  setAdmin: (value: boolean) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      search: "",
      category: "",
      cart: [],
      products: [],
      setSearch: (search) => set({ search }),
      setCategory: (category) => set({ category }),
      addToCart: (product) =>
        set((state) => ({ cart: [...state.cart, product] })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
      setProducts: (products) => set({ products }),
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),
        removeProduct: (id) => // ← Add this function
          set((state) => ({
           products: state.products.filter((p) => p.id !== id),
        })),
        isAdmin: false,
        setAdmin: (value) => set({ isAdmin: value }),
      isCartOpen: false,
      toggleCart: () =>
        set((state) => ({ isCartOpen: !state.isCartOpen })),
    }),
    {
      name: "pixel-store", // 🔐 LocalStorage key
      partialize: (state) => ({
        products: state.products,
        cart: state.cart,
      }),
    }
  )
);
