import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";

import Nav from "./Nav";
import Home from "./Home";
import Items from "./Items";
import Upcoming from "./Upcoming";
import ItemDetail from "./ItemDetail";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <>
          <div className="App">
            <Nav />

            <Route path="/" exact component={Home} />
            <Route path="/items" component={Items} />
            <Route path="/upcoming" exact component={Upcoming} />
            <Route path="/upcoming/:id" component={ItemDetail} />
          </div>
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
