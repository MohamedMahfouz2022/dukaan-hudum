import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product) => {
        const items = get().items;
        const exists = items.find((item) => item.id === product.id);
        
        if (exists) {
          set({ items: items.filter((item) => item.id !== product.id) });
        } else {
          set({ items: [...items, product] });
        }
      },
      isInWishlist: (id) => get().items.some((item) => item.id === id),
      removeItem: (id) => set({ items: get().items.filter((item) => item.id !== id) }),
    }),
    {
      name: 'luxe-men-wishlist',
    }
  )
);
