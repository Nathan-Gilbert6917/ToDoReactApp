import React from 'react';
import './Task.css';

class Task extends React.Component {


  constructor() {
    super();

    this.state = {
      checked: false
    }
  }

  checkboxClicked() {
    this.setState({
      checked: !this.state.checked
    });
  }

  render() { 
    return (
      <div className="task">
        <input className="checkbox" type="checkbox" id={this.props.id} onChange={this.checkboxClicked.bind(this)}></input>
        <div className="desc-container">
          {this.state.checked
            ? <i><h4 className="done desc">{this.props.title}</h4></i>
            : <h4 className="desc">{this.props.title}</h4>
          }
        </div>
      </div>
    );
  }
}

export default Task;