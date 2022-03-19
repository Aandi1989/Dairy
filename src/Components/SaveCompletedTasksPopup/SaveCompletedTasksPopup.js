import React from 'react';
import styles from './SaveCompletedTasksPopup.module.css';
import { connect } from 'react-redux';
import {putEditedTasksThunk} from '../../core/thunks';

class SaveTaskPopup extends React.Component{
    render(){
        const {toogleShowSaveCompletedTasksHandler,putEditedTasksThunk,currentTasksStatus,tasksToChange}=this.props
        const putEditedTasksHandler=(tasks,curStat,opt)=>()=>{
            putEditedTasksThunk(tasks,curStat,opt)
            toogleShowSaveCompletedTasksHandler()
        }
        return(
            <div className={styles.wrapper}>
                <div className={styles.header}>Сохранить измения</div>
                <div className={styles.buttons}>
                         <button onClick={putEditedTasksHandler(tasksToChange,currentTasksStatus,"Completed")} className={styles.buttons__confirm}>Да</button>
                         <button onClick={toogleShowSaveCompletedTasksHandler} className={styles.buttons__cancel}>Нет</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    currentTasksStatus:state.tasksReducer.currentTasksStatus,
    tasksToChange:state.tasksReducer.tasksToChange
})

export default connect(mapStateToProps,{putEditedTasksThunk})(SaveTaskPopup)