//Hooks di react
import { useState, useEffect } from "react";

//UseNavigate per la navigazione
import { useNavigate } from "react-router-dom";

//Axios per le richieste http
import axios from "axios";



function UseTask(){

    //Variabile di stato per salvare i dati
    const [tasks , setTasks] = useState([])

    //useNavigate per la navigazione
    const navigate = useNavigate();
     
    //url presa dal file .env
    const url = import.meta.env.VITE_API_URL

    //Funzione per recuperare le task dal server
    function fetchTasks() {
        axios.get(`${url}/tasks`)
        .then(res => setTasks(res.data))
        .catch(error => console.error(error))
    }

    //Recupero i dati dal server
    useEffect(()=> {
        fetchTasks();
    },[])

    //funzione per aggiungere una task
    function addTask({title, status , description}) {
        axios.post(`${url}/tasks`,{ title, status, description })
        .then((res) => {
           
            // Mi prendo i dati dalla risposta
            const {success} = res.data;

            // Se la risposta è positiva, aggiorno lo stato
            if(success === true){
                fetchTasks(); // Ricarico le task
                alert(`Task aggiunta con successo`);
            }else {
                alert(`Errore: ${res.data.message }`);
            }
        })
        .catch(error =>{
            const message = error.response?.data?.message || "Errore di rete o dati non validi";
            alert(`Errore: ${message}`);
            console.error(error)
        } )

    }
    
    //funzione per rimuovere una task
    function removeTask(id) {
        
        axios.delete(`${url}/tasks/${id}`)
        .then((res) => {
            const {success, message} = res.data;
            if(success === true){
                alert(`Task rimossa con successo`); 
                fetchTasks();
                navigate("/");
                
            }else {
                alert(`Errore: ${message}`);
            }
        })
        .catch(error => {
            const message = error.response?.data?.message || "Errore di rete o dati non validi";
            alert(`Errore: ${message}`);
            console.error(error)
        })
    }
    
    //funzione per modificare una task
    function updateTask() {
        console.log("Modifico una Task")
    }
    
    return {tasks , addTask , removeTask , updateTask}
}

export default UseTask