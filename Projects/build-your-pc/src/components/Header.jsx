import {useState} from "react";

import MiniCart from '../components/MiniCart';

const Header = () => {
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen(true);
  }

  const closeCart = () => {
    setOpen(false);
  }

  return (
    <header className="bg-dark fixed top-0 w-full">
      <nav className="relative flex items-center justify-center max-w-lg w-full py-4 mx-auto">
        <h1 className="text-4xl font-bold text-center">Build Your <span className="text-gradient">PC</span></h1>
        <button type="button" className="absolute right-0 btn" onClick={() => openCart()}>
          <span className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-shopping-cart">
              <circle cx="8" cy="21" r="1"/>
              <circle cx="19" cy="21" r="1"/>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
            </svg>

            <small className="absolute right-3 top-3 bg-primary rounded-full size-4 text-center text-xs">1</small>
          </span>
        </button>
      </nav>

      <MiniCart isOpen={open} onClose={() => closeCart()}>
        <p>child content</p>
      </MiniCart>
    </header>
  )
}

export default Header;