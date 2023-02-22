import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
