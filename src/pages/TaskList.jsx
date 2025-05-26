// Ract-router-dom
import { NavLink } from "react-router-dom"
//Context
import { useContextAPI } from "../Context/ContextAPI"
//Components
import TaskRow from "../components/TaskRow"




export default function TaskList(){
    //Importo il value del context
    const {tasks} = useContextAPI()

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
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks?.map((task, index) => (
                            <TaskRow 
                            key={index}
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