import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import "../assets/scss/main.scss";
import StuffedAnimalList from "./StuffedAnimalList";
import NewStuffedAnimalForm from "./NewStuffedAnimalForm";

const App = props => {
  return (
    <div className="grid-container">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={StuffedAnimalList} />
          <Route exact path="/stuffed-animals" component={StuffedAnimalList} />
          <Route exact path="/stuffed-animals/new" component={NewStuffedAnimalForm} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default hot(App);
