import React from 'react';
import { Form, Row, Col, Badge, Button } from 'react-bootstrap';

export default function MeetingListInfo(props) {

  return (
    <div>
      <Form.Group as={Row}>
        <Form.Label column sm="2">Date</Form.Label>
        <Col sm="4">
          <Form.Control
            plaintext
            type="date"
            required
            value={props.data.date}
            name="date"
            onChange={props.updateMeeting}
          />
        </Col>
        <Form.Label column sm="2">Purpose:</Form.Label>
        <Col sm="4">
          <Form.Control
            plaintext
            required
            defaultValue={props.data.purpose}
            name="purpose"
            onChange={props.updateMeeting}
          />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="2">Participant</Form.Label>
          <Col sm="2">
            <Form.Control
              plaintext
              required
              defaultValue={props.data.newname}
              name="newname"
              onBlur={props.updateMeeting}
            />
          </Col>
          <Col sm="8">
            {props.data.participants.map(name => (<Button key={name} variant="outline-primary">{name} 
              <Badge name={name} onClick={() => props.removeParticipant(name)} variant="light"> X </Badge>
            </Button>))}
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Challenge</Form.Label>
          <Col sm="10">
            <Form.Control
              plaintext
              required
              defaultValue={props.data.challenge}
              name="challenge"
              onChange={props.updateMeeting}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm="2">Notes</Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              rows="4"
              defaultValue={props.data.notes}
              name="notes"
              onChange={props.updateMeeting}
            />
          </Col>
        </Form.Group>
        <hr />
    </div>
  );
}