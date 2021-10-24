import React from 'react';
import './App.css';

import TaskList from '../TaskList/TaskList.jsx';

import SettingsModal from '../SettingsModal/SettingsModal.jsx';
import AddTaskModal from '../AddTaskModal/AddTaskModal.jsx';
import Popup from '../Popup/Popup.jsx';
import { BsPlus, BsGearFill } from "react-icons/bs";


class App extends React.Component {

// {
//  id : '1',
//  title: 'Todo1',
//  desc: 'Hello',
//  done: false,
//  priority: 1,
//  steps: [
//    {
//     id: '1',
//     step: '',
//     done: false,
//    }
//  ]
// },

  constructor() {
    super();

    this.state = {
      tasks: [],
      addTaskModal: false,
      settingsModal: false,
      message: {text: '', type: '', hidden: true}
    };
  }

  componentDidMount() {
    this.getTasksState();
  }

  splitObjects(objectsString) {
    if (objectsString) {
      let objects = [];
      let bracketCounter = 0;
      let leftBracketIndex = 0;
      let rightBracketIndex = 0;

      for (let key in objectsString) {
        if (objectsString[key] === '{' || objectsString[key] === '}') {
          bracketCounter++;
          if (bracketCounter === 1) {
            leftBracketIndex = key;
          } else if (bracketCounter === 2) {
            rightBracketIndex = key;
            let object = JSON.parse(objectsString.substring(leftBracketIndex, rightBracketIndex) + '}');
            objects.push(object);
            bracketCounter = 0;
            leftBracketIndex = 0; 
            rightBracketIndex = 0;
          }
        }
      }
      return objects;
    }
  }

  getTasksState() {
    const tasksState = localStorage.getItem('Tasks');
    if (tasksState) {
      this.setState({
        tasks: this.splitObjects(tasksState)
      });
    }
  }

  setTasksState(taskState) {
    this.setState({ tasks: taskState });
    let tasks = [];
    taskState.forEach(task => {
      tasks.push(JSON.stringify(task));
    });
    localStorage.setItem('Tasks', tasks);
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

  async addNewTask(newTask, message) {
    const newTasksList = this.state.tasks;
    newTasksList.push(newTask);
    await this.setTasksState(newTasksList);
    this.sendPopup(message);
  }

  async removeFromTasks(taskId, message) {
    let updatedTasks = this.state.tasks.filter((task) => {return task.id !== taskId})
    await this.setTasksState(updatedTasks);
    this.sendPopup(message);
  }

  async updateTask(updatedTaskState, message) {
    const tasks = this.state.tasks.map((task) => {
      if (task.id === updatedTaskState.id) {
        return updatedTaskState;
      }
      return task;
    });
    await this.setTasksState(tasks);
    this.sendPopup(message);
  }

  async sendPopup(message) {
    message.hidden = false;
    await this.setState({ message: message });
    setTimeout(() => {this.setState({message: {text: '', type: '', hidden: true}})}, 2000);
  }

  get sortedTask() {
    return this.state.tasks.sort((t1, t2) => parseInt(t2.priority) - parseInt(t1.priority));
  }

  render() {
    return (
      <div className="App">
        <AddTaskModal title="Add Task" open={this.state.addTaskModal} addTaskCallback={this.addNewTask.bind(this)} toggleShowModalCallback={this.toggleShowModal.bind(this)} />
        <SettingsModal title="Settings" open={this.state.settingsModal} toggleShowModalCallback={this.toggleShowModal.bind(this)} />
        <div className="container">
          <Popup hidden={this.state.message.hidden} type={this.state.message.type} message={this.state.message.text} />
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
          <TaskList 
            className="list"
            tasks={this.sortedTask} 
            removeFromTasks={this.removeFromTasks.bind(this)}  
            updateTask={this.updateTask.bind(this)}
            sendPopup={this.sendPopup.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
