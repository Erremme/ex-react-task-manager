//React-router-dom
import { BrowserRouter ,Route , Routes , NavLink} from "react-router-dom"
//Component
import TaskList from "./pages/TaskList"
import AddTaskList from "./pages/AddTaskList"
import TaskDetail from "./pages/TaskDetail"
//Context
import { ContextAPIProvider } from "./Context/ContextAPI"



export default function App(){

  return(
    

    <BrowserRouter>

      <nav>
          <NavLink to="/">Lista Task</NavLink>
          <NavLink to="AddTask">Aggiungi Task</NavLink>

      </nav>
    <ContextAPIProvider>
      <Routes>
        <Route path="/" element={<TaskList />}/>
        <Route path="AddTask" element={<AddTaskList />} />
        <Route path="task/:id" element={<TaskDetail />} />
       
      </Routes>
       </ContextAPIProvider>
    </BrowserRouter>
    
   
  )
}
