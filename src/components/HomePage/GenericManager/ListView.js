import React, { Component } from 'react';
import { Grid, Table, Well, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isItemsLoaded': false,
      'isLoadSuccessful': false,
      'items': null,
    };
    this.fetchItems();
  }

  reset() {
    this.setState({
      'isItemsLoaded': false,
      'isLoadSuccessful': false,
      'items': null,
    }, () => {
      this.fetchItems();
    });
  }

  fetchItems() {
    this.props.fetchItems()
      .then(items => {
        this.setState({
          'isItemsLoaded': true,
          'isLoadSuccessful': true,
          'items': items,
        });
      })
      .catch(err => {
        this.setState({
          'isItemsLoaded': true,
          'isLoadSuccessful': false,
        });
      });
  }

  message() {
    if (this.state.isItemsLoaded) {
      if (this.state.isLoadSuccessful) {
        if (!this.state.items.length > 0) {
          return <p>No Items to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Items... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  rowsFor(items) {
    const rows = [];
    for (let i=0; i<items.length; i++) {
      rows.push(
        this.props.rowFor(i, items[i])
      );
    }
    return rows;
  }

  viewForItems() {
    return <div
      style={{
        'overflowY': 'scroll',
        'maxHeight': '400px',
      }}
    >
      <Table striped bordered condensed hover>
        <thead>
          {this.props.itemsTableHeaderView}
        </thead>
        <tbody>
          { this.rowsFor(this.state.items) }
        </tbody>
      </Table>
    </div>;
  }

  view() {
    if (this.state.isItemsLoaded &&
      this.state.isLoadSuccessful &&
      this.state.items.length > 0) {
      return this.viewForItems();
    } else {
      return <Row>
        <Col smOffset={4} sm={4}>
          <Well
            style={{
              'textAlign': 'center'
            }}
          >
            {this.message()}
          </Well>
        </Col>
      </Row>;
    }
  }

  render() {
    return (
      <div>
        <Grid>
          { this.view() }
        </Grid>
      </div>
    );
  }
}

export default Main;
