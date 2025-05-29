
//HOOKS
import { useCallback, useState } from "react"
import { useMemo } from "react"
import { useRef } from "react"

//Context
import { useContextAPI } from "../Context/ContextAPI"

//Components
import TaskRow from "../components/TaskRow"

//Oggetto con all' interno i valori della select
const statusOrder = { "To do": 0, "Doing": 1, "Done": 2 };

 //Funzione debounce
     function debounce (callback , delay){
        let timer;
        return (value) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
     }
 

export default function TaskList(){
    //Importo il value del context
    const {tasks , removeMultipleTasks} = useContextAPI()

    //Stati per l'ordinamento delle task
    const [sortBy ,setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)

    //Stato per la ricerca
    const [searchQuery, setSearchQuery] = useState("");

    //Stato per la selezione delle task
    const [selectedTaskIds , setSelectedTaskIds] = useState([])
    
    //Funzione toggle per includere  i nuovi elementi selezionati nell array selectedTaskIds
    const toggleSelection = (taskId) => {
     if(selectedTaskIds.includes(taskId)){
        setSelectedTaskIds((prev) => prev.filter(id => id !== taskId))

    }else{
        setSelectedTaskIds((prev) =>  [...prev , taskId])

    }
}
   
   //Funzione con useCallback e debounce per ritardare il rendering alla ricerca
    const debounceSetSearchQuery = useCallback( debounce(setSearchQuery, 500),[])

   

   
    
    //Funzione di ordinamento
    const handleOrder = (column) => {
      if(sortBy === column){
        setSortOrder((prev) => prev * -1)
      }else{
        setSortBy(column)
        setSortOrder(1)
      }
    }


    //UseMemo per ordinare e filtrare le task 
    const FilteredAndSortedTask = useMemo(() =>{
        
        return [...tasks]
        .filter((task) => 
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        .sort((a,b) => {
         let result = 0;
         if(sortBy === "title"){
            result = a.title.localeCompare(b.title)
         }else if(sortBy === "status") {
           result = statusOrder[a.status] - statusOrder[b.status]
         }else if(sortBy === "createdAt"){
             result = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
         }

         return result * sortOrder
        })
    } , [searchQuery,tasks , sortBy , sortOrder])


    //Funzione per gestire l' eliminazione multipla delle tasks
    const handleDelete = async () => {
       try{
       await removeMultipleTasks(selectedTaskIds)
       alert("Task eliminate con successo")
       setSelectedTaskIds([])

       }catch(error){
        console.error(error)
        alert(error.message)
       }
    }



    return(


        <div className="tasklist-container" >

            <header className="tasklist-header">
                <h1 className="tasklist-title">Task Manager</h1>
                <p className="tasklist-subtitle">Visualizza e gestisci le tue attività</p>
            </header>

               <div className="search-button-container">

                <input type="text"
                placeholder="Cerca.."
                onChange={(e) =>debounceSetSearchQuery(e.target.value)}
                />

               {/*Bottone che appare solo se ci sono task selezionate */}
                {selectedTaskIds.length > 0 && (
                <button className="remove-task-btn" onClick={  handleDelete}>Elimina Selezionate</button>
              )}
                
               </div>

              <div className="table-wrapper" >
                <table className="task-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th onClick={() =>handleOrder("title")} >Nome</th>
                            <th onClick={() =>handleOrder("status")}>Stato</th>
                            <th onClick={() => handleOrder("createdAt")}>Data di Creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {FilteredAndSortedTask?.map((task) => (
                            <TaskRow 
                            key={task.id}
                            task ={task}
                            checked ={selectedTaskIds.includes(task.id)}
                            onToggle = {toggleSelection}
                            
                            />
                        ))}
                    </tbody>
                </table>
              </div>
           
        </div>
         
    )
}