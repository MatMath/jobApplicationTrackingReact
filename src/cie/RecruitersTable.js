// Third party libs
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

// local components
import RecruitersRowOptions from './RecruitersRowOptions';
import { Spinner, DisplayError } from '../utils';
import { getAPIData } from '../apiEndpoint';

export default function RecruitersTable() {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);

  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    getAPIData('recruiters').then((data) => {
      setList(data.sort((a,b) => a.name.localeCompare(b.name)));
      setFetching(false)
    })
    .catch(err => {
      setFetching(false);
      setError(err.code);
    });
  }, []);

  const showData = (id) => {
    if(activeId === id) return setActiveId('');
    return setActiveId(id);
  }

  const renderDataRow = (item) => {
    if (item._id === activeId) {
      return (<tr key={item._id}><td colSpan='2'>
        <RecruitersRowOptions removeIdFromList={removeIdFromList} item={item}></RecruitersRowOptions>
      </td></tr>);
    };
    return (
      <tr key={item._id} onClick={() => showData(item._id)}>
        <td>{item.cie}</td>
        <td>{item.name}</td>
      </tr>
    );
  }

  const removeIdFromList = (id) => {
    // Send a API request to the BE
    // .Then() remove the Item only instead of forcing a full fetch+refresh.
    setList(list.filter((item => item._id !== id)));
  }

  if (fetching) return ( <Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);

  return (
    <div>
      <h1>Len: {list.length}</h1>
      <Table striped bordered hover>
        <thead onClick={() => showData('')}>
          <tr>
            <td>Company</td>
            <td>Agent</td>
          </tr>
        </thead>
        <tbody>
            {list.map(item => renderDataRow(item))}
        </tbody>
      </Table>
    </div>
  );
}
