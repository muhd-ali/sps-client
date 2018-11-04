import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';
import user from '../../../models/User';
import DetailsView from './DetailsView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isDetailsModalShowing': false,
      'isDeleteDisabled': false,
    };
  }

  detailsModal() {
    return <Modal
      show={this.state.isDetailsModalShowing}
      onHide={() => {
        this.setState({
          'isDetailsModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {this.props.group.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DetailsView
          group={this.props.group}
        />
      </Modal.Body>
    </Modal>;
  }

  delete() {
    this.setState({
      'isDeleteDisabled': true,
    });
    user.deleteGroup(this.props.group)
      .then(() => this.props.triggerReset());
  }

  render() {
    return (
      <tr key={this.props.index}>
        {this.detailsModal()}
        <td>{this.props.index}</td>
        <td>{this.props.group.name}</td>
        <td>{new Date(this.props.group.createDate).toGMTString()}</td>
        <td style={{'textAlign': 'center'}}>
          <Button
            onClick={() => {
              this.setState({
                'isDetailsModalShowing': true,
              });
            }}
          >
            <Glyphicon glyph='open-file'/>
          </Button>
          {' '}
          <Button
            disabled={this.state.isDeleteDisabled}
            onClick={() => this.delete()}
            bsStyle='danger'
          >
            <Glyphicon glyph='remove'/>
          </Button>
        </td>
      </tr>
    );
  }
}

export default Main;
