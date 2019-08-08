import React from 'react';

export default function TableRow(props) {
  return (
    <tr onClick={props.onClick}>
      <td>{props.value._id}</td>
      <td>{props.value.company}</td>
      <td>{props.value.recruiters}</td>
      <td>{props.value.title}</td>
      <td>{props.value.date}</td>
    </tr>
  )
};