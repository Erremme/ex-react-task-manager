
import ReactDOM from 'react-dom';
 //Componente Modal con React.createPorta , document.body per non renderlo dipendende dal componente padre
export default function Modal({title ,content,show , onClose, onConfirm ,confirmText = "Conferma"}){
   return ReactDOM.createPortal (
      <div className={`modal ${show ? 'show' : ''}`}>
         <div className="modal-content">
            <h2>{title}</h2>
            <div>{content}</div>
            <div className="modal-actions">
               <button onClick={onClose}>Annulla</button>
               <button onClick={onConfirm}>{confirmText}</button>
            </div>
         </div>
      </div>,
      document.body
   );
} 