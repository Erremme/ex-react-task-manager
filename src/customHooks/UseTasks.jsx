//Hooks di react
import { useState, useEffect } from "react";

//Axios per le richieste http
import axios from "axios";


function UseTask(){

    //Variabile di stato per salvare i dati
    const [tasks , setTasks] = useState([])
     
    //url presa dal file .env
    const url = import.meta.env.VITE_API_URL

    //Recupero i dati dal server
    useEffect(()=> {
        axios.get(`${url}/tasks`)
        .then(res => setTasks(res.data))
        .catch(error => console.error(error))
    },[])

    //funzione per aggiungere una task
    function addTask({title, status , description}) {
        axios.post(`${url}/tasks`,{ title, status, description })
        .then((res) => {
           
            // Mi prendo i dati dalla risposta
            const {success, task, } = res.data;

            // Se la risposta è positiva, aggiorno lo stato
            if(success === true){
                setTasks((current) => [...current, task])
                alert(`Task aggiunta con successo: ${task.title}`);
            }else {
                alert(`Errore: ${error.response?.data?.message }`);
            }
        })
        .catch(error =>{
            const message = error.response?.data?.message || "Errore di rete o dati non validi";
            alert(`Errore: ${message}`);
            console.error(error)
        } )

    }
    
    //funzione per rimuovere una task
    function removeTask() {
        console.log("Rimuovo una Task")
    }
    
    //funzione per modificare una task
    function updateTask() {
        console.log("Modifico una Task")
    }
    
    return {tasks , addTask , removeTask , updateTask}
}

export default UseTask