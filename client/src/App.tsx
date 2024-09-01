import { Button } from "components/ui/button";
import "./App.css";

function App() {
  // sentry test
  // function methodDoesNotExist(): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <div className="App">
      <Button>Click me</Button>
      {/* <button onClick={() => methodDoesNotExist()}>Break the world</button>; */}
    </div>
  );
}

export default App;
