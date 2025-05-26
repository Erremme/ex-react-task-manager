//Hooks di react
import { useState, useEffect } from "react";

function UseTask(){

    //Variabile di stato per salvare i dati
    const [tasks , setTasks] = useState([])
     
    //url presa dal file .env
    const url = import.meta.env.VITE_API_URL

    //Recupero i dati dal server
    useEffect(()=> {
        fetch(`${url}/tasks`)
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(error => console.error(error))
    },[])

    //funzione per aggiungere una task
    function addTask() {
        console.log("Aggiungo una Task")
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