//Ract-router-dom
import { NavLink } from "react-router-dom";

//React HOOKS
import { useState , useRef, useMemo } from "react";

//Context
import {useContextAPI} from "../Context/ContextAPI";

export default function AddTaskList(){
    //Variabile di stato per input controllato
    const [title , setTitle] = useState("");

    //Variabili per input non trollati
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const { addTask } = useContextAPI();
    
    //Simboli per verificare se il campo è corretto
    const symbols = `!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`;

    //Validazione del campo title
    const isTitleValid = useMemo(() => {
      const charValid = !title.split("").some(char => symbols.includes(char));
      return charValid && title.trim().length > 0 
    },[title]);

   async function handleSubmit (e) {
    e.preventDefault();
    
    if(!isTitleValid ){;
        return;
    }

    const newTask = {
        title : title.trim(),
        description : descriptionRef.current.value,
        status : statusRef.current.value
    }

    try {
     await addTask({newTask})
     alert("Task aggiunta con successo!")
     setTitle("")
     descriptionRef.current.value = ""
     statusRef.current.value = ""

    }catch(error){
     alert(error.message)
    }


    
    


   }
    
      
    return(
         <div className="addtask-container">
            
            <form className="addtask-form" onSubmit={handleSubmit}>
                <h2>Aggiungi una nuova Task</h2>
                <label>
                    Titolo:
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        required
                        placeholder="Inserisci il titolo"
                    />

                    {!isTitleValid &&
                        <p style={{color : !isTitleValid  && "red"}}>
                            {!isTitleValid && "Il campo non può essere vuoto e non può contenere caratteri speciali."}
                        </p>  
                    }

                    {isTitleValid &&
                        <p style={{color : isTitleValid && "green"}}>
                            {isTitleValid && "Titolo valido!" }
                        </p>  
                    }
                </label>
                <label>
                    Descrizione:
                    <textarea
                        ref={descriptionRef}
                        required
                        placeholder="Inserisci una descrizione"
                        rows={4}
                    />
                </label>
                <label>
                    Stato:
                    <select ref={statusRef} defaultValue="To do" >
                        <option value="" disabled   >Seleziona uno stato</option>
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </label>
                <button type="submit">Aggiungi Task</button>
            </form>
        </div>
    )
}
