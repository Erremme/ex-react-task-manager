import { NavLink } from "react-router-dom"
import { useContextAPI } from "../Context/ContextAPI"
import TaskRow from "../components/TaskRow"




export default function TaskList(){
    const [tasks] = useContextAPI()

    
    return(
        <div className="tasklist-container" >

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