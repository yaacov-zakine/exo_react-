import { useCounter } from "./stores/useCounter";

function App() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <>
      <p>Counter: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </>
  );
}

export default App;
