import {useEffect, useRef} from "react";
import {useClickAway} from "react-use";
import {useCart} from "../Hooks/useCart";
import PropTypes from "prop-types";

const MiniCart = ({isOpen, onClose, children}) => {
  const ref = useRef(null);
  const {totalItems, totalPrice} = useCart()

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useClickAway(ref, onClose)

  if (!isOpen) return null

  return (
    <>
      <div className="cart-overlay">
        <aside ref={ref} className="cart">
          <header className="cart-header">
            <h3 className="text-2xl">My cart ({totalItems})</h3>
            <button className="cart-close" type="button" onClick={onClose}>&times;</button>
          </header>

          <div className="cart-content">
            {children}
          </div>

          <footer className="cart-footer">
            <button className="inline-flex gap-2 items-center justify-center btn btn-gradient w-full">
              {Number(totalPrice) || 'checkout'}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="size-5">
                <path d="m9 10 2 2 4-4"/>
                <rect width="20" height="14" x="2" y="3" rx="2"/>
                <path d="M12 17v4"/>
                <path d="M8 21h8"/>
              </svg>
            </button>
          </footer>
        </aside>
      </div>
    </>
  )
}

MiniCart.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
}

export default MiniCart