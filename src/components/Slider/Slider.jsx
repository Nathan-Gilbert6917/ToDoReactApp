import React, { Component } from 'react';
import './Slider.css';

export default class Slider extends Component {

  updateParent(event){
    this.props.toggleSwitchClickedCallback(event.target.checked);
  }

  render() {
    return (
      <div className="switch-container">
        <span>{this.props.title}</span>
        <label className="switch">
          <input type="checkbox" onChange={this.updateParent.bind(this)}/>
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}
