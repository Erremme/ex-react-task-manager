import { createContext ,  useContext,  } from "react";

//Custom HOOK
import UseTasks from "../customHooks/UseTasks";

//Creo il contesto
const ContextAPI = createContext()

//Provider che fa la chiamata
function ContextAPIProvider({children}){
    
    //Destrutturazione dei valori dal custom Hook
    const {tasks , addTask , removeTask , updateTask}= UseTasks()
    
  
    return(
        <ContextAPI.Provider value={{tasks , addTask , removeTask , updateTask}} >
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


