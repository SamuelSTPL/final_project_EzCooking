import React from "react";
import ReactDOM from "react-dom";
import { MenuProvider } from "./components/Context/MenuContext";
import { FiltersProvider } from "./components/Context/FiltersContext";
import { Provider } from "react-redux";
import { configureStore } from "./reducers/store";

import App from "./App";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <MenuProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </MenuProvider>
  </Provider>,
  document.getElementById("root")
);
