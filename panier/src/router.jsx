import {
  Link,
  Outlet,
  RootRoute,
  Route,
  Router,
} from "@tanstack/react-router";
import { RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

const RootComponent = () => (
  <div className="app-shell">
    <header className="app-header">
      <div>
        <p className="app-header__eyebrow">Atelier Café</p>
        <h2 className="app-header__title">Boutique</h2>
      </div>
      <nav className="app-nav">
        <Link to="/" activeProps={{ className: "active" }}>
          Home
        </Link>
        <Link to="/catalogues" activeProps={{ className: "active" }}>
          Catalogues
        </Link>
      </nav>
      <ThemeToggle />
    </header>
    <main className="app-main">
      <Outlet />
    </main>
    {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
  </div>
);

const rootRoute = new RootRoute({
  component: RootComponent,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const catalogRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/catalogues",
  component: CatalogPage,
});

const routeTree = rootRoute.addChildren([homeRoute, catalogRoute]);

export const router = new Router({ routeTree });

export function AppRouter() {
  return <RouterProvider router={router} />;
}
