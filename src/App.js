import React, { Fragment } from "react";
import "../src/assets/css/style.css";
import "../src/assets/vendor/bootstrap/css/bootstrap.min.css";
import "../src/assets/vendor/bootstrap/css/bootstrap.css";
import "../src/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "../src/assets/css/custom.css"
import Router from "./router";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducer from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(reducer, compose(applyMiddleware(thunk)));
function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Router />
      </Provider>
    </Fragment>
  );
}

export default App;
