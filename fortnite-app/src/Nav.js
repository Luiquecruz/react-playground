import React from "react";
import { Link } from "react-router-dom";

import "./App.css";

function Nav() {
  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/">Fortnite app</Link>
        </div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/items">Items</Link>
          </li>
          <li>
            <Link to="/upcoming">Upcoming items</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
