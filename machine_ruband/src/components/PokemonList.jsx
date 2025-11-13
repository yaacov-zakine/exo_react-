import { useQuery } from "@tanstack/react-query";
import "./PokemonList.css";

const fetchPokemons = async ({ signal }) => {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=20",
    { signal }
  );

  if (!response.ok) {
    throw new Error("Impossible de récupérer les Pokémon");
  }

  return response.json();
};

export function PokemonList() {
  const {
    data,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["pokemon", 20],
    queryFn: fetchPokemons,
  });

  const handleReload = () => {
    void refetch();
  };

  let content = null;

  if (isPending) {
    content = (
      <p className="pokemon-list__status">Chargement...</p>
    );
  } else if (isError) {
    content = (
      <p className="pokemon-list__status pokemon-list__status--error">
        Erreur...
      </p>
    );
  } else {
    content = (
      <ul className="pokemon-list__items">
        {data.results.map((pokemon) => (
          <li className="pokemon-list__item" key={pokemon.name}>
            {pokemon.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="pokemon-list">
      <div className="pokemon-list__actions">
        <button
          type="button"
          className="pokemon-list__reload"
          onClick={handleReload}
          disabled={isFetching}
        >
          {isFetching ? "Rechargement..." : "Recharger"}
        </button>
      </div>
      <div className="pokemon-list__content">{content}</div>
    </div>
  );
}

export default PokemonList;
