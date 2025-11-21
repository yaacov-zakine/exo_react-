import { useMemo } from "react";

export function Prime({ number, isPrime, mode }) {
  const status = useMemo(() => {
    if (number === null || number === undefined) {
      return {
        label: "Aucun nombre à vérifier pour le moment.",
        color: "text-slate-500",
        badge: "En attente",
      };
    }

    return {
      label: isPrime
        ? `${number} est un nombre premier 🎉`
        : `${number} n'est pas un nombre premier`,
      color: isPrime ? "text-emerald-600" : "text-rose-600",
      badge: isPrime ? "Premier" : "Composite",
    };
  }, [number, isPrime]);

  return (
    <article className="w-full rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Nombre courant {mode !== "idle" && `• ${mode === "manual" ? "manuel" : "aléatoire"}`}
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color} ${status.color.replace(
            "text-",
            "bg-",
          )} bg-opacity-10`}
        >
          {status.badge}
        </span>
      </div>
      <div className="mt-4 text-5xl font-black text-slate-900">{number ?? "--"}</div>
      <p className={`mt-2 text-lg font-semibold ${status.color}`}>{status.label}</p>
    </article>
  );
}
