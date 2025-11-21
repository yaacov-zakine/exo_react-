import { Link, Outlet } from "@tanstack/react-router";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-xl font-bold text-primary-600">
            PrimeLab Play
          </Link>
          <div className="flex gap-4 text-sm font-semibold text-slate-600">
            <Link
              to="/"
              activeProps={{ className: "text-primary-600" }}
              className="transition hover:text-primary-600"
            >
              Accueil
            </Link>
            <Link
              to="/primes"
              activeProps={{ className: "text-primary-600" }}
              className="transition hover:text-primary-600"
            >
              Nombres premiers
            </Link>
          </div>
        </div>
      </nav>
      <main className="px-4">
        <Outlet />
      </main>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </div>
  );
}

export const Route = createRootRouteWithContext()({
  component: RootLayout,
});
