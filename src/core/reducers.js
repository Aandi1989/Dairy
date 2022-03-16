import { taskTypes } from "./types"

const initialState={
    tasks:[],
    tasksStatus:[{status:"New"},{status:"Completed"},{status:"Deleted"}],
    currentTasksStatus:"New"
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
                currentTasksStatus:action.payload
            }  
            
        case taskTypes.postNewTask:
            return{
                ...state,
                isLoading:false,
                tasks:[action.payload,...state.tasks]
            }  
            
        case taskTypes.putEditedTask:
            return{
                ...state,
                isLoading:false,
                tasks:[...state.tasks].map(task=>{
                    if(task.id==action.payload.id){
                        // console.log(task.id)
                        return action.payload
                    }else{
                        return task
                    }
                })
            }    

        default:
            return state    
    }
}
