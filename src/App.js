import React from 'react'
import './App.css';
import { loadTasksThunk } from './core/thunks';
import {connect} from 'react-redux';
import Navbar from './Components/Navbar/Navbar';
import Tasks from './Components/TasksPage/Tasks';


class App extends React.Component {
  componentDidMount() {
    this.props.loadTasksThunk(this.props.currentTasksStatus)
  }
  render() {
    return (
      <div className='app-wrapper'> 
        <Navbar/>
        <Tasks/>
      </div>
    )
  }
}

const mapStateToProps=state=>({
  tasks:state.tasksReducer.tasks,
  currentTasksStatus:state.tasksReducer.currentTasksStatus
})

export default connect (mapStateToProps,{loadTasksThunk})(App);
