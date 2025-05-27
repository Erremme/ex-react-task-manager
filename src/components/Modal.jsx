
import ReactDOM from 'react-dom';

export default function Moda({title ,content,show , onClose, onConfirm ,confirmText = "Conferma"}){
   return ReactDOM.createPortal (
      <div className={`modal ${show ? 'show' : ''}`}>
         <div className="modal-content">
            <h2>{title}</h2>
            <p>{content}</p>
            <div className="modal-actions">
               <button onClick={onClose}>Annulla</button>
               <button onClick={onConfirm}>{confirmText}</button>
            </div>
         </div>
      </div>,
      document.body
   );
} 