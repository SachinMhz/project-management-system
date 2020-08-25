import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import reducer from "./reducers";
import "./styles/reset.css";
import "./styles/layout.css";
import "./styles/style.css";
import "./components/common/commonStyle.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

const store = createStore(reducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
