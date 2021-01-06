import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
// Project based on pekstaar@gmail.com

import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { rootReducer } from "./reducers";

//redux store setup
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
