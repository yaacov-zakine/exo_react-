import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root.jsx";
import { PrimesPage } from "../pages/PrimesPage.jsx";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "primes",
  component: PrimesPage,
});
