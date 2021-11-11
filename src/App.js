import React from "react";
import "./App.scss";
import Cursor1 from "./components/cursor/Cursor1";

function App() {
  return (
    <div className="App disable-scrollbars">
      <Cursor1 />
      <section>
        <h2>Page 1</h2>
      </section>
      <section>
        <h2>Page 2</h2>
      </section>
      <section>
        <h2>Page 3</h2>
      </section>
      <section>
        <h2>Page 4</h2>
      </section>
      <section>
        <h2>Page 5</h2>
      </section>
      <section>
        <h2>Page 6</h2>
      </section>
      <section>
        <h2>Page 7</h2>
      </section>
    </div>
  );
}

export default App;
