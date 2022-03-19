import React from 'react';
import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import {loadTasksThunk,postNewTaskThunk} from '../../core/thunks';
import NewTaskPopup from '../NewTaskPopup/NewTaskPopup';
import SaveCompletedTasksPopup from '../SaveCompletedTasksPopup/SaveCompletedTasksPopup';
import SaveDeletedTasksPopup from '../SaveDeletedTasksPopup/SaveDeletedTasksPopup'
import {postNewTask} from '../../core/api'

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showNewTaskPopup:false,
            showSaveCompletedTasks:false,
            showSaveDeletedTasks:false
        }
    }
    toogleShowNewTaskPopup(){
        this.setState(prevState=>({
            showNewTaskPopup:!prevState.showNewTaskPopup
        }))
    }
    toogleShowSaveCompletedTasks(){
            this.setState(prevState=>({
                showSaveCompletedTasks:!prevState.showSaveCompletedTasks
            }))
    }
    toogleShowSaveDeletedTasks(){
            this.setState(prevState=>({
                showSaveDeletedTasks:!prevState.showSaveDeletedTasks
            }))
    }
    loadTasks(status){
        this.props.loadTasksThunk(status)
    }
    render(){
        const {tasksStatus,currentTasksStatus,tasksToChange}=this.props
        const {showNewTaskPopup,showSaveCompletedTasks,showSaveDeletedTasks}=this.state
        const loadTasksHandler=(status)=>()=>{
            this.loadTasks(status)
        }
        const toogleShowNewTaskPopupHandler=()=>{
            this.toogleShowNewTaskPopup()
        }
        const toogleShowSaveCompletedTasksHandler=()=>{
            if(tasksToChange.length>0){
                this.toogleShowSaveCompletedTasks()
            }
        }
        const toogleShowSaveDeletedTasksHandler=()=>{
            if(tasksToChange.length>0){
                this.toogleShowSaveDeletedTasks()
            }
        }
        console.log(tasksToChange.length,showSaveCompletedTasks,showSaveDeletedTasks)
        return(
            <div className={styles.wrapper}>
                <div className={styles.buttons}>
                    <div className={styles.status_Buttons}>
                        {tasksStatus.map(el=>{
                    return(
                        <button key={nanoid()} onClick={loadTasksHandler(el.status)}
                        className={el.status==currentTasksStatus ? styles.currentStatus_Buttons__button :styles.status_Buttons__button}>
                            {el.status}</button>
                    )
                    })}   
                    </div>
                     <div className={styles.default_Buttons}>
                        <button onClick={toogleShowNewTaskPopupHandler} className={styles.default_Buttons__add}>Add</button>
                        <button onClick={toogleShowSaveCompletedTasksHandler} 
                        className={styles.default_Buttons__complete}>Complete</button>
                        <button onClick={toogleShowSaveDeletedTasksHandler} className={styles.default_Buttons__delete}>Delete</button>
                    </div> 
                </div>
                <div className={styles.taskInfo}>
                    <div className={styles.taskInfo__date}>Date</div>    
                    <div className={styles.taskInfo__title}>Title</div>    
                    <div className={styles.taskInfo__status}>Status</div>    
                </div>
                {showNewTaskPopup && <div className={styles.bg_open}>
                    <div className={styles.newTaskPopup_open}>
                        <NewTaskPopup toogleShowNewTaskPopupHandler={toogleShowNewTaskPopupHandler}/>    
                    </div>   
                </div>}
                {showSaveCompletedTasks && tasksToChange.length>0 && <div className={styles.bg_open}>
                        <SaveCompletedTasksPopup toogleShowSaveCompletedTasksHandler={toogleShowSaveCompletedTasksHandler}/>    
                </div>}
                {showSaveDeletedTasks && tasksToChange.length>0 && <div className={styles.bg_open}>
                        <SaveDeletedTasksPopup toogleShowSaveDeletedTasksHandler={toogleShowSaveDeletedTasksHandler} />    
                </div>}
            </div>
        )
    }
}

const mapStateToProps=state=>({
    tasksStatus:state.tasksReducer.tasksStatus,
    currentTasksStatus:state.tasksReducer.currentTasksStatus,
    tasksToChange:state.tasksReducer.tasksToChange
})

export default connect(mapStateToProps,{loadTasksThunk,postNewTask,postNewTaskThunk})(Navbar)