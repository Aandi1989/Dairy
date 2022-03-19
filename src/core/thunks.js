import {
    loadTasks,
    loadTasksSuccess,
    loadTasksFailed,
    changeCurrentTasksStatus,
    postNewTaskAC,
    putEditedTaskAC,
    putEditedTasksAC,
    clearTasksToChangeAC,
    deleteTasksAC
    
} from "./actions";
import {
    getAllTasks,
    postNewTask,
    putNewTask,
    deleteTask
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

export const putEditedTasksThunk=(tasks,curStat,opt)=>{
    return async dispatch=>{
        if(curStat != opt){
            dispatch(loadTasks())
            try{
                const editedTasks=tasks.map(el=> {
                    return {...el,task_status:opt}
                })
                for await(let task of editedTasks){
                    await putNewTask(task)
                }
                dispatch(putEditedTasksAC(opt))
                dispatch(clearTasksToChangeAC()) 
            }catch(error){
                dispatch(loadTasksFailed(error))
            }
        }else{
            dispatch(clearTasksToChangeAC()) 
        }
    }
}

export const deleteTasksThunk=(tasks,curStat,opt)=>{
    return async dispatch=>{
        if(curStat == opt){
            dispatch(loadTasks())
            try{
                const tasksId=tasks.reduce((acc,val)=>[...acc,val.id],[])
                for await(let id of tasksId){
                    await deleteTask(id)
                }
                dispatch(deleteTasksAC())
                dispatch(clearTasksToChangeAC()) 
            }catch(error){
                dispatch(loadTasksFailed(error))
            }
        }else{
            dispatch(loadTasks())
            try{
                const editedTasks=tasks.map(el=> {
                    return {...el,task_status:opt}
                })
                for await(let task of editedTasks){
                    await putNewTask(task)
                }
                dispatch(putEditedTasksAC(opt))
                dispatch(clearTasksToChangeAC()) 
            }catch(error){
                dispatch(loadTasksFailed(error))
            }  
        }
    }
}