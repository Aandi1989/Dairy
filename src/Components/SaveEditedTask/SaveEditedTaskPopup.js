import React from 'react';
import styles from './SaveEditedTaskPopup.module.css';
import {putNewTask} from '../../core/api';
import { connect } from 'react-redux';
import {putEditedTaskThunk} from '../../core/thunks'

class SaveTaskPopup extends React.Component{
    method(task){
        putNewTask(task)
    }

    render(){
        const {onCancelButtonClickHandler,editedTask,putEditedTaskThunk}=this.props
        const putEditedTaskHandler=(task)=>()=>{
            putEditedTaskThunk(task)
            onCancelButtonClickHandler()
        }
        console.log(this.props)
        return(
            <div className={styles.wrapper}>
                <div className={styles.header}>Сохранить измения</div>
                <div className={styles.buttons}>
                         <button onClick={putEditedTaskHandler(editedTask)} className={styles.buttons__confirm}>Да</button>
                         <button onClick={onCancelButtonClickHandler} className={styles.buttons__cancel}>Нет</button>
                    </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({

})

export default connect(mapStateToProps,{putEditedTaskThunk})(SaveTaskPopup)