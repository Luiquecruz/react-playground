import { useState } from 'react'
import Modal from "./components/Modal.jsx";

function App() {
const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
    document.body.classList.add('overflow-hidden')
  }

  const closeModal = () => {
    setOpen(false);
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <main>
      <section className="wrapper">
        <h1 className="text-4xl font-bold text-center">Build Your <span className="text-gradient">PC</span></h1>
        <button type="button" className="btn btn-gradient" onClick={() => openModal()}>Start</button>
      </section>

      <Modal name="sample" title={"Category name"} isOpen={open} onClose={() => closeModal()}></Modal>
    </main>
  )
}

export default App
