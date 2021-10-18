import React from 'react';
import './App.css';

import TaskList from '../TaskList/TaskList.jsx';

import SettingsModal from '../SettingsModal/SettingsModal.jsx';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';
import { BsPlus, BsGearFill } from "react-icons/bs";

class App extends React.Component {

// {
//  id : '1',
//  title: 'Todo1',
//  desc: 'Hello',
//  done: false
// },

  constructor() {
    super();

    this.state = {
      tasks: [],
      addTaskModal: false,
      settingsModal: false
    };
  }

  addTaskClick() {
    this.setState({ 
      addTaskModal: true
    });  
  }

  settingsClick() {
    this.setState({ 
      settingsModal: true
    });
  }

  toggleShowModal(modal) {
    if (modal === 'Add Task') {
      this.setState({addTaskModal: !this.state.addTaskModal});
    } else if (modal === 'Settings') {
      this.setState({settingsModal: !this.state.settingsModal});
    }
  }

  addNewTask(newTask) {
    const newTasksList = this.state.tasks;
    newTasksList.push(newTask);
    this.setState({
      tasks: newTasksList
    });
  }
   

  render() {
    return (
      <div className="App">
        <AddTaskModal title="Add Task" open={this.state.addTaskModal} addTaskCallback={this.addNewTask.bind(this)} toggleShowModalCallback={this.toggleShowModal.bind(this)} />
        <SettingsModal title="Settings" open={this.state.settingsModal} toggleShowModalCallback={this.toggleShowModal.bind(this)} />

        <div className="container">
          <div className="top">
            <div className="button-container">
              <BsPlus className="add-button" onClick={this.addTaskClick.bind(this)}/>
            </div>
            <div className="header">
              <h1>My To Do</h1>
            </div>
            <div className="button-container">
                <BsGearFill className="settings-button" onClick={this.settingsClick.bind(this)} />
            </div>
          </div>
          <TaskList className="list" tasks={this.state.tasks} />
        </div>
        
      </div>
    );
  }
}

export default App;
