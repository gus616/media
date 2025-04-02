import ReactDOM from "react-dom";


type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null; // Do not render if not open

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <button className="absolute top-2 right-2 text-gray-600" onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}>✖</button>
        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")! // Portal target
  );
};

export default Modal;
