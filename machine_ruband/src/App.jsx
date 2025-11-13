import "./App.css";
import MachineTuring from "./components/MachineTuring.jsx";
import { PokemonList } from "./components/PokemonList.jsx";

function App() {
  return (
    <main className="app">
      <div className="app__grid">
        <MachineTuring />

        <section className="pokemon-panel">
          <header className="pokemon-panel__header">
            <p className="pokemon-panel__eyebrow">Integration API</p>
            <h2 className="pokemon-panel__title">Liste des Pokémon</h2>
            <p className="pokemon-panel__subtitle">
              Données fournies par la PokéAPI (20 premiers résultats)
            </p>
          </header>

          <PokemonList />
        </section>
      </div>
    </main>
  );
}

export default App;
