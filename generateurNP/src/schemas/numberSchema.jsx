import { z } from "zod";

const toNumber = (value) => {
  if (typeof value === "string" && value.trim().length > 0) {
    return Number(value);
  }
  return value;
};

export const manualNumberSchema = z.object({
  number: z
    .preprocess(
      toNumber,
      z
        .number({
          required_error: "Un nombre est requis.",
          invalid_type_error: "Merci de saisir un nombre valide.",
        })
        .refine(Number.isFinite, "Merci de saisir un nombre valide.")
        .int("Les décimales ne sont pas autorisées.")
        .min(1, "Le nombre doit être supérieur ou égal à 1.")
        .max(1000, "Le nombre doit être inférieur ou égal à 1000."),
    ),
});
