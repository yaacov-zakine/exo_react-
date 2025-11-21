import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Café Arabica",
    price: 3.5,
    category: "boissons",
    description:
      "Un café 100% Arabica torréfié lentement pour un goût doux et équilibré.",
    rating: 4.6,
    stock: 24,
    origin: "Colombie",
  },
  {
    id: 2,
    name: "Thé Vert Matcha",
    price: 2.8,
    category: "boissons",
    description:
      "Thé vert matcha premium avec une légère amertume et des notes végétales.",
    rating: 4.2,
    stock: 15,
    origin: "Japon",
  },
  {
    id: 3,
    name: "Chocolat Noir 80%",
    price: 4.2,
    category: "gâteaux",
    description:
      "Tablette de chocolat noir intense (80%) à la texture fondante.",
    rating: 4.7,
    stock: 40,
    origin: "Belgique",
  },
  {
    id: 4,
    name: "Croissant Beurre AOP",
    price: 1.9,
    category: "pâtisseries",
    description:
      "Croissant pur beurre AOP croustillant et doré, fait chaque matin.",
    rating: 4.5,
    stock: 32,
    origin: "France",
  },
  {
    id: 5,
    name: "Cookie Double Chocolat",
    price: 2.2,
    category: "pâtisseries",
    description:
      "Cookie moelleux au chocolat noir et lait, pépites généreuses.",
    rating: 4.8,
    stock: 18,
    origin: "États-Unis",
  },
  {
    id: 6,
    name: "Jus d'Orange Pressé",
    price: 3.0,
    category: "boissons",
    description:
      "Jus d'orange pressé à froid, riche en vitamines, sans sucre ajouté.",
    rating: 4.4,
    stock: 12,
    origin: "Espagne",
  },
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      addToCart: (productId) =>
        set((state) => {
          const exists = state.cart.find((item) => item.id === productId);
          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            cart: [...state.cart, { id: productId, quantity: 1 }],
          };
        }),
      removeFromCart: (productId) =>
        set((state) => {
          const updated = state.cart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0);
          return { cart: updated };
        }),
      clearCart: () => set({ cart: [] }),
      total: () => {
        const { products, cart } = get();
        return cart.reduce((sum, item) => {
          const product = products.find((prod) => prod.id === item.id);
          return product ? sum + product.price * item.quantity : sum;
        }, 0);
      },
    }),
    {
      name: "panier-cart",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState = { cart: [] }) => {
        const validCart = Array.isArray(persistedState.cart)
          ? persistedState.cart.filter((item) =>
              INITIAL_PRODUCTS.some((product) => product.id === item.id)
            )
          : [];

        return {
          cart: validCart,
        };
      },
      partialize: (state) => ({
        cart: state.cart,
      }),
    }
  )
);

export const selectCartWithDetails = (state) =>
  state.cart.map((item) => {
    const product = state.products.find((prod) => prod.id === item.id);
    if (!product) return item;
    return {
      ...item,
      ...product,
      lineTotal: product.price * item.quantity,
    };
  });
