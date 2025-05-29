//Hooks di react
import { useEffect, useReducer } from "react";


//UseNavigate per la navigazione
import { useNavigate } from "react-router-dom";

//Reducer
import tasksReducer from "../reducers/tastsReducer";



function useTask(){

    //Mi prendo i dati che mi arrivano dal reducer per utilizzarli
    const [tasks , dispatchTasks] = useReducer(tasksReducer,[])

    //url presa dal file .env
    const url = import.meta.env.VITE_API_URL

    //Recupero i dati dal server
    useEffect(()=> {
         fetch(`${url}/tasks`)
         .then(res => res.json())
        .then(data => dispatchTasks({type: 'LOAD_TASKS', payload : data}))
        .catch(error => console.error(error))
    },[])


    //funzione per aggiungere una task
    async function  addTask ({newTask}) {

        //Controllo per assicurarmi che la tsk non sia già esistente dentro l array
        const taskExist = tasks.some(t => t.title === newTask.title)
        if(taskExist){
            throw new Error("Esiste già  una task con questo nome")
        }

        //Chiamata all Api con il feth()
        const response = await  fetch(`${url}/tasks`, {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify(newTask)
        })

         // Mi prendo i valori che mi servono dalla response 
        const {success , message , task} = await response.json();
         if(!success) throw new Error(message)

            //Dispatch del reducer
            dispatchTasks({type : 'ADD_TASK', payload: task})

               

            
        }

    
    //funzione per rimuovere una task
    async function removeTask(taskId) {

        //Chiamata all Api con il feth()
        const response = await fetch(`${url}/tasks/${taskId}`, {
            method: "DELETE"
        })
         
         // Mi prendo i valori che mi servono dalla response 
        const {success , message } = await response.json();
        
        if(!success) throw new Error(message)

            //Dispatch del reducer
            dispatchTasks({type : 'REMOVE_TASK', payload: taskId})
        
       
        
           
    }

    async function removeMultipleTasks(taskIds) {

        //Chiamata Api con il map() per fare piu chiamate
        const deleteRequests = taskIds.map((taskId) => {
            return(fetch(`${url}/tasks/${taskId}`, {method: "DELETE" })
            .then(res => res.json()) 
)
            
        })

        
        const results = await Promise.allSettled(deleteRequests)
        
        //Array vuoti da riempire con le results
        const fullfilledDelitions = []
        const rejectedDelitions =[]
 
        //Ciclo per andare a pushare gli id in base alla response
        results.forEach((result , index) => {

            //Mi prendo l indice degli elementi da pushare
            const taskId = taskIds[index]
            if(result.status === "fulfilled" && result?.value.success){
                fullfilledDelitions.push(taskId)
            }else{
                rejectedDelitions.push(taskId)
            }
        })

        if(fullfilledDelitions.length > 0 ){

            //Dispatch dele reducer
            dispatchTasks({type : 'REMOVE_MULTIPLE_TASK', payload: fullfilledDelitions})

            
        }

        if(rejectedDelitions.length > 0){
            throw new Error(`Errore nell' eliminazione delle task : ${rejectedDelitions.join(",")}`)
        }
    }
    
    //funzione per modificare una task
    async function updateTask(updatedTask) {

        
        const taskWhitSameTitle = tasks.find(t => t.title === updatedTask.title)
          
        //Controllo per verificare che l id della tas da modificare  sia uguale a quella gia presente nell array
        if(taskWhitSameTitle &&  String(taskWhitSameTitle.id) !== String(updatedTask.id)){

            throw new Error("Esiste già  una task con questo nome")
        }
        
        //Chiamata Api con il fetch()
        const response = await fetch(`${url}/tasks/${updatedTask.id}`, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(updatedTask)
        })
        
        //Mi prendo i valori che mi servono dalla response
        const {success , message , task} = await response.json()

        if(!success) throw new Error(message)


            //dispatch del reducer
            dispatchTasks({type : 'UPDATE_TASK', payload: task })

    }


    return {tasks , addTask , removeTask , updateTask , removeMultipleTasks}
}

export default useTask