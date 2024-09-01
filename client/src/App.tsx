import { Button } from "components/ui/button";
import "./App.css";

// sentry 테스트를 위해 오류 발생 테스트

function App() {
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
