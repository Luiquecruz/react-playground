import "./Product.css";

export default function Product({ id, title, image, price, rating }) {
  return (
    <div className="product">
      <img src={image} alt="product" />

      <div className="product__info">
        <p>{title}</p>

        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>

        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <button>Add to Basket</button>
    </div>
  )
}