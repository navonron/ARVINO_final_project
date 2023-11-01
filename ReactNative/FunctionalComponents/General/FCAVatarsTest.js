import React from "react";
import ReactDOM from "react-dom";
import { useStateIfMounted } from "use-state-if-mounted";
// import "./styles.css";

const simulateSlowNetworkRequest = () =>
  new Promise(resolve => setTimeout(resolve, 5000));

function Example() {
  const [text, setText] = React.useState("waiting...");

  React.useEffect(() => {
    simulateSlowNetworkRequest().then(() => {
      setText("done!");
    });
  }, []);

  return <h2>{text}</h2>;
}

function OtherExample() {
  const [text, setText] = useStateIfMounted("waiting...");

  React.useEffect(() => {
    simulateSlowNetworkRequest().then(() => {
      setText("done!");
    });
  }, [setText]);

  return <h2>{text}</h2>;
}

function App() {
  const [mounted, setMounted] = React.useState(true);
  const [otherMounted, otherSetMounted] = React.useState(true);

  const unmount = () => {
    setMounted(false);
  };

  const otherUnmount = () => otherSetMounted(false);

  return (
    <div className="App">
      <button onClick={unmount}>Unmount the component that causes leaks</button>
      {mounted && <Example />}
      <br />
      <button onClick={otherUnmount}>
        Unmount the component that doesn't cause leaks
      </button>
      {otherMounted && <OtherExample />}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);