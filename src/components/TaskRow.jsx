//React.memo
import { memo } from "react"
//Libreria per formattare la data
import dayjs from "dayjs";

//React-router-dom
import { Link } from "react-router-dom";

//Funzione per gestire i colori degli stati
const getStatusColor = (status) => {
    if (status === "To do") return "red";
    if (status === "Doing") return "yellow";
    if (status === "Done") return "green";
    return "white";
};

//Ho usato memo per evitare re-render inutili all' aggiornamento dello stato
const TaskRow = memo(({title, status ,createdAt, id}) => {
    console.log("rerender")
    return(
            <tr className="task-row" >
                <td className="task-cell">
                   <Link to={`/task/${id}`} style={{ color: "#1976d2", textDecoration: "underline" }}>
                    {title}
                </Link> 
                    
                </td>
                <td className="task-cell" style={{background: getStatusColor(status)}}> 
                {status}
                </td>
                <td className="task-cell">{dayjs(createdAt).format('DD/MM/YYYY HH:mm:ss')} </td>
            </tr>
    )
})

export default TaskRow