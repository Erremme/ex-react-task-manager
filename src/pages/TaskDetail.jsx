// UseParams
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Context
import { useContextAPI } from "../Context/ContextAPI";

//React-router-dom
import { NavLink } from "react-router-dom";
//Hooks
import { useState } from "react";

//Libreria per formattare la data
import dayjs from "dayjs";

//Component
import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";


export default function TaskDetail() {

    //Recupero i dati dal context
    const { tasks , removeTask, updateTask } = useContextAPI();

   //Recupero l'id dalla url
   const {id}= useParams();

   const navigate = useNavigate()

    //Cerco la task con l'id corrispondente

    const task = tasks.find((task) => Number(task.id) === Number(id));

    //Variabile per gestire la visibilità del modal
    const [showModal, setShowModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const handleDelete = async () => {
     try{
        await  removeTask(task.id)
        alert("Task eliminata con successo")
        navigate("/")
     }catch(error){
      alert(error.message)
     }
    }

    const handleUpdate = async  (updatedTask) =>  {
        try {
            await updateTask(updatedTask)
        alert("Task Modificata con successo")
        setShowEditModal(false)

        }catch(error){
            alert(error.message)
        }

    }

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
            <div className="btn-container">
            <button onClick={() => setShowEditModal(true)} className="edit-task-btn">Modifica Task</button>
            <button onClick={() => setShowModal(true)} className="remove-task-btn">Rimuovi Task</button>
              <Modal
                title="Rimuovi Task"
                content="Sei sicuro di voler rimuovere questa task?"
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={ handleDelete}
                confirmText="Rimuovi"/>

                <EditTaskModal 
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                task={task}
                onSave={handleUpdate}
            />
            
            </div>
        </div>
    )






}