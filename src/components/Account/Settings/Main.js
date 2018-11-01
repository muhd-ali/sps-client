import React, { Component } from 'react';
import { Grid, Row, Col, Button, Alert } from 'react-bootstrap';
import user from '../../../models/User';
import { AlertList } from 'react-bs-notifier';
import alertsStateManager from '../../../models/stores/Alerts';
import { connect } from 'react-redux';
import TextField from '../../TextField';

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

  nameChangedTo(name) {
    this.setState({
      'name': name,
      'isSubmitDisabled': false,
    });
  }

  updateDataAtServer(data) {
    return new Promise((resolve, reject) => {
      user.updateDataTo(data)
        .then((message) => {
          this.props.addAlert({
            'message': message,
            'type': 'success',
            'headline': 'Changes Saved!'
          });
          resolve();
        })
        .catch((error) => {
          this.props.addAlert({
            'message': error,
            'type': 'danger',
            'headline': 'Try Again!'
          });
          reject();
        });
    });
  }

  getFormData() {
    return {
      'name': this.state.name,
    };
  }

  updateData() {
    if (this.state.isSubmitDisabled) {
      return;
    }
    this.updateDataAtServer(this.getFormData())
      .then(() => {
        this.setState({
          'isSubmitDisabled': true,
        });
      });
  }

  render() {
    return (
      <div>
        <AlertList
          position='top-right'
          timeout={2000}
          onDismiss={(a) => this.props.removeAlert(a)}
          alerts={this.props.alerts}
        >
        </AlertList>
        {user.info.isNewUser &&
          <Alert bsStyle="warning">
            Welcome. Please set your <strong>name</strong>.
          </Alert>
        }
        <Grid>
          <h1>Settings</h1>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <form>
            <Row>
              <Col sm={6}>
                <TextField
                  controlId='name'
                  label='Name'
                  value={this.state.name}
                  validationState={this.getValidationState()}
                  valueChangedTo={(text) => this.nameChangedTo(text)}
                  onClear={() => this.nameChangedTo('')}
                  enterPressedWith={() => this.updateData()}
                />
              </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Row>
              <Col sm={6}>
                <Button
                  disabled={this.state.isSubmitDisabled}
                  bsStyle="primary"
                  onClick={() => this.updateData()}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}

export default connect(
  alertsStateManager.mapStateToProps(),
  alertsStateManager.mapDispatchToProps()
)(Main);