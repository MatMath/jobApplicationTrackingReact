import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function CompanyRowOptions(props) {
  return (
    <tr>
      <td colSpan='2'>
        <Form>
          <Form.Group as={Row} controlId="cieName">
            <Form.Label column sm="2"> Company Name: </Form.Label>
            <Col sm="10">
              <Form.Control plaintext defaultValue={props.item.name}/>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="location">
            <Form.Label column sm="2"> Company Name: </Form.Label>
            <Col sm="10">
              <Form.Control plaintext defaultValue={props.item.location}/>
            </Col>
          </Form.Group>
          
          <Row>
            <Col sm="2">GPS Coordonate:</Col>
            <Col cm="10"><a href="http://www.gps-coordinates.net" target="blank">www.gps-coordinates.net</a></Col>
          </Row>

          <Form.Group as={Row} controlId="gps">
            <Form.Label column sm="2"> Latitude: </Form.Label>
            <Col sm="4">
              <Form.Control type="number" defaultValue={props.item.gps.geometry.coordinates[0]}/>
            </Col>
            
            <Form.Label column sm="2"> Longitude: </Form.Label>
            <Col sm="4">
              <Form.Control type="number" defaultValue={props.item.gps.geometry.coordinates[1]}/>
            </Col>
          </Form.Group>
        </Form>
          <Button variant="outline-success" type="submit"> Save </Button>
          <Button variant="outline-danger">Delete</Button>
      </td>
    </tr>
  )
}