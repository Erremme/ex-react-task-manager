// UseParams
import { useParams } from "react-router-dom";

//Context
import { useContextAPI } from "../Context/ContextAPI";

//React-router-dom
import { NavLink } from "react-router-dom";

//Libreria per formattare la data
import dayjs from "dayjs";

//Component
import Modal from "../components/Modal";
import { useState } from "react";

export default function TaskDetail() {

    //Recupero i dati dal context
    const { tasks , removeTask } = useContextAPI();

   //Recupero l'id dalla url
   const {id}= useParams();

    //Cerco la task con l'id corrispondente

    const task = tasks.find((task) => Number(task.id) === Number(id));

    //Variabile per gestire la visibilità del modal
    const [showModal, setShowModal] = useState(false);

    return(
            <div className="taskdetail-container">
            <Modal
                title="Rimuovi Task"
                content="Sei sicuro di voler rimuovere questa task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => removeTask(id)}
                confirmText="Rimuovi"/>
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
            <button onClick={() => setShowModal(true)} className="remove-task-btn">Rimuovi Task</button>
        </div>
    )






}