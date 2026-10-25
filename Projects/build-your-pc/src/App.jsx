import { useState } from 'react'
import {useCart} from "./Hooks/useCart";

import Modal from "./components/Modal";
import Header from "./components/Header";

import {categoryList} from "./data/categoriesData";

function App() {
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState({});
  const [categoryItems, setCategoryItems] = useState([]);

  const {addItem, updateItemQuantity} = useCart()

  const openModal = () => {
    setOpen(true);
    document.body.classList.add('overflow-hidden')
  }

  const closeModal = () => {
    setOpen(false);
    document.body.classList.remove('overflow-hidden')
  }

  const openCategory = (category) => {
    setCurrentCategory(category || {})
    setCategoryItems(category.items || []);
    openModal();
  }

  return (
    <main className="pt-20">
      <Header />

      <section className="wrapper">
        <nav className="categories flex gap-4 flex-col">
          {categoryList.map(category => (
            <div className="max-w-lg w-full mx-auto bg-foreground hover:bg-foreground/70 p-4 text-center rounded-2xl cursor-pointer"
                 key={category.id} onClick={() => openCategory(category)}>
              <h2 className="text-xl font-bold text-center">{category.name}</h2>
            </div>
          ))}
        </nav>
      </section>

      <Modal name="sample" title={currentCategory.name} isOpen={open} onClose={() => closeModal()}>
        <ul className="flex max-lg:gap-x-3 flex-wrap items-start justify-start">
          {categoryItems && categoryItems.map(item => (
            <li key={item.sku} className="lg:flex lg:gap-6 lg:items-center max-lg:max-w-40 w-full p-4 bg-foreground hover:bg-dark rounded-2xl">
              <div className="relative">
                <div className="lg:hidden badges flex flex-col gap-1 absolute left-2 top-2">
                  {item?.stock_status === 'out_of_stock' && (
                    <span className="text-xs rounded-full bg-red-600 px-2">Out of Stock</span>
                  )}
                </div>

                <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover rounded-2xl lg:size-18"
                     width="200" height="200" loading="lazy" />
              </div>

              <div>
                <small className="text-[10px] opacity-25">{item.sku}</small>

                <p className="text-sm mb-2">{item.name}</p>

                <div className="flex gap-4 items-center">
                  <div className="text-sm">⭐ {item.ratings}</div>

                  {item?.stock_status === 'out_of_stock' && (
                    <span className="max-lg:hidden text-xs rounded-full bg-red-600 px-2">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex lg:flex-col lg:gap-0 gap-2 lg:items-end items-center my-2 lg:ml-auto">
                {/* @TODO: add intl for currency  */}
                <small className="text-xs line-through">{item.price_info.special_price}</small>
                <span className="font-bold">{'$ ' + item.price_info.price}</span>
              </div>

              <button type="button" className={`
                btn ${item?.stock_status === 'out_of_stock' ? 'bg-zinc-700' : 'btn-gradient'}
                max-lg:mt-2 flex items-center justify-center p-0 size-10
              `} disabled={item?.stock_status === 'out_of_stock'} onClick={() => addItem(item)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="size-6">
                  <path d="M5 12h14"/>
                  <path d="M12 5v14"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </Modal>
    </main>
  )
}

export default App
