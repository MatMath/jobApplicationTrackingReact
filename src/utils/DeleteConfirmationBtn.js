// Third party libs
import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

import { deleteAPIData } from '../apiEndpoint';

export default function DeleteConfirmationBtn(props) {
  const [show, setShow] = useState(false);
  
  const handleShow = () => {
    if (!props.data._id) return props.parentCloseHandler(props.data); // Nothing to delete
    setShow(true);
  }
  const handleClose = (result) => {
    setShow(false);
    if (result === true) {
      deleteAPIData(props.type, props.data._id)
      .then(() => {
        props.parentCloseHandler(props.data);
      });
    }
  };

  return (
    <>
      <Button 
        variant="outline-danger"
        onClick={handleShow}>Delete
      </Button>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete: <i>{props.data.name}</i>? <strong>It is Irreversible</strong></Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleClose(false)}> Cancel </Button>
          <Button variant="danger" onClick={() => handleClose(true)}> Yes Delete </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}