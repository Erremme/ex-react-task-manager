//Hooks di react
import { useState, useEffect } from "react";

//UseNavigate per la navigazione
import { useNavigate } from "react-router-dom";

//Axios per le richieste http
import axios from "axios";



function useTask(){

    //Variabile di stato per salvare i dati
    const [tasks , setTasks] = useState([])

    //useNavigate per la navigazione
    const navigate = useNavigate();
     
    //url presa dal file .env
    const url = import.meta.env.VITE_API_URL

    //Funzione per recuperare le task dal server
    

    //Recupero i dati dal server
    useEffect(()=> {
         fetch(`${url}/tasks`)
         .then(res => res.json())
        .then(data => setTasks(data))
        .catch(error => console.error(error))
    },[])

    //funzione per aggiungere una task
    async function  addTask ({newTask}) {
        const response = await  fetch(`${url}/tasks`, {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(newTask)
        })
          
        const {success , message , task} = await response.json();
           
            if(!success) throw new Error(message)

                setTasks((prev) => [...prev , task])

            
        }

    
    
    //funzione per rimuovere una task
    async function removeTask(taskId) {
        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: "DELETE"
        })
         
        const {success , message } = await response.json();
        
        if(!success) throw new Error(message)
       
        setTasks((prev) => prev.filter( t => t.id !== taskId))
           
    }

    async function removeMultipleTasks(taskIds) {
        const deleteRequests = taskIds.map((taskId) => {
            return(fetch(`${url}/tasks/${taskId}`, {method: "DELETE" })
            .then(res => res.json()) 
)
            
        })

        const results = await Promise.allSettled(deleteRequests)

        const fullfilledDelitions = []
        const rejectedDelitions =[]

        results.forEach((result , index) => {
            const taskId = taskIds[index]
            if(result.status === "fulfilled" && result?.value.success){
                fullfilledDelitions.push(taskId)
            }else{
                rejectedDelitions.push(taskId)
            }
        })

        if(fullfilledDelitions.length > 0 ){
            setTasks((prev) => 
                prev.filter(t => !fullfilledDelitions.includes(t.id)))
        }

        if(rejectedDelitions.length > 0){
            throw new Error(`Errore nell' eliminazione delle task : ${rejectedDelitions.join(",")}`)
        }
    }
    
    //funzione per modificare una task
    async function updateTask(updatedTask) {
        const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(updatedTask)
        })
        
        const {success , message , task} = await response.json()

        if(!success) throw new Error(message)
        
        setTasks((prev) => prev.map((t) => t.id === task.id ? task : t ))

    }


   
    
    return {tasks , addTask , removeTask , updateTask , removeMultipleTasks}
}

export default useTask