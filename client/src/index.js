import React from "react";
import ReactDOM from "react-dom";
import { MenuProvider } from "./components/Context/MenuContext";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/store";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MenuProvider>
      <App />
    </MenuProvider>
  </Provider>,
  document.getElementById("root")
);
