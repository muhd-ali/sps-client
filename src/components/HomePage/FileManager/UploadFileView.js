import React, { Component } from 'react';
import { Grid, FormGroup, ControlLabel, FormControl, Panel, Col, Row, Table, Button } from 'react-bootstrap';
import user from '../../../models/User';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'isUploadButtonDisabled': true,
      'files': null,
      'progress': 0,
    };
  }

  selectedFiles(files) {
    console.log(files);
    this.setState({
      'files': files,
      'isUploadButtonDisabled': false,
    });
  }

  upload() {
    user.uploadFiles(this.state.files, (e) => {
      const progress = e.loaded / e.total * 100;
      this.setState({
        'progress': progress,
      });
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <form>
            <Row>
              <Col sm={6}>
                <FormGroup
                  controlId='file'
                >
                  <ControlLabel>
                    Select File
                  </ControlLabel>
                  <br/>
                  <FormControl
                    type='file'
                    onChange={(e) => this.selectedFiles(e.target.files)}
                  >
                  </FormControl>
                </FormGroup>
              </Col>
              <Col sm={6}>
                {this.state.progress}%
              </Col>
            </Row>
            <br/>
            <Row>
              <Button
                bsStyle="primary"
                disabled={this.state.isUploadButtonDisabled}
                onClick={() => this.upload()}
              >
                Upload
              </Button>
            </Row>
          </form>
        </Grid>
      </div>
    );
  }
}

export default Main;
