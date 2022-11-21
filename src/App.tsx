import { greet } from "./utils/greet";

function App(): JSX.Element {
  return <h1>{greet("Neil is my Hero")}</h1>;
}

export default App;
