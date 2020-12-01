import React, { useState } from "react";
// import styled from "styled-components";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./global/GlobalStyle";
import { Homepage } from "./components/Homepage";

function App() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Router>
      <GlobalStyle />
      <Header open={openMenu} setOpen={setOpenMenu} />
      <Switch>
        <Route exact path="/">
          <Homepage open={openMenu} />
        </Route>
        <Route exact path="/myrecipes">
          My Recipes
        </Route>
        <Route exact path="/login">
          Log In
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
