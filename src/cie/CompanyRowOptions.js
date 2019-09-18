import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

// Local components
import DeleteConfirmationBtn from '../utils/DeleteConfirmationBtn';

export default function CompanyRowOptions (props) {
  const [item, setItem] = useState(props.item);

  const changeKey = (key, value) => {
    const tmp = {...item, [key]:value};
    
    if (props.onChange) { props.onChange(tmp); }
    setItem(tmp);
  }

  const changeGps = (index, value) => {
    let tmp = {...item};
    tmp.gps.geometry.coordinates[index] = value;
    if (props.onChange) { props.onChange(tmp); }
    setItem(tmp);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.clickSaveBtn(item);
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Form.Group as={Row} controlId="cieName">
        <Form.Label column sm="2"> Company Name: </Form.Label>
        <Col sm="10">
          <Form.Control 
            plaintext
            required
            value={item.name}
            onChange={(e) => changeKey('name', e.target.value)}
            />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="location">
        <Form.Label column sm="2"> Location: </Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={item.location}
            onChange={(e) => changeKey('location', e.target.value)}
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
            value={item.gps.geometry.coordinates[0]}
            onChange={(e) => changeGps(0, e.target.value)}
            name="latitude"
            />
        </Col>
        
        <Form.Label column sm="2"> Longitude: </Form.Label>
        <Col sm="4">
          <Form.Control
            type="number"
            value={item.gps.geometry.coordinates[1]}
            onChange={(e) => changeGps(1, e.target.value)}
            name="longitude"
          />
        </Col>
      </Form.Group>
      {(props.noaction)? "": <Row>
        <Col className="spread">
          {/* Show Save only when not pristine? */}
          <Button variant="outline-success" type="submit"> Save </Button>
          <DeleteConfirmationBtn data={item} type="cie" parentCloseHandler={props.removeIdFromList}></DeleteConfirmationBtn>
        </Col>
      </Row>}
    </Form>
  );
}