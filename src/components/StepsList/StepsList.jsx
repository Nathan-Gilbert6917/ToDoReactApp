import React from 'react';
import Step from '../Step/Step.jsx';

import './StepsList.css';

import { BsPlus } from "react-icons/bs";

class StepsList extends React.Component {

  removeFromSteps(stepId) {
    this.props.removeFromSteps(stepId);
  }

  updateStep(updatedStepState) {
    this.props.updateStep(updatedStepState);
  }

  render() { 
    return (
      <div className="stepList">
        <div className="step-button-container">
          <BsPlus className="add-step"/>
        
        <div className="step-container">
          {this.props.steps.length > 0
              ? this.props.steps.map(step => (
                  <Step 
                    key={step.id} 
                    id={step.id}
                    title={step.title} 
                    checked={step.checked} 
                    priority={step.priority}
                    removeFromSteps={this.removeFromSteps.bind(this)} 
                    updateStep={this.updateStep.bind(this)}
                  />
              ))
              : <h4 className="no-steps">No steps for this Task</h4>
            }
        </div>
        </div>
      </div>
    );
  }
}

export default StepsList;