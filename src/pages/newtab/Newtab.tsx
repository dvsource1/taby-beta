import logo from "@assets/img/logo.svg";
import "@pages/newtab/Newtab.css";

const Newtab = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-3xl font-bold underline mx-5">Hello world!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/newtab/Newtab.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React!
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default Newtab;
