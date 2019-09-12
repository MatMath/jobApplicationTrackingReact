import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default class CompanyRowOptions extends React.Component {
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
  changeGps(index, value) {
    let tmp = {...this.state.item};
    tmp.gps.geometry.coordinates[index] = value;
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
        <Form.Label column sm="2"> Company Name: </Form.Label>
        <Col sm="10">
          <Form.Control 
            plaintext
            required
            value={this.state.item.name}
            onChange={(e) => this.changeKey('name', e.target.value)}
            />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="location">
        <Form.Label column sm="2"> Location: </Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={this.state.item.location}
            onChange={(e) => this.changeKey('location', e.target.value)}
            />
        </Col>
      </Form.Group>
      
      <Row>
        <Col sm="2">GPS Coordonate:</Col>
        <Col cm="10"><a href="http://www.gps-coordinates.net" target="_blank">www.gps-coordinates.net</a></Col>
      </Row>

      <Form.Group as={Row} controlId="gps">
        <Form.Label column sm="2"> Latitude: </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            value={this.state.item.gps.geometry.coordinates[0]}
            onChange={(e) => this.changeGps(0, e.target.value)}
            name="latitude"
            />
        </Col>
        
        <Form.Label column sm="2"> Longitude: </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            value={this.state.item.gps.geometry.coordinates[1]}
            onChange={(e) => this.changeGps(1, e.target.value)}
            name="longitude"
          />
        </Col>
      </Form.Group>
      {(this.props.noaction)? "": <Row>
        <Col className="spread">
          {/* Show Save only when not pristine? */}
          <Button variant="outline-success" type="submit"> Save </Button>
          {/* I no ID then dont display Delete Button??? */}
          <Button 
            variant="outline-danger"
            onClick={() => this.props.removeIdFromList(this.state.item._id)}>Delete
          </Button>
        </Col>
      </Row>}
    </Form>
  )
  }
}