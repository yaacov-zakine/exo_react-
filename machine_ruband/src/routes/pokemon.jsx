import { createFileRoute } from "@tanstack/react-router";
import { PokemonList } from "../components/PokemonList";

export const Route = createFileRoute("/pokemon")({
  component: PokemonPage,
});

function PokemonPage() {
  return (
    <div className="pokemon-page">
      <section className="pokemon-panel">
        <header className="pokemon-panel__header">
          <p className="pokemon-panel__eyebrow">Exploration PokéAPI</p>
          <h1 className="pokemon-panel__title">Liste des Pokémon</h1>
          <p className="pokemon-panel__subtitle">
            Retrouvez les 20 premiers Pokémon disponibles sur la PokéAPI.
            Cliquez sur un nom pour voir son illustration.
          </p>
        </header>
        <PokemonList />
      </section>
    </div>
  );
}
