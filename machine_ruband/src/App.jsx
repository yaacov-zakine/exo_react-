// import "./App.css";
// import MachineTuring from "./components/MachineTuring.jsx";

// //return (
   // <main className="app">
     // <MachineTuring />
    //</main>
  //);
//}

//export default App;

// App.jsx


import "./App.css";
import MachineTuring from "./components/MachineTuring.jsx";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

// Création du client React Query
const queryClient = new QueryClient();

// Exemple d'utilisation de React Query
function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isPending) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}

// Composant App unique
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app">
        <MachineTuring />
        <Example />  {/* si tu veux afficher les données GitHub */}
      </main>
    </QueryClientProvider>
  );
}

export default App;

