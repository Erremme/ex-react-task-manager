import { BrowserRouter ,Route , Routes } from "react-router-dom"
import TaskList from "./pages/TaskList"
import AddTaskList from "./pages/AddTaskList"

export default function App(){

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskList />}/>
        <Route path="AddTask" element={<AddTaskList />} />
      </Routes>
    </BrowserRouter>
  )
}
