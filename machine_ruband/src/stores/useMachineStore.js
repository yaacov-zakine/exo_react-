import { create } from "zustand";
import { persist } from "zustand/middleware";

const INITIAL_TAPE = ["_", "_", "_", "_", "_", "_", "_"];
const INITIAL_HEAD = 0;

export const useMachineStore = create(
  persist(
    (set) => ({
      tape: [...INITIAL_TAPE],
      headPosition: INITIAL_HEAD,
      indicator: `Position actuelle : ${INITIAL_HEAD + 1}/${
        INITIAL_TAPE.length
      }`,

      // ✅ valeur numérique persistée automatiquement
      numericChoice: 0,
      setNumericChoice: (value) => set({ numericChoice: Number(value) }),

      step: () =>
        set((state) => {
          if (state.headPosition >= state.tape.length - 1) {
            return {
              tape: [...INITIAL_TAPE],
              headPosition: INITIAL_HEAD,
              indicator: `Position actuelle : ${INITIAL_HEAD + 1}/${
                INITIAL_TAPE.length
              }`,
            };
          }

          const nextTape = [...state.tape];
          nextTape[state.headPosition] = "1";
          const nextPosition = state.headPosition + 1;

          return {
            tape: nextTape,
            headPosition: nextPosition,
            indicator: `Position actuelle : ${nextPosition + 1}/${
              state.tape.length
            }`,
          };
        }),

      reset: () =>
        set({
          tape: [...INITIAL_TAPE],
          headPosition: INITIAL_HEAD,
          indicator: `Position actuelle : ${INITIAL_HEAD + 1}/${
            INITIAL_TAPE.length
          }`,
        }),
    }),
    {
      name: "machine-storage", // 🗄️ nom de la clé dans localStorage
      partialize: (state) => ({ numericChoice: state.numericChoice }), // optionnel : ne sauvegarde que numericChoice
    }
  )
);
