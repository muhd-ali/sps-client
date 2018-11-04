import React, { Component } from 'react';
import { FormGroup, ListGroupItem, ListGroup, ControlLabel, FormControl, Button, Well, Col, Row } from 'react-bootstrap';
import user from '../../../models/User';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from '../../TextField';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCommentssLoaded': false,
      'isLoadSuccessfully': false,
      'comments': null,
    };
    this.fetchComments();
  }
  reset() {
    this.setState({
      'isCommentssLoaded': false,
      'isLoadSuccessfully': false,
      'comments': null,
    }, () => {
      this.fetchComments();
    });
  }

  fetchComments() {
    user.getCommentsFor(this.props.file)
      .then(comments => {
        this.setState({
          'isCommentssLoaded': true,
          'isLoadSuccessfully': true,
          'comments': comments,
        });
      })
      .catch(err => {
        this.setState({
          'isCommentssLoaded': true,
          'isLoadSuccessfully': false,
        });
      });
  }

  message() {
    if (this.state.isCommentssLoaded) {
      if (this.state.isLoadSuccessfully) {
        if (!this.state.comments.length > 0) {
          return <p>No Comments to show.</p>;
        }
      } else {
        return <p>Something went wrong. Please try Again.</p>;
      }
    } else {
      return <div>
        <p>Loading Comments... <FontAwesomeIcon icon='spinner' spin/></p>
      </div>;
    }
  }

  viewFor(index, comment) {
    return <ListGroupItem
      key={index}
      header={comment.user.name}
    >
      {comment.text}
    </ListGroupItem>
  }

  viewForComments() {
    const list = [];
    const comments = this.state.comments;
    for (let i=0; i<comments.length; i++) {
      list.push(
        this.viewFor(i, comments[i])
      );
    }
    return <ListGroup>
      { list }
    </ListGroup>;
  }

  view() {
    if (this.state.isCommentssLoaded &&
      this.state.isLoadSuccessfully &&
      this.state.comments.length > 0) {
      return this.viewForComments();
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

  form() {
    return <TextField
      controlId={'comment_'+this.props.file._id}
      label='Comment'
      value={''}
      enterPressedWith={() => this.updateData()}
    >

    </TextField
  >
  }

  render() {
    return (
      <div>
        { this.view() }
        <hr/>
        { this.form() }
      </div>
    );
  }
}

export default Main;
