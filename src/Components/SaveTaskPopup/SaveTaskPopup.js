import React from 'react';
import styles from './SaveTaskPopup.module.css';
import { connect } from 'react-redux';
import {postNewTaskThunk} from '../../core/thunks'

class SaveTaskPopup extends React.Component{
    
    render(){
        // console.log(this.props)
        const {closeSavePopupHandler,newTask,postNewTaskThunk,toogleShowNewTaskPopupHandler}=this.props
        const postNewTaskHandler=(task)=>()=>{
            postNewTaskThunk(task)
            toogleShowNewTaskPopupHandler()
        }
        return(
            <div className={styles.wrapper}>
                <div className={styles.header}>Сохранить измения</div>
                <div className={styles.buttons}>
                         <button onClick={postNewTaskHandler(newTask)}  className={styles.buttons__confirm}>Да</button>
                         <button onClick={closeSavePopupHandler} className={styles.buttons__cancel}>Нет</button>
                    </div>
            </div>
        )
    }
}
const mapStateToProps=state=>({})

export default connect(mapStateToProps,{postNewTaskThunk})(SaveTaskPopup)