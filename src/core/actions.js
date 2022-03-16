import { taskTypes } from "./types"

export const loadTasks=()=>({type:taskTypes.loadTasks})
export const loadTasksSuccess=(payload)=>({type:taskTypes.loadTasksSuccess,payload})
export const loadTasksFailed=(error)=>({type:taskTypes.loadTasksFailed,error})
export const changeCurrentTasksStatus=(payload)=>({type:taskTypes.changeCurrentTasksStatus,payload})
export const postNewTaskAC=(payload)=>({type:taskTypes.postNewTask,payload})
export const putEditedTaskAC=(payload)=>({type:taskTypes.putEditedTask,payload})
