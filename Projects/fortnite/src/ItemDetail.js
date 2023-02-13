import React, { useState, useEffect } from "react";

import "./App.css";

function Item({ match, history }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({
    images: {},
  });

  const API_KEY = "9cc6f8e5-b6a9774d-153512b7-e55e847c";
  const BASE_URL = `https://fortniteapi.io/v1/items/get?id=${match.params.id}&lang=en`;

  const fetchItem = async () => {
    const data = await fetch(BASE_URL, {
      headers: {
        Authorization: API_KEY,
      },
    });

    const item = await data.json();

    setItem(item.item);

    console.log(item.item)
  };

  return (
    <>
      <div
        className="item-detail"
        style={{
          background: `
          linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
          url(${item.images.full_background}) no-repeat center / cover
          `,
        }}
      >
        <div className="pane">
          <div className="cover">
            <img src={item.images.full_background} alt={item.name} />
          </div>

          <div className="info">
            <h1>{item.name}</h1>

            <h2>
              <strong>Description:</strong> {item.description}
            </h2>

            <h3>
              <strong>Rarity:</strong>
              <span>{item.internalRarity}</span>
            </h3>

            <button className="back-btn" onClick={() => history.goBack()}>
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
