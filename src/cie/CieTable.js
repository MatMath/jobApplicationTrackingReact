// Third party libs
import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

// Local components
import CompanyRowOptions from './CompanyRowOptions';
import { getCieList } from '../apiEndpoint';
import { Spinner, DisplayError } from '../utils';

export default function CieTable() {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);

  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    getCieList().then((data) => {
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
      return (<CompanyRowOptions key={item._id} item={item}></CompanyRowOptions>);
    };
    return (
      <tr key={item._id}>
        <td onClick={() => showData(item._id)}>{item.name}</td>
        <td onClick={() => showData(item._id)}>{item.location}</td>
      </tr>
    );
  }
  
  if (fetching) return ( <Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);

  return (
    <div>
      <h1>LEN: {list.length}</h1>
      <Table striped bordered hover>
        <thead onClick={() => showData('')}>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => renderDataRow(item))}
        </tbody>
      </Table>
    </div>
  )
}

