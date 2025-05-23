//React-router-dom
import { BrowserRouter ,Route , Routes } from "react-router-dom"
//Component
import TaskList from "./pages/TaskList"
import AddTaskList from "./pages/AddTaskList"
//Context
import { ContextAPIProvider } from "./Context/ContextAPI"


export default function App(){

  return(
    <ContextAPIProvider>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />}/>
        <Route path="AddTask" element={<AddTaskList />} />
      </Routes>
    </BrowserRouter>
    
    </ContextAPIProvider>
  )
}
