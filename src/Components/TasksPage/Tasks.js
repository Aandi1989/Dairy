import React from 'react';
import styles from './Tasks.module.css';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import Task from '../TaskPage/Task';

class Tasks extends React.Component{
    render(){
        const {tasks}=this.props
        return(
            <div className={styles.wrapper}>
               {tasks.length>0 ? 
               (tasks.map(task=>{
                   return(
                       <Task key={nanoid()} task={task}/>
                   )
               }))
               : (undefined)} 
            </div>
        )
    }
}

const mapStateToProps=state=>({
    tasks:state.tasksReducer.tasks
})

export default connect(mapStateToProps,{})(Tasks)