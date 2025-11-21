import { create } from "zustand";
import { isPrimeNumber } from "../service/verifIsPrime.jsx";

const computePrimeWithCache = (number, cache) => {
  if (cache[number] !== undefined) {
    return { result: cache[number], cache };
  }
  const result = isPrimeNumber(number);
  return {
    result,
    cache: { ...cache, [number]: result },
  };
};

export const usePrimeStore = create((set) => ({
  currentNumber: null,
  isPrime: null,
  cache: {},
  mode: "idle",
  setNumberFromApi: (number) =>
    set((state) => {
      const { result, cache } = computePrimeWithCache(number, state.cache);
      return {
        currentNumber: number,
        isPrime: result,
        cache,
        mode: "random",
      };
    }),
  setNumberFromUser: (number) =>
    set((state) => {
      const { result, cache } = computePrimeWithCache(number, state.cache);
      return {
        currentNumber: number,
        isPrime: result,
        cache,
        mode: "manual",
      };
    }),
  reset: () =>
    set(() => ({
      currentNumber: null,
      isPrime: null,
      cache: {},
      mode: "idle",
    })),
}));

export default usePrimeStore;
