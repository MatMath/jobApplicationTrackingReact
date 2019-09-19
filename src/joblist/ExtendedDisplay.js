import React from 'react';
import { withRouter } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap';

// Local Component
import DeleteConfirmationBtn from '../utils/DeleteConfirmationBtn';


function ExtendedDisplay(props) {
  const editThis = (id) => {
    props.history.push(`/job/${id}`);
  };

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
            <Button variant="outline-info" onClick={() => editThis(props.value._id)}>Edit</Button>
            <DeleteConfirmationBtn data={props.value} label={props.value.company} type="jobList" parentCloseHandler={props.removeIdFromList}></DeleteConfirmationBtn>
          </Col>
        </Row>
      </td>
    </tr>
  )
}
export default withRouter(ExtendedDisplay);