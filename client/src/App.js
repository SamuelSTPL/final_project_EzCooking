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
import {
  MyRecipes,
  Login,
  SignUp,
  ForgotPassword,
} from "./components/pages/index";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/home" component={Homepage} />
        <Route exact path="/myrecipes" component={MyRecipes} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Redirect exact from="/" to="/home" />
      </Switch>
      <Menu />
      <Footer />
    </Router>
  );
}

export default App;
