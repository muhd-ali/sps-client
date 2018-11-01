import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Glyphicon, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { callCallbackIfExistsInObject } from './../global/utilities';
class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isClearTextButtonShowing': false,
    };
  }

  clearTextFieldText() {
    const textField = ReactDOM.findDOMNode(this.textFieldRef.current);
    textField.value = '';
    textField.focus();
    this.setState({
      'isClearTextButtonShowing': false,
    });
    callCallbackIfExistsInObject(
      'onClear',
      this.props,
    );
  }

  textFieldTextChanged(e) {
    const text = e.target.value;
    if (text !== '') {
      this.setState({
        'isClearTextButtonShowing': true,
      });
    } else {
      this.setState({
        'isClearTextButtonShowing': false,
      });
    }
    callCallbackIfExistsInObject(
      'valueChangedTo',
      this.props,
      text
    );
  }

  textFieldKeyPressed(e) {
    const text = e.target.value;
    if (text !== '') {
      if(e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        e.target.blur();
        callCallbackIfExistsInObject(
          'enterPressedWith',
          this.props,
          text
        );

      }
    }
  }

  render() {
    this.textFieldFormRef = React.createRef();
    this.textFieldRef = React.createRef();
    return (
      <div>
        <FormGroup
          controlId={this.props.controlId}
          validationState={this.props.validationState}
          ref={this.textFieldFormRef}
          className="has-feedback"
          onKeyDown={
            e =>
              this.textFieldKeyPressed(e)
          }
        >
          <ControlLabel>{this.props.label}</ControlLabel>
          <FormControl
            onChange={
              e =>
                this.textFieldTextChanged(e)
            }
            label='hello'
            value={this.props.value}
            ref={this.textFieldRef}
            type="text"
            placeholder={this.props.placeholder}
          />
          {this.state.isClearTextButtonShowing &&
            <Glyphicon
              onClick={
                () =>
                  this.clearTextFieldText()
              }
              className="form-control-feedback"
              glyph="remove-circle"
              style={
                {
                  'cursor': 'pointer',
                  'zIndex': '10',
                  'pointerEvents': 'auto'
                }
              }
            />
          }
        </FormGroup>
      </div>
    );
  }
}

export default TextField;
