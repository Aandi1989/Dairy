import React from 'react';
import styles from './SaveDeletedTasksPopup.module.css';
import { connect } from 'react-redux';
import {deleteTasksThunk} from '../../core/thunks'

class SaveTaskPopup extends React.Component{
    render(){
        const {deleteTasksThunk,currentTasksStatus,tasksToChange,toogleShowSaveDeletedTasksHandler}=this.props
        const deleteTasksHandler=(tasks,curStat,opt)=>()=>{
            deleteTasksThunk(tasks,curStat,opt)
            toogleShowSaveDeletedTasksHandler()
        }
    
        return(
            <div className={styles.wrapper}>
                <div className={styles.header}>Сохранить измения</div>
                <div className={styles.buttons}>
                         <button onClick={deleteTasksHandler(tasksToChange,currentTasksStatus,"Deleted")} className={styles.buttons__confirm}>Да</button>
                         <button onClick={toogleShowSaveDeletedTasksHandler} className={styles.buttons__cancel}>Нет</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    currentTasksStatus:state.tasksReducer.currentTasksStatus,
    tasksToChange:state.tasksReducer.tasksToChange
})

export default connect(mapStateToProps,{deleteTasksThunk})(SaveTaskPopup)