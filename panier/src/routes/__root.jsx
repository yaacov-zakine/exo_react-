import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import ThemeToggle from "../components/ThemeToggle.jsx";

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
    {import.meta.env.DEV ? (
      <TanStackRouterDevtools position="bottom-right" />
    ) : null}
  </div>
);

export const Route = createRootRoute({
  component: RootComponent,
});
