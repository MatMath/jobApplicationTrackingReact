import React, { useState, useEffect } from "react";

import { Table } from 'react-bootstrap';
import './jobList.css';

import { Spinner, DisplayError } from '../utils';

import { getJobList } from '../apiEndpoint';
import TableRow from './TableRow';
import ExtendedDisplay from './ExtendedDisplay';

export default function JobListContainer() {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);

  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState(1);
  const [orderBy, setOrderBy] = useState({name: '', direction: 1});
  const jobListCount = list.length;

  useEffect(() => {
    getJobList().then((data) => {
      setList(data);
      setFetching(false);
    }).catch(err => {
      setError(err.code);
      setFetching(false);
    });
  }, []);

  const renderDataRow = (item) => {
    if (item._id === activeId) return (
        <ExtendedDisplay
          removeIdFromList={removeIdFromList}
          key={item._id}
          value={item}
          onClick={() => showData(item._id)}>
        </ExtendedDisplay>
      );
    return (<TableRow key={item._id} value={item} onClick={() => showData(item._id)}></TableRow>);
  }

  const showData = (id) => {
    if(!id) return;
    if(activeId === id) return setActiveId(0);
    return setActiveId(id);
  }

  const orderListBy = (data, name) => {
    let order = 1;
    if (name === orderBy.name) {
      order = -orderBy.direction;
    }
    let tmp;
    switch (data) {
      case 'options':
        if (orderBy.name === 'options') return;
        // Set the answer received first.
        tmp = list.sort((a,b) => {
          if (a.answer_receive === b.answer_receive) return 0;
          if (a.answer_receive < b.answer_receive) return 1;
          return -1;
        });
        break;
      case 'date':
        tmp = list.sort((a,b) => {
          if (a.date === b.date) return 0;
          if (a.date < b.date) return 1*order;
          return -1 * order;
        });
        break;
      case 'key':
        // Set by super basic Alphanumeric sort.
        tmp = list.sort((a,b) => {
          if (!a[name]) { a[name] = ''};
          if (!b[name]) { b[name] = ''};
          return a[name].localeCompare(b[name]) *order;
        });
        break;
      default:
        break;
    }
    setList(tmp);
    return setOrderBy({'name': name, direction: order});
  }

  const removeIdFromList = (id) => {
    // Send a API request to the BE
    // .Then() remove the Item only instead of forcing a full fetch+refresh.
    setList(list.filter((item => item._id !== id)));
  }

  if (fetching) return ( <Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);
  return (
    <div className="container main-data">
      <h1> List Length - {jobListCount}</h1>
      <div>Filter By:</div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => orderListBy('options')}>Options</th>
            <th onClick={() => orderListBy('key', 'company')}>Cie</th>
            <th onClick={() => orderListBy('key', 'recruiters')}>Recruiters</th>
            <th onClick={() => orderListBy('key', 'title')}>Title</th>
            <th onClick={() => orderListBy('date')}>Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => renderDataRow(item))}
        </tbody>
      </Table>
    </div>
  )
}

