import React, { Component } from 'react';
import { Glyphicon, Modal, Button } from 'react-bootstrap';
import user from '../../../models/User';
import fileDownload from 'react-file-download';
import CommentsView from './CommentsView';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isCommentsModalShowing': false,
    };
  }

  download(file) {
    user.download(file)
      .then(response => {
        fileDownload(
          response.data,
          file.filename
        );
      });
  }

  commentsModal() {
    return <Modal
      show={this.state.isCommentsModalShowing}
      onHide={() => {
        this.setState({
          'isCommentsModalShowing': false,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Comments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CommentsView
          file={this.props.file}
        />
      </Modal.Body>
    </Modal>;
  }


  render() {
    return (
      <tr key={this.props.index}>
        {this.commentsModal()}
        <td>{this.props.index}</td>
        <td>{this.props.file.filename}</td>
        <td>{new Date(this.props.file.uploadDate).toGMTString()}</td>
        <td style={{'textAlign': 'center'}}>
          <Button
            onClick={() => this.download(this.props.file)}
          >
            <Glyphicon glyph='download-alt'/>
          </Button>
          {' '}
          <Button
            onClick={() => {
              this.setState({
                'isCommentsModalShowing': true,
              });
            }}
          >
            <Glyphicon glyph='comment'/>
          </Button>
          {' '}
          <Button bsStyle='danger'>
            <Glyphicon glyph='remove'/>
          </Button>
        </td>
      </tr>
    );
  }
}

export default Main;
