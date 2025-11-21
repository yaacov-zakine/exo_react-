// @ts-nocheck -- manual route tree assembly for TanStack Router
import { Route as rootRoute } from "./routes/__root.jsx";
import { Route as indexRoute } from "./routes/index.jsx";
import { Route as primesRoute } from "./routes/primes.jsx";

export const routeTree = rootRoute.addChildren([indexRoute, primesRoute]);

declare module "@tanstack/react-router" {
  interface Register {
    routeTree: typeof routeTree;
  }
}
