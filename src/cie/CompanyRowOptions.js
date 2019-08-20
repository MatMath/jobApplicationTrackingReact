import React from 'react';
import { Button } from 'react-bootstrap';
import { platform } from 'os';

export default function CompanyRowOptions(props) {
  return (
    <td>
      <div onClick={props.onClick}>{props.location}</div>
      <div>
        <Button variant="outline-info">Edit</Button>
        <Button variant="outline-danger">Delete</Button>
      </div>
    </td>
  )
}