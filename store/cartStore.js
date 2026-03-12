import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, size, color) => {
        const items = get().items;
        const existingItem = items.find(
          (item) => 
            item.id === product.id && 
            item.selectedSize === size && 
            item.selectedColor?.name === color?.name
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && 
              item.selectedSize === size && 
              item.selectedColor?.name === color?.name
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }] });
        }
      },
      removeItem: (id, size, colorName) => {
        set({
          items: get().items.filter(
            (item) => 
              !(item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName)
          ),
        });
      },
      updateQuantity: (id, size, colorName, quantity) => {
        set({
          items: get().items.map((item) =>
            item.id === id && item.selectedSize === size && item.selectedColor?.name === colorName
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      get totalItems() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      get subtotal() {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'luxe-men-cart',
    }
  )
);
