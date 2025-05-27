// UseParams
import { useParams } from "react-router-dom";

//Context
import { useContextAPI } from "../Context/ContextAPI";

//React-router-dom
import { NavLink } from "react-router-dom";

//Libreria per formattare la data
import dayjs from "dayjs";


export default function TaskDetail() {

    //Recupero i dati dal context
    const { tasks , removeTask } = useContextAPI();

   //Recupero l'id dalla url
   const {id}= useParams();

    //Cerco la task con l'id corrispondente

    const task = tasks.find((task) => Number(task.id) === Number(id));

    console.log(task)

    return(
            <div className="taskdetail-container">
            <NavLink className="back-link" to="/">← Torna alla lista</NavLink>
            <div className="taskdetail-card">
                <h2 className="taskdetail-title">{task.title}</h2>
                <div className="taskdetail-info">
                    <span className={`taskdetail-status status-${task?.status.replace(" ", "").toLowerCase()}`}>
                        {task.status}
                    </span>
                    <span className="taskdetail-date">
                        Creata il: {dayjs(task?.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                    </span>
                </div>
                <div className="taskdetail-desc">
                    <b>Descrizione:</b>
                    <p>{task?.description}</p>
                </div>

            </div>
            <button onClick={() => removeTask(id)} className="remove-task-btn">Rimuovi Task</button>
        </div>
    )






}