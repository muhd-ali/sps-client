import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl, Alert } from 'react-bootstrap';
import user from '../../../models/User';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isSubmitDisabled': true,
      'name': user.info.name,
    };
  }

  getValidationState() {
    if (user.info.isNewUser) {
      return 'warning';
    }
    return null;
  }

  nameChangedTo(e) {
    const name = e.target.value;
    this.setState({
      'name': name,
      'isSubmitDisabled': false,
    });
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        {user.info.isNewUser &&
          <Alert bsStyle="warning">
            Welcome. Please set your <strong>name</strong>.
          </Alert>
        }
        <form>
          <FormGroup
            controlId='name'
            validationState={this.getValidationState()}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type='text'
              value={this.state.name}
              onChange={(e) => this.nameChangedTo(e)}
            >
            </FormControl>
          </FormGroup>
          <Button
            disabled={this.state.isSubmitDisabled}
            bsStyle="primary"
            type="submit"
          >
          Save
          </Button>
        </form>
      </div>
    );
  }
}

export default Main;
