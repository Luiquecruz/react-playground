import React, { useState, useEffect } from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Upcoming() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const API_KEY = "9cc6f8e5-b6a9774d-153512b7-e55e847c";
  const BASE_URL = "https://fortniteapi.io/v1/items/upcoming?lang=en/";

  const fetchItems = async () => {
    const data = await fetch(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const items = await data.json();

    setItems(items.items);
  };

  return (
    <>
      <h1>Upcoming items</h1>

      <ul className="upcomingItems">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/upcoming/${item.id}`}>
              <img src={item.images.background} alt={item.name} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Upcoming;
