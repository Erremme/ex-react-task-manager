import { createContext ,  useContext,  } from "react";

//Custom HOOK
import useTasks from "../customHooks/useTasks";

//Creo il contesto
const ContextAPI = createContext()

//Provider che fa la chiamata
function ContextAPIProvider({children}){
    
    //Destrutturazione dei valori dal custom Hook
    const {tasks , addTask , removeTask , updateTask , removeMultipleTasks }= useTasks()
    
  // Ritorno il Provider con i value
    return(
        <ContextAPI.Provider value={{tasks , addTask , removeTask , updateTask , removeMultipleTasks}} >
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


