import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_PRODUCTS = [
  {
    id: "espresso",
    name: "Assemblage Espresso",
    description: "Mélange gourmand pour les amateurs de café serré.",
    price: 12.5,
    badge: "Nouveau",
  },
  {
    id: "dripper",
    name: "Kit V60",
    description: "Tout le nécessaire pour débuter le slow coffee à la maison.",
    price: 42,
    badge: "Best-seller",
  },
  {
    id: "kettle",
    name: "Bouilloire Col de cygne",
    description: "Contrôle précis pour vos extractions filtre.",
    price: 69,
  },
  {
    id: "beans",
    name: "Pack découverte 3 origines",
    description: "Éthiopie, Guatemala et Colombie torréfiés cette semaine.",
    price: 29,
  },
  {
    id: "cup",
    name: "Tasses double paroi (x2)",
    description: "Conservent la chaleur sans vous brûler.",
    price: 24,
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
    { name: "panier-cart" }
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
