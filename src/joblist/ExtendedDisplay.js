import React from 'react';

export default function ExtendedDisplay(props) {
  return (
    <tr onClick={props.onClick}>
      <td colSpan="5">Show something different with extra info</td>
    </tr>
  )
}