import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../PokemonList.css";

export function PokemonDetail({ name }) {
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const fetchPokemon = useCallback(
    async (signal) => {
      if (!name) return;
      setStatus("loading");
      setError(null);
      setPokemon(null);

      try {
        const { data } = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`,
          { signal }
        );
        if (!signal.aborted) {
          setPokemon(data);
          setStatus("success");
        }
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          return;
        }
        setError(err);
        setStatus("error");
      }
    },
    [name]
  );

  useEffect(() => {
    if (!name) return;
    const controller = new AbortController();
    fetchPokemon(controller.signal);
    return () => controller.abort();
  }, [fetchPokemon, name, reloadKey]);

  if (!name) {
    return null;
  }

  const handleReload = () => {
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="pokemon-detail">
      <div className="pokemon-detail__header">
        <div>
          <p className="pokemon-detail__eyebrow">Pokémon sélectionné</p>
          <h2 className="pokemon-detail__title">{name}</h2>
        </div>
        <button
          type="button"
          className="pokemon-detail__reload"
          onClick={handleReload}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Actualisation..." : "Actualiser"}
        </button>
      </div>

      {(status === "loading" || status === "idle") && (
        <p className="pokemon-list__status">Chargement de {name}...</p>
      )}
      {status === "error" && (
        <p className="pokemon-list__status pokemon-list__status--error">
          {error?.message ?? `Erreur lors du chargement de ${name}`}
        </p>
      )}
      {status === "success" && pokemon && (
        <div className="pokemon-detail__content">
          <div className="pokemon-detail__image">
            <img
              src={
                pokemon.sprites.other?.["official-artwork"]?.front_default ??
                pokemon.sprites.front_default ??
                ""
              }
              alt={name}
            />
          </div>
          <div className="pokemon-detail__meta">
            <div>
              <span className="pokemon-detail__label">ID</span>
              <strong>#{pokemon.id}</strong>
            </div>
            <div>
              <span className="pokemon-detail__label">Taille</span>
              <strong>{pokemon.height / 10} m</strong>
            </div>
            <div>
              <span className="pokemon-detail__label">Poids</span>
              <strong>{pokemon.weight / 10} kg</strong>
            </div>
            <div>
              <span className="pokemon-detail__label">Types</span>
              <strong>
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
