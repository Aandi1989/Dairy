import {
    loadTasks,
    loadTasksSuccess,
    loadTasksFailed,
    changeCurrentTasksStatus,
    postNewTaskAC,
    putEditedTaskAC
} from "./actions";
import {
    getAllTasks,
    postNewTask,
    putNewTask
} from "./api"

export const loadTasksThunk = (status) => {
    return async dispatch => {
        dispatch(loadTasks())
        try {
            const tasks = await getAllTasks()
            const reversedArrTasks=[]
            for(let i=tasks.length-1;i>=0;i--){
                reversedArrTasks.push(tasks[i])
            }
            const filteredTasks=reversedArrTasks.filter(task=>task.task_status==status)
            dispatch(changeCurrentTasksStatus(status))
            dispatch(loadTasksSuccess(filteredTasks))
        } catch (error) {
            dispatch(loadTasksFailed(error))
        }
    }
}

export const postNewTaskThunk=(task)=>{
    return async dispatch =>{
        dispatch(loadTasks())
        try{
            const request = await postNewTask(task)
            if(request.status==200){
                dispatch(postNewTaskAC(task))
            }
        }catch(error){
            dispatch(loadTasksFailed(error))
        }
    }
}
export const putEditedTaskThunk=(task)=>{
    return async dispatch=>{
        dispatch(loadTasks())
        try{
            const request=await putNewTask(task)
            if(request.status==200){
                dispatch(putEditedTaskAC(task))
            }
        }catch(error){
            dispatch(loadTasksFailed(error))
        }
    }
}