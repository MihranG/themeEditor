import React from "react";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import store from "./store/store";
import SimpleEditor from "./SimpleEditor";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Container>
          <SimpleEditor />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
