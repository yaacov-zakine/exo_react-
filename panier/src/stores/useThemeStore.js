import { create } from "zustand";
import { persist } from "zustand/middleware";

const getDefaultTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: getDefaultTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    { name: "panier-theme" }
  )
);
