// Ract-router-dom
import { NavLink } from "react-router-dom"
//HOOKS
import { useState } from "react"
import { useMemo } from "react"
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
        
        return tasks.sort((a,b) => {
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
    } , [tasks , sortBy , sortOrder])



    return(


        <div className="tasklist-container" >

            <header className="tasklist-header">
                <h1 className="tasklist-title">Task Manager</h1>
                <p className="tasklist-subtitle">Visualizza e gestisci le tue attività</p>
            </header>
           

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