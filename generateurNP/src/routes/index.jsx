import { Link, createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root.jsx";

function HomePage() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col justify-center gap-6 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
        TP React • TanStack • Zustand
      </p>
      <h1 className="text-4xl font-black text-slate-900">
        Générateur de nombres premiers optimisé
      </h1>
      <p className="text-lg text-slate-600">
        Cette application pédagogique illustre la séparation des responsabilités : TanStack Query
        gère l&apos;asynchrone, Zustand encapsule la logique métier, Zod valide les entrées et le
        Router orchestre la navigation.
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Link
          to="/primes"
          className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-primary-500/30 transition hover:brightness-110"
        >
          Explorer la démo
        </Link>
        <a
          href="https://tanstack.com/router/latest"
          target="_blank"
          rel="noreferrer"
          className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-slate-700 hover:underline"
        >
          Documentation TanStack Router
        </a>
      </div>
    </section>
  );
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
