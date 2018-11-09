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
        <td>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '10rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
              {this.props.group.name}
            </div>
          </div>
        </td>
        <td>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '8rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
              {
                new Date(this.props.group.createDate).toGMTString()
              }
            </div>
          </div>
        </td>
        <td style={{'textAlign': 'center'}}>
          <div
            style={{
              'overflowX': 'scroll',
              'width': '13rem',
            }}
          >
            <div
              style={{
                'width': 'auto',
                'whiteSpace':'nowrap',
              }}
            >
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
              {user.info.email_address === this.props.group.owner &&
                <Button
                  disabled={this.state.isDeleteDisabled}
                  onClick={() => this.delete()}
                  bsStyle='danger'
                >
                  <Glyphicon glyph='remove'/>
                </Button>
              }
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default Main;
