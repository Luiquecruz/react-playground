import PropTypes from "prop-types";

const Modal = ({name, title, modalClass, isOpen, onClose, children, withFooter, footerAction, footerActionName}) => {
  if (!isOpen) return null

  return (
    <>
      <div className="modal-overlay">
        <div className={`modal modal_${name} ${modalClass ?? ''}`}>
          <div className="modal-header">
            <h2>{title}</h2>
            <button className="modal-close"
                    type="button" onClick={onClose}>&times;</button>
          </div>

          <div className="modal-content">
            {children}
          </div>

          {withFooter && (
            <div className="modal-footer">
              <button onClick={onClose}>Close</button>
              <button onClick={footerAction}>{footerActionName}</button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  modalClass: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  withFooter: PropTypes.bool,
  footerAction: PropTypes.func,
  footerActionName: PropTypes.string,
}

export default Modal