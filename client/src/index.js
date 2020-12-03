import React from "react";
import ReactDOM from "react-dom";
import { MenuProvider } from "./components/Context/MenuContext";

import App from "./App";

ReactDOM.render(
  <MenuProvider>
    <App />
  </MenuProvider>,
  document.getElementById("root")
);
