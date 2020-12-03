import React from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GlobalStyle } from "./global/GlobalStyle";
import { Homepage } from "./components/Homepage";
import { Menu } from "./components/hamburgerMenu/Menu";
import { MyRecipes, Login } from "./components/pages/index";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/home">
          <Homepage />
        </Route>
        <Route exact path="/myrecipes">
          <MyRecipes />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect exact from="/" to="/home" />
      </Switch>
      <Menu />
      <Footer />
    </Router>
  );
}

export default App;
