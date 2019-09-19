import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import DeleteConfirmationBtn from '../utils/DeleteConfirmationBtn';

export default class RecruitersRowOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickSaveBtn = props.clickSaveBtn;

    this.state = {
      item: props.item,
    };
  }

  changeKey(key, value) {
    const tmp = {...this.state.item, [key]:value};
    this.setState({'item': tmp});
  }
  handleSubmit(event) {
    event.preventDefault();
    this.clickSaveBtn(this.state.item);
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="cieName">
          <Form.Label column sm="2">Company Name: </Form.Label>
          <Col sm="10">
            <Form.Control 
              plaintext
              required
              value={this.state.item.cie}
              onChange={(e) => this.changeKey('cie', e.target.value)}
              />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="location">
          <Form.Label column sm="2"> Recruiter name: </Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              required
              value={this.state.item.name}
              onChange={(e) => this.changeKey('name', e.target.value)}
              />
          </Col>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea">
          <Form.Label>Notes:</Form.Label>
          <Form.Control
            as="textarea"
            rows="4"
            value={this.state.item.notes}
            onChange={(e) => this.changeKey('notes', e.target.value)}/>
        </Form.Group>
        
        {(this.props.noaction)? "": <Row>
          <Col className="spread">
            <Button variant="outline-success" type="submit"> Save </Button>
            <DeleteConfirmationBtn data={this.state.item} label={this.state.item.name} type="recruiters" parentCloseHandler={this.props.removeIdFromList}></DeleteConfirmationBtn>
          </Col>
        </Row>}
      </Form>
    )
  }
}