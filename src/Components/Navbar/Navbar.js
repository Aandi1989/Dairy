import React from 'react';
import styles from './Navbar.module.css';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import {loadTasksThunk,postNewTaskThunk} from '../../core/thunks';
import NewTaskPopup from '../NewTaskPopup/NewTaskPopup';
import {postNewTask} from '../../core/api'

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showNewTaskPopup:false
        }
    }
    toogleShowNewTaskPopup(){
        this.setState(prevState=>({
            showNewTaskPopup:!prevState.showNewTaskPopup
        }))
    }
    loadTasks(status){
        this.props.loadTasksThunk(status)
    }
    componentDidMount(){
       
    }
    render(){
        const {tasksStatus,currentTasksStatus}=this.props
        const {showNewTaskPopup}=this.state
        const loadTasksHandler=(status)=>()=>{
            this.loadTasks(status)
        }
        const toogleShowNewTaskPopupHandler=()=>{
            this.toogleShowNewTaskPopup()
        }
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
                        <button className={styles.default_Buttons__complete}>Complete</button>
                        <button className={styles.default_Buttons__delete}>Delete</button>
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
            </div>
        )
    }
}

const mapStateToProps=state=>({
    tasksStatus:state.tasksReducer.tasksStatus,
    currentTasksStatus:state.tasksReducer.currentTasksStatus
})

export default connect(mapStateToProps,{loadTasksThunk,postNewTask,postNewTaskThunk})(Navbar)