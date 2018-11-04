import React, { Component } from 'react';
import { Grid, Glyphicon, Modal, Well, Navbar, Panel, Col, Row, Button } from 'react-bootstrap';
import UploadFileView from './UploadFileView';
import FilesListView from './FilesListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isAddUserModalShowing': false,
    };
    this.fileListView = React.createRef();
  }

  addButtonClicked() {
    this.forceUpdate();
    this.setState({
      'isAddUserModalShowing': true,
    });
  }

  doneUploading() {
    this.setState({
      'isAddUserModalShowing': false,
    });
    this.fileListView.current.reset();
  }

  addFileModal() {
    return <Modal
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
    </Modal>;
  }

  render() {
    return (
      <div>
        { this.addFileModal() }
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
                  onClick={() => {
                    this.fileListView.current.reset();
                  }}
                >
                  <Glyphicon glyph="refresh"/>
                </Button>
                {' '}
                <Button
                  bsStyle='info'
                  onClick={() => this.addButtonClicked()}
                >
                  <Glyphicon glyph="plus"/>
                </Button>
              </Navbar.Form>
            </Navbar.Collapse>
          </Navbar>
          <FilesListView
            ref={this.fileListView}
          />
        </Panel>
      </div>
    );
  }
}

export default Main;
