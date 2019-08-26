import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class RecruitersRowOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      item: props.item,
    };
  }

  changeKey(key, value) {
    const tmp = {...this.state.item, [key]:value};
    this.setState({'item': tmp});
  }
  handleSubmit(event) {
    console.log(this.state.item);
    event.preventDefault();
    // TODO: Trigger a refresh Top level when done.
  }
  deleteCompany(id) {
    console.log('DELETING: ', id);
    // TODO: POP-UP Warning & Trigger a refresh Top level when done.
  }
  render() {
    return (
      <tr>
        <td colSpan='2'>
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
            
            <Row>
              <Col className="spread">
                <Button variant="outline-success" type="submit"> Save </Button>
                <Button 
                  variant="outline-danger"
                  onClick={() => this.deleteCompany(this.state.item._id)}>Delete
                </Button>
              </Col>
            </Row>
          </Form>
        </td>
      </tr>
    )
  }
}