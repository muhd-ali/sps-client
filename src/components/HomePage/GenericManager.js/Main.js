import React, { Component } from 'react';
import { Grid, Glyphicon, Modal, Well, Navbar, Panel, Col, Row, Button } from 'react-bootstrap';
import UploadFileView from './UploadFileView';
import FilesListView from './FilesListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isFileModalShowing': false,
    };
    this.fileListView = React.createRef();
  }

  addButtonClicked() {
    this.forceUpdate();
    this.setState({
      'isFileModalShowing': true,
    });
  }

  doneUploading() {
    this.setState({
      'isFileModalShowing': false,
    });
    this.fileListView.current.getWrappedInstance().reset();
  }

  addFileModal() {
    return <Modal
      show={this.state.isFileModalShowing}
      onHide={() => {
        this.setState({
          'isFileModalShowing': false,
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
                    this.fileListView.current.getWrappedInstance().reset();
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
