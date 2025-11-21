import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <div className="layout">
    <header className="layout__header">
      <div>
        <p className="layout__eyebrow">Simulation</p>
        <h2>Machine de Turing</h2>
      </div>
      <nav className="layout__nav">
        <Link to="/" activeProps={{ className: "active" }}>
          Accueil
        </Link>
        <Link to="/about" activeProps={{ className: "active" }}>
          À propos
        </Link>
        <Link to="/category" activeProps={{ className: "active" }}>
          Scénarios
        </Link>
        <Link to="/pokemon" activeProps={{ className: "active" }}>
          Pokémon
        </Link>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
    {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
  </div>
);

export const Route = createRootRoute({ component: RootLayout });
