import React from 'react';
import styles from './NewTaskPopup.module.css';
import SaveTaskPopup from '../SaveTaskPopup/SaveTaskPopup';


class NewTaskPopup extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            text:'',
            error:true,
            textError:'',
            showSavePopup:false
        }
    }
    changeTitleValue(e){
        this.setState({
            title:e.currentTarget.value
        })
        if(this.state.text){
            this.setErrorFalse()
        }
    }
    changeTextValue(e){
        this.setState({
            text:e.currentTarget.value
        })
        if(this.state.title){
            this.setErrorFalse()
        }
    }
    checkFields(){
        if(!this.state.title || !this.state.text){
            this.setState({
                error:true,
                textError:'Заполните все поля'
            })
        }
    }
    setErrorFalse(){
        this.setState({
                error:false,
                textError:''
            })
    }
    openSavePopup(){
        this.setState({ showSavePopup:true})
    }
    closeSavePopup(){
        this.setState({ showSavePopup:false})
    }
    render(){
        const {title,text,error,textError,showSavePopup}=this.state
        const toogleShowNewTaskPopupHandler=this.props.toogleShowNewTaskPopupHandler
        const newTask={
            title:title,
            text:text,
            creation_date:JSON.stringify(Date.now()),
            task_status: "New",
            id:Date.now()
        }
        const onSendClickHandler=()=>{
            this.checkFields()
            if(error){
                this.closeSavePopup() 
            }else{
                this.openSavePopup()
            }  
        }
        const closeSavePopupHandler=()=>(
            this.closeSavePopup()
        )
     
        // console.log(newTask)
        return(
            <div className={styles.wrapper}>
                <div className={styles.wrapper_newTask}>
                    <div className={styles.header}>Сохранить изменения</div>
                    <div className={styles.title_box}>Введите заголовок</div>
                    <input onChange={(e)=>this.changeTitleValue(e)} value={title}
                    disabled={showSavePopup} className={styles.title_input}/>
                    <div className={styles.text_box}>Введите описание задания</div>
                    <textarea onChange={(e)=>this.changeTextValue(e)} value={text} 
                    disabled={showSavePopup} className={styles.text_textarea}/>
                    {error ? <div className={styles.error}>{textError}</div> : <div className={styles.empty_error}></div>}
                    <div className={styles.buttons}>
                         <button onClick={onSendClickHandler} className={styles.buttons__send}>Отправить</button>
                         <button onClick={toogleShowNewTaskPopupHandler} className={styles.buttons__cancel}>Отмена</button>
                    </div>
                </div>
                {!error && showSavePopup && <div className={styles.wrapper_saveTask}>
                    <SaveTaskPopup newTask={newTask} closeSavePopupHandler={closeSavePopupHandler}
                    toogleShowNewTaskPopupHandler={toogleShowNewTaskPopupHandler}/>  
                </div>}
            </div>
            
        )
    }
}

export default NewTaskPopup