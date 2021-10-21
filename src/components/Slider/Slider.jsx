import React, { Component } from 'react';
import './Slider.css';

export default class Slider extends Component {

  updateParent(event){
    this.props.toggleSwitchClickedCallback(event.target.checked);
  }

  get label(){
    return this.props.on ? 'Dark Mode' : 'Light Mode';
  }

  render() {
    return (
      <div className="switch-container">
        <span>{this.label}</span>
        <label className="switch">
          <input type="checkbox" checked={this.props.on} onChange={this.updateParent.bind(this)}/>
          <span className="slider round"></span>
        </label>
      </div>
    )
  }
}
