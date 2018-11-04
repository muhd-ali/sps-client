import React, { Component } from 'react';
import { Grid, Glyphicon, Modal, Well, Navbar, Panel, Col, Row, Button } from 'react-bootstrap';
import CreateGroupView from './CreateGroupView';
import GroupsListView from './GroupsListView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCreateGroupModalShowing': false,
    };
    this.fileListView = React.createRef();
  }

  addButtonClicked() {
    this.forceUpdate();
    this.setState({
      'isCreateGroupModalShowing': true,
    });
  }

  doneUploading() {
    this.setState({
      'isCreateGroupModalShowing': false,
    });
    this.fileListView.current.reset();
  }

  addFileModal() {
    return <Modal
      show={this.state.isCreateGroupModalShowing}
      onHide={() => {
        this.setState({
          'isCreateGroupModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Create Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CreateGroupView
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
                Groups
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
          <GroupsListView
            ref={this.fileListView}
          />
        </Panel>
      </div>
    );
  }
}

export default Main;
