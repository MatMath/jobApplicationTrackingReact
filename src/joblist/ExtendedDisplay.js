import React from 'react';

import { Row, Col, Button } from 'react-bootstrap';

export default function ExtendedDisplay(props) {
  return (
    <tr className="extended-display">
      <td colSpan="5">
        <div onClick={props.onClick}>
          <Row>
            <Col className="label-value"><span className="label-type">Company :</span>{props.value.company}</Col>
            <Col className="label-value"><span className="label-type">Recruiters :</span> {props.value.recruiters}</Col>
          </Row>
          <Row>
            <Col className="label-value"><span className="label-type">Title :</span> {props.value.title}</Col>
            <Col className="label-value"><span className="label-type">Date :</span> {props.value.date}</Col>
          </Row>
          <Row>
            <Col className="label-value">{props.value.location}</Col>
          </Row>
        </div>
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
