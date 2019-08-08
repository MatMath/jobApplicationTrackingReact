import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';

export default function ExtendedDisplay(props) {
  return (
    <tr>
      <td colSpan="5">
        <Row onClick={props.onClick}>
          <Col><span>Company:</span> {props.value.company}</Col>
          <Col><span>Recruiters:</span> {props.value.recruiters}</Col>
        </Row>
        <Row onClick={props.onClick}>
          <Col><span>Title:</span> {props.value.title}</Col>
          <Col><span>Date:</span> {props.value.date}</Col>
        </Row>
        <Row>
          <Col className="spread">
            <Button variant="outline-info">Edit</Button>
            <Button variant="outline-danger">Delete</Button>
          </Col>
        </Row>
      </td>
    </tr>
  )
}
