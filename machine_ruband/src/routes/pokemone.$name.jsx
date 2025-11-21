import { createFileRoute } from "@tanstack/react-router";
import { PokemonList } from "../components/PokemonList";
import { PokemonDetail } from "../components/PokemonDetail";

export const Route = createFileRoute("/pokemone/$name")({
  component: RouteComponent,
});

function RouteComponent() {
  const { name } = Route.useParams();

  return (
    <div className="pokemon-page">
      <section className="pokemon-panel">
        <header className="pokemon-panel__header">
          <p className="pokemon-panel__eyebrow">Pokémon ciblé</p>
          <h1 className="pokemon-panel__title">Pokémon : {name}</h1>
          <p className="pokemon-panel__subtitle">
            Aperçu des 20 premiers résultats fournis par la PokéAPI
          </p>
        </header>
        <PokemonDetail name={name} />
        <PokemonList />
      </section>
    </div>
  );
}
