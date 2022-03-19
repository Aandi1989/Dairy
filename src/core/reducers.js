import { taskTypes } from "./types"

const initialState={
    tasks:[],
    tasksStatus:[{status:"New"},{status:"Completed"},{status:"Deleted"}],
    currentTasksStatus:"New",
    tasksToChange:[]
}

export const tasksReducer=(state=initialState,action)=>{
    switch(action.type){
        case taskTypes.loadTasks:
            return {
                ...state,
                isLoading:true
            }
        
        case taskTypes.loadTasksSuccess:
            return{
                ...state,
                isLoading:false,
                tasks:action.payload
            }

        case taskTypes.loadTasksFailed:
            return{
                ...state,
                isLoading:false,
                error:action.error
            }

        case taskTypes.changeCurrentTasksStatus:
            return{
                ...state,
                currentTasksStatus:action.payload,
                tasksToChange:[]
            }  
            
        case taskTypes.postNewTask:
            return{
                ...state,
                isLoading:false,
                tasks:[action.payload,...state.tasks].filter(task=>task.task_status==state.currentTasksStatus)
            }  
            
        case taskTypes.putEditedTask:
            return{
                ...state,
                isLoading:false,
                tasks:[...state.tasks].map(task=>{
                    if(task.id==action.payload.id){
                        return action.payload
                    }else{
                        return task
                    }
                }).filter(task=>task.task_status==state.currentTasksStatus)
            }  
            
         case taskTypes.addTaskToChange:
             return{
                 ...state,
                 tasksToChange:[...state.tasksToChange].some(task=>task.id==action.payload.id) ?
                 [...state.tasksToChange].filter(task=>task.id != action.payload.id) 
                 : [...state.tasksToChange,action.payload]
                 
             }   

         case taskTypes.clearTasksToChange:
             return{
                 ...state,
                 tasksToChange:[]
             }

        case taskTypes.putEditedTasks:
            return{
                ...state,
                tasks:[...state.tasks].map(task=>{
                    if(state.tasksToChange.some(el=>el.id==task.id)){
                        return {...task,task_status:action.opt}
                    }else{
                        return task
                    }
                }).filter(task=>task.task_status==state.currentTasksStatus),
                isLoading:false

            }

        case taskTypes.deleteTasks:
            return{
                ...state,
                tasks:[...state.tasks].filter(task=>!state.tasksToChange.some(el=>el.id==task.id))
            }    

        default:
            return state    
    }
}
