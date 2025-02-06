import {useEffect} from "react";
import PropTypes from "prop-types";

const MiniCart = ({isOpen, onClose, children}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null

  return (
    <aside>
      <div>
        <p>Mini cart component</p>
        <button type="button" onClick={onClose}>&times;</button>
      </div>

      {children}
    </aside>
  )
}

MiniCart.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
}

export default MiniCart