import React, { Component } from 'react'
import { BsX } from "react-icons/bs";
import Slider from '../Slider/Slider.jsx';
import './SettingsModal.css'

export default class SettingsModal extends Component {

  constructor(props) {
    super(props);

    let nightSwitch;
    if (this.nightModeState !== 'null' && this.nightModeState === 'true') {
      nightSwitch = true; 
    } else {
      nightSwitch = false;
    }

    this.state = {
      open: this.props.open,
      switchOn: nightSwitch
    }
    this.changeTheme(this.state.switchOn);
  }

  get nightModeState() { 
    return localStorage.getItem('nightMode');
  }

  set nightModeState(state) {
    localStorage.setItem('nightMode', state);
  }

  changeTheme(state){
    state ? document.documentElement.style.setProperty('--night-bg', '#242424') : document.documentElement.style.setProperty('--night-bg', '#fff');
    state ? document.documentElement.style.setProperty('--night-text', '#fff') : document.documentElement.style.setProperty('--night-text', '#000');
    state ? document.documentElement.style.setProperty('--night-shadow', '') : document.documentElement.style.setProperty('--night-shadow', '0 0 7px #ddd');
    this.nightModeState = state;
  }

  updateParent(){
    this.props.toggleShowModalCallback(this.props.title);
  }

  toggleSwitchClicked(state) {
    this.setState({
      switchOn: state
    });
    this.changeTheme(state);
  }

  render() {
    return (
      <div className={this.props.open ? 'setting-modal' : 'setting-modal modal-hidden'} onClick={this.updateParent.bind(this)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            <div className="lightModeSwitch">
              <Slider on={this.state.switchOn} toggleSwitchClickedCallback={this.toggleSwitchClicked.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
