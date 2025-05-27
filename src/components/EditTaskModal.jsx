//HOOKS
import { useState , useRef  } from 'react';

//Components
import Modal from '../components/Modal';

export default function EditTaskModal({show ,onClose, task, onSave }) {
    //Stati per i campi del form
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);

    //Riferimento al form per il submit
    const formRef = useRef(null);
    
    //Funzione per gestire il submit del form
    const handleSubmit = (e) => {   
        e.preventDefault();
        onSave({
        ...task,
        title,
        description,
        status
    });
        onClose();
    }
    
//Componente form da passare al modal
    const form =(

                  <form ref={formRef} onSubmit={handleSubmit} className='edit-task-form' >
                            <div>
                                <label>Titolo:</label>
                                <input 
                                    type="text" 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)} 
                                    required />
                            </div>
                            <div>
                                <label>Descrizione:</label>
                                <textarea 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    required />
                            </div>
                            <div>
                                <label>Stato:</label>
                                <select 
                                    value={status} 
                                    onChange={(e) => setStatus(e.target.value)} 
                                    required>
                                    <option value="" disabled>Seleziona uno stato</option>
                                    <option value="To do">To do</option>
                                    <option value="Doing">Doing</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                           <button type="submit" style={{ display: "none" }}>Salva</button>
                            
                        </form>
  )

    ;
    return(
        <Modal 
         title="Modifica Task"
          confirmText='Salva'
          content = {form} 
          onConfirm={() => formRef.current.requestSubmit() }
          show={show}
          onClose={onClose}
        />
    )
    }
