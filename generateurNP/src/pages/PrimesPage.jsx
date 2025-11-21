import { useState } from "react";
import { usePrimeAlea } from "../hooks/usePrimeAlea.jsx";
import { Prime } from "../components/Prime.jsx";
import { Button } from "../components/ui/Button.jsx";
import { manualNumberSchema } from "../schemas/numberSchema.jsx";
import { usePrimeStore } from "../stores/usePrimeStore.js";

export function PrimesPage() {
  const [userInput, setUserInput] = useState("");
  const [formError, setFormError] = useState("");

  const currentNumber = usePrimeStore((state) => state.currentNumber);
  const isPrime = usePrimeStore((state) => state.isPrime);
  const mode = usePrimeStore((state) => state.mode);
  const setNumberFromUser = usePrimeStore((state) => state.setNumberFromUser);
  const reset = usePrimeStore((state) => state.reset);

  const { data, isLoading, isFetching, isError, error, refetch } = usePrimeAlea();

  const handleSubmit = (event) => {
    event.preventDefault();
    const parsed = manualNumberSchema.safeParse({ number: userInput });
    if (!parsed.success) {
      setFormError(parsed.error.formErrors?.fieldErrors?.number?.[0] ?? "Valeur invalide.");
      return;
    }

    setFormError("");
    setNumberFromUser(parsed.data.number);
    setUserInput("");
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-10">
      <header className="space-y-3 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600">
          Générateur optimisé
        </p>
        <h1 className="text-4xl font-black text-slate-900">Nombres premiers</h1>
        <p className="text-base text-slate-600">
          Les nombres sont récupérés via TanStack Query, validés par Zod, puis analysés dans
          Zustand.
        </p>
      </header>

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/70 p-10 text-slate-500">
            Chargement du premier nombre...
          </div>
        ) : (
          <Prime number={currentNumber} isPrime={isPrime} mode={mode} />
        )}
        {isError && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            Impossible de charger un nombre : {error?.message ?? "Erreur inconnue."}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => refetch()} loading={isFetching}>
          Générer un nombre aléatoire
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="text-slate-700"
          onClick={() => {
            reset();
            setUserInput("");
            setFormError("");
          }}
        >
          Réinitialiser
        </Button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm"
      >
        <div>
          <label className="text-sm font-semibold text-slate-700" htmlFor="manual-number">
            Saisir un nombre (1 à 1000)
          </label>
          <input
            id="manual-number"
            type="number"
            inputMode="numeric"
            min={1}
            max={1000}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-base text-slate-900 shadow-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
            placeholder="Ex : 37"
          />
          {formError && <p className="mt-1 text-sm text-rose-600">{formError}</p>}
        </div>

        <Button type="submit" variant="ghost" className="w-full border border-primary-200">
          Tester le nombre saisi
        </Button>
      </form>

      <dl className="grid gap-4 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Statut React Query
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-900">
            {isFetching ? "Requête en cours..." : "Repos"}
          </dd>
          {data?.number !== undefined && (
            <p className="text-sm text-slate-500">Dernier nombre reçu : {data.number}</p>
          )}
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Cache Zustand
          </dt>
          <dd className="mt-1 text-lg font-semibold text-slate-900">
            {mode === "idle" ? "En attente" : mode === "manual" ? "Mode manuel" : "Mode API"}
          </dd>
          <p className="text-sm text-slate-500">
            La primalité est recalculée uniquement si le nombre n&apos;est pas en cache.
          </p>
        </div>
      </dl>
    </section>
  );
}
