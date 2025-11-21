import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "@tanstack/react-router";
import "../PokemonList.css";

const POKEMON_ENDPOINT = "https://pokeapi.co/api/v2/pokemon?limit=20";

export function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const fetchPokemons = useCallback(async (signal) => {
    setStatus("loading");
    setError(null);

    try {
      const { data } = await axios.get(POKEMON_ENDPOINT, { signal });
      if (!signal.aborted) {
        setPokemons(data.results ?? []);
        setStatus("success");
      }
    } catch (err) {
      if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
        return;
      }
      setError(err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchPokemons(controller.signal);
    return () => controller.abort();
  }, [fetchPokemons, reloadKey]);

  const handleReload = () => {
    setReloadKey((key) => key + 1);
  };

  let content = null;

  if (status === "loading" || status === "idle") {
    content = <p className="pokemon-list__status">Chargement...</p>;
  } else if (status === "error") {
    content = (
      <p className="pokemon-list__status pokemon-list__status--error">
        {error?.message ?? "Erreur..."}
      </p>
    );
  } else {
    content = (
      <ul className="pokemon-list__items">
        {pokemons.map((pokemon) => (
          <li className="pokemon-list__item" key={pokemon.name}>
            <Link
              to="/pokemone/$name"
              params={{ name: pokemon.name }}
              className="pokemon-list__link"
            >
              {pokemon.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  const isFetching = status === "loading";

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
