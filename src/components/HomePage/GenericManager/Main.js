import React, { Component } from 'react';
import { Glyphicon, Modal, Navbar, Panel, Button } from 'react-bootstrap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isAddModalShowing': false,
    };
    this.listView = React.createRef();
  }

  addButtonClicked() {
    this.forceUpdate();
    this.setState({
      'isAddModalShowing': true,
    });
  }

  doneAdding() {
    this.setState({
      'isAddModalShowing': false,
    });
    this.reloadData();
  }

  reloadData() {
    const component = this.listView.current;
    const name = component.constructor.name;
    console.log('Component:', component);
    console.log('Name:', name);
    if (name === 'Connect') {
      component.getWrappedInstance().reset();
    } else {
      component.reset();
    }
  }

  addModal() {
    const AddView = this.props.addView;
    return <Modal
      show={this.state.isAddModalShowing}
      onHide={() => {
        this.setState({
          'isAddModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {this.props.addViewTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddView
          onAdd={() => this.doneAdding()}
        />
      </Modal.Body>
    </Modal>;
  }

  render() {
    const ListView = this.props.listView;
    return (
      <div>
        { this.addModal() }
        <Panel>
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                {this.props.title}
              </Navbar.Brand>
              <Navbar.Toggle/>
            </Navbar.Header>
            <Navbar.Collapse>
              <Navbar.Form
                pullRight
              >
                <Button
                  onClick={() => {
                    this.reloadData();
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
          <ListView
            ref={this.listView}
          />
        </Panel>
      </div>
    );
  }
}

export default Main;
