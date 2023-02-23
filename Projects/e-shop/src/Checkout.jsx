import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

import './Checkout.css';

export default function Checkout() {
  const [{ basket }] = useStateValue();

  return (
    <div className="checkout">
      <img src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg" alt="banner" className="checkout__ad" />

      <div className="checkout-wrapper">
        <div className="checkout__left">
          <div>
            <h2 className="checkout__title">
              Your Shopping Basket
            </h2>
            {basket.map(item => (
              <CheckoutProduct
                key={item + Math.random()}
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>

        <div className="checkout__right">
          <Subtotal />
        </div>
      </div>
    </div>
  )
}