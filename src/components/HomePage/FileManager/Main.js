import React, { Component } from 'react';
import { Grid, Modal, Well, Navbar, Panel, Col, Row, Button } from 'react-bootstrap';
import user from '../../../models/User';
import UploadFileView from './UploadFileView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isAddUserModalShowing': false,
    };
  }

  addButtonClicked() {
    this.setState({
      'isAddUserModalShowing': true,
    });
  }

  doneUploading() {
    this.setState({
      'isAddUserModalShowing': false,
    });
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.isAddUserModalShowing}
          onHide={() => {
            this.setState({
              'isAddUserModalShowing': false,
            });
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Add File
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UploadFileView
              onDone={() => this.doneUploading()}
            />
          </Modal.Body>
        </Modal>
        <Panel>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                Files
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form
                pullRight
              >
                <Button
                  onClick={() => this.addButtonClicked()}
                >
                  +
                </Button>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
          <Grid>
            <Row>
              <Col smOffset={4} sm={4}>
                <Well
                  style={{
                    'textAlign': 'center'
                  }}
                >
                  No Files to show.
                </Well>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
    );
  }
}

export default Main;
