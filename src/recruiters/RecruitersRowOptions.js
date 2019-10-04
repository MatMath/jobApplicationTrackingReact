import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

import DeleteConfirmationBtn from '../utils/DeleteConfirmationBtn';
// Modify to Hook.
export default function RecruitersRowOptions (props) {
  const [item, setItem] = useState(props.item);
  
  const changeKey = (key, value) => {
    const tmp = {...item, [key]:value};
    if (props.onChange) { props.onChange(tmp); }
    setItem(tmp);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.clickSaveBtn(item);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group as={Row} controlId="cieName">
        <Form.Label column sm="2">Company Name: </Form.Label>
        <Col sm="10">
          <Form.Control 
            plaintext
            required
            value={item.cie}
            onChange={(e) => changeKey('cie', e.target.value)}
            />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="location">
        <Form.Label column sm="2"> Recruiter name: </Form.Label>
        <Col sm="10">
          <Form.Control
            plaintext
            required
            value={item.name}
            onChange={(e) => changeKey('name', e.target.value)}
            />
        </Col>
      </Form.Group>

      <Form.Group controlId="exampleForm.ControlTextarea">
        <Form.Label>Notes:</Form.Label>
        <Form.Control
          as="textarea"
          rows="4"
          value={item.notes}
          onChange={(e) => changeKey('notes', e.target.value)}/>
      </Form.Group>
      
      {(props.noaction)? "": <Row>
        <Col className="spread">
          <Button variant="outline-success" type="submit"> Save </Button>
          <DeleteConfirmationBtn data={item} label={item.name} type="recruiters" parentCloseHandler={props.removeIdFromList}></DeleteConfirmationBtn>
        </Col>
      </Row>}
    </Form>
  );
}