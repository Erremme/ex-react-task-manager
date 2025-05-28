// Ract-router-dom
import { NavLink } from "react-router-dom"

//HOOKS
import { useCallback, useState } from "react"
import { useMemo } from "react"
import { useRef } from "react"

//Context
import { useContextAPI } from "../Context/ContextAPI"

//Components
import TaskRow from "../components/TaskRow"

const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };

 

export default function TaskList(){
    //Importo il value del context
    const {tasks} = useContextAPI()

    //Stati per l'ordinamento delle task
    const [sortBy ,setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    //Stati per la ricerca
    const searchQueryRef = useRef()
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const debounceTimer = useRef(null);

    //Funzione debounce
    const handleSearchChange = useCallback((e) => {
    const value = searchQueryRef.current.value;
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
        setDebouncedQuery(value);
    }, 500);
}, []);
    
    //Funzione di ordinamento
    const handleOrder = (column) => {
      if(sortBy === column){
        setSortOrder((prev) => prev * -1)
      }else{
        setSortBy(column)
        setSortOrder(1)
      }
    }


    

   



    const sortedTask = useMemo(() =>{
        let filtered ;
        if(debouncedQuery !== ""){
           filtered = tasks.filter((task) => 
            task.title.toLowerCase().includes(debouncedQuery.toLowerCase())
            )
        }else{
            filtered = tasks
        }
        
        
        return filtered.sort((a,b) => {
         let result = 0;
         if(sortBy === "title"){
            result = a.title.localeCompare(b.title)
         }else if(sortBy === "status") {
           result = statusOrder[a.status] - statusOrder[b.status]
         }else if(sortBy === "createdAt"){
             result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
         }

         return result * sortOrder
        })
    } , [debouncedQuery,tasks , sortBy , sortOrder])



    return(


        <div className="tasklist-container" >

            <header className="tasklist-header">
                <h1 className="tasklist-title">Task Manager</h1>
                <p className="tasklist-subtitle">Visualizza e gestisci le tue attività</p>
            </header>

               <div>
                <input type="text"
                placeholder="Cerca.."
                ref={searchQueryRef}
                onChange={handleSearchChange}
                />
               </div>

              <NavLink className="add-task-link" to="AddTask">Aggiungi una task</NavLink>

              <div className="table-wrapper" >
                <table className="task-table">
                    <thead>
                        <tr>
                            <th onClick={() =>handleOrder("title")} >Nome</th>
                            <th onClick={() =>handleOrder("status")}>Stato</th>
                            <th onClick={() => handleOrder("createdAt")}>Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTask?.map((task) => (
                            <TaskRow 
                            key={task.id}
                            id={task.id}
                            title= {task.title}
                            status = {task.status}
                            createdAt= {task.createdAt}
                            
                            />
                        ))}
                    </tbody>
                </table>
              </div>
           
        </div>
         
    )
}