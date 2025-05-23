import { createContext , useState , useContext, useEffect } from "react";

//Creo il contesto
const ContextAPI = createContext()

//Provider che fa la chiamata
function ContextAPIProvider({children}){

    //Stato per salvare i dati della chiamata
    const [tasks , setTasks] = useState([])
    
    //Variabile globale che contiene l url
    const Url = import.meta.env.VITE_API_URL

    //Faccio la chiama e salvo i dati
    useEffect(() => {
        fetch(`${Url}/tasks`)
        .then(res => res.json()) 
        .then(data => setTasks(data) )
        .catch(error => console.error(error))
    }, [])

    //Mostro i dati in consolle
    console.log(tasks)

    return(
        <ContextAPI.Provider value={tasks} >
            {children}
        </ContextAPI.Provider>
    )
}

//Uso il context prima di importarlo
function useContextAPI(){
    const context = useContext(ContextAPI)
    return context
}

export {ContextAPIProvider , useContextAPI}


