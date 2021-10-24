import React, { Component } from 'react'
import './Popup.css';

export default class Popup extends Component {

  get type() { 
    let popupTypeClass = 'popup';
    if (this.props.type === 'success') {
      popupTypeClass += ' popup-success';
    } else if (this.props.type === 'fail') {
      popupTypeClass += ' popup-fail';
    } else if (this.props.type === 'warning') {
      popupTypeClass += ' popup-warning';
    } else {
      popupTypeClass += ' popup-neutral';
    }
    return popupTypeClass; 
  }

  render() {
    return (
      <div className={this.props.hidden ? 'popup popup-hidden' : this.type}>
        <h1>{this.props.message}</h1>
      </div>
      
    )
  }
}
