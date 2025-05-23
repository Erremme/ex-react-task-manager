import { memo } from "react"

const getStatusColor = (status) => {
    if (status === "To do") return "red";
    if (status === "Doing") return "yellow";
    if (status === "Done") return "green";
    return "white";
};

const TaskRow = memo(({title, status ,createdAt}) => {
    console.log("rerender")
    return(
            <tr className="task-row" >
                <td className="task-cell">{title} </td>
                <td className="task-cell" style={{background: getStatusColor(status)}}> 
                {status}
                </td>
                <td className="task-cell">{createdAt} </td>
            </tr>
    )
})

export default TaskRow