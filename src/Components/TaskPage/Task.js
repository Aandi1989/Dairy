import React from 'react';
import styles from './Task.module.css';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import arrow from '../../icons/arrow.png';
import {timestampToDate} from '../../core/helpers';
import {BiPencil} from "react-icons/bi";
import {BiSave} from "react-icons/bi";
import SaveEditedTaskPopup from "../SaveEditedTask/SaveEditedTaskPopup"


class Task extends React.Component{
    constructor(props){
        super(props)
        this.state={
            taskOpened:false,
            editMode:false,
            title:'',
            text:'',
            task_status:'',
            error:false,
            textError:'',
            showSavePopup:false,
            showStatusList:false
        }
    }
    openTaskToogle(){
        this.setState(prevState=>({
            taskOpened:!prevState.taskOpened
        }))
    }
    activateEditMode(){
        this.setState({
            taskOpened:true,
            editMode:true,
            title:this.props.task.title,
            text:this.props.task.text,
            task_status:this.props.task.task_status
        })
    }
    activateViewMode(){
        this.setState({
            taskOpened:false,
            editMode:false
        })
    }
    changeTitleValue(e){
        this.setState({
            title:e.currentTarget.value
        })
        if(this.state.text){
            this.setErrorFalse()
        }
    }
    changeTaskValue(e){
        this.setState({
            text:e.currentTarget.value
        })
        if(this.state.title){
            this.setErrorFalse()
        }
    }
    setErrorFalse(){
        this.setState({
                error:false,
                textError:''
            })
    }
    setErrorTrue(){
        this.setState({
                error:true,
                textError:'Заполните все поля'
            })
    }
    openSavePopup(){
        this.setState({ showSavePopup:true})
    }
    closeSavePopup(){
        this.setState({ showSavePopup:false})
    }
    onCancelButtonClick(){
        this.setState({
            taskOpened:false,
            editMode:false,
            showSavePopup:false,
            error:false,
            textError:'',
            // title:this.props.task.title,
            // text:this.props.task.text,
            // task_status:this.props.task.task_status
        })
    }
    toogleShowStatusList(){
        this.setState(prevState=>({
            showStatusList:!prevState.showStatusList
        }))
    }
    setStatus(status){
        this.setState({
            task_status:status
        })
    }
    render(){
        const {task,tasksStatus}=this.props
        const {taskOpened,editMode,text,title,error,textError,showSavePopup,showStatusList,task_status}=this.state
        const date=timestampToDate(task.creation_date)
        const editedTask={
                title:title,
                text:text,
                creation_date:task.creation_date,
                task_status:task_status,
                id:task.id
        }
        // console.log(editedTask)
        const openTaskToogleHandler=()=>{
            this.openTaskToogle()
        }
        const activateEditModeHandler=()=>{
            this.activateEditMode()
        }
        const onSaveIconClickHandler=()=>{
            if(text && title){
                this.openSavePopup()
            }else{
                this.setErrorTrue()
                this.closeSavePopup()
            }  
        }
        const onCancelButtonClickHandler=()=>{
            this.onCancelButtonClick()
        }
        const toogleShowStatusListHandler=()=>{
            this.toogleShowStatusList()
        }
        const setStatusHandler=(status)=>()=>{
            this.setStatus(status)
        }
        return(
            <div className={styles.wrapper}>
                <div className={taskOpened ? styles.task_stats_opened : styles.task_stats}>
                    <div className={styles.date}>{date}</div>
                    {editMode ? 
                    <input onChange={(e)=>this.changeTitleValue(e)} className={styles.title_input} value={title}/>
                    : <div className={styles.title}>{task.title}</div>}
                    <div className={styles.wrapper_status}>
                        {editMode ?  <div className={styles.status_edited}>{task_status}</div>
                        : <div className={styles.status}>{task.task_status}</div>}
                        {editMode &&  <div onClick={toogleShowStatusListHandler} className={styles.status__picture}>
                                        <img className={showStatusList ? styles.picture__img_opened : styles.picture__img }
                                         src={arrow} alt='arrow' />
                                        {showStatusList && <div className={styles.status_list_box}>
                                            {tasksStatus.map(el=>{
                                                return(
                                                 <div key={nanoid()} onClick={setStatusHandler(el.status)}
                                                 className={styles.status_list_item}>{el.status}</div>  
                                                )
                                            })}
                                        </div>}
                                        {showStatusList && <div className={styles.status_list_bg}>
                                        </div>} 
                                      </div>}
                    </div>
                   
                    {error ? 
                    <div className={styles.error}>{textError}</div> 
                    : <div className={styles.empty_error}></div>}
                    {editMode ? 
                    <div onClick={onSaveIconClickHandler} className={styles.icon_save}><BiSave/></div>
                    : <div onClick={activateEditModeHandler} className={styles.icon_edit}><BiPencil/></div>}
                    <input className={styles.checkbox} type="checkbox"/>
                    <div onClick={openTaskToogleHandler} className={styles.picture}>
                        <img className={taskOpened ? styles.picture__img_opened : undefined} src={arrow} alt='arrow' />
                    </div> 
                </div>
                {editMode ? 
                <textarea className={taskOpened ?styles.text_textarea_open : styles.text_textarea_close}
                onChange={(e)=>this.changeTaskValue(e)} value={text}/>
                : <div className={taskOpened ? styles.task_body_opened : styles.task_body_closed}>{task.text}</div>}
                {showSavePopup &&  <div className={styles.bg_open}>
                    <SaveEditedTaskPopup editedTask={editedTask} onCancelButtonClickHandler={onCancelButtonClickHandler}/>  
                </div>}
            </div>
        )
    }
}

const mapStateToProps=state=>({
    tasksStatus:state.tasksReducer.tasksStatus
})

export default connect(mapStateToProps,{})(Task)