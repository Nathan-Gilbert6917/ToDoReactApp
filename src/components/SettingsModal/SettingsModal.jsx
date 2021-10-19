import React, { Component } from 'react'
import { BsX } from "react-icons/bs";
import Slider from '../Slider/Slider.jsx';
import './SettingsModal.css'

export default class SettingsModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      switchTitle: 'Light Mode',
      switchOn: false
    }
  }

  updateParent(){
    this.props.toggleShowModalCallback(this.props.title);
  }

  toggleSwitchClicked(state) {
    const lightMode = state ? 'Dark Mode' : 'Light Mode';
    this.setState({
      switchTitle: lightMode,
      switchOn: state
    });
  }

  render() {
    return (
      <div className={this.props.open ? 'modal' : 'modal modal-hidden'} onClick={this.updateParent.bind(this)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2 className="modal-title">{this.props.title}</h2>
            <BsX className="close-modal" onClick={this.updateParent.bind(this)}/>
          </div>
          <div className="modal-body">
            <div className="lightModeSwitch">
              <Slider title={this.state.switchTitle} toggleSwitchClickedCallback={this.toggleSwitchClicked.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
