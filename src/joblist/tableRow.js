import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faComments } from '@fortawesome/free-solid-svg-icons'

export default function TableRow(props) {
  var didIApplied = function(application) {
    if (application === true) return (<FontAwesomeIcon icon={faCheck} color="green" title="Applied"></FontAwesomeIcon>);
    return (<FontAwesomeIcon icon={faBan} color="red" title="Not Applied"></FontAwesomeIcon>);
  }
  
  return (
    <tr onClick={props.onClick}>
      <td className="options-icons">
        {didIApplied(props.value.application)}
        <FontAwesomeIcon icon={faComments} color={(props.value.answer_receive)?'green':'red'} title="News received"></FontAwesomeIcon>
        <span>{props.value.meeting.length}</span>
      </td>
      <td>{props.value.company}</td>
      <td>{props.value.recruiters}</td>
      <td>{props.value.title}</td>
      <td>{props.value.date}</td>
    </tr>
  )
};