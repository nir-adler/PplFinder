import React from "react";
import { HashRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import { Provider as FavoritesProvider } from './context/FavoritesContext'
import NavBar from "components/NavBar";
import { createBrowserHistory } from "history";

const AppRouter = () => {
  
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>
        </Router>
      </ThemeProvider>
    </FavoritesProvider>
  );
};

export default AppRouter;
