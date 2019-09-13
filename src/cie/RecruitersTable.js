// Third party libs
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';

// local components
import RecruitersRowOptions from './RecruitersRowOptions';
import { Spinner, DisplayError } from '../utils';
import { getAPIData, postAPIData, updateAPIData } from '../apiEndpoint';
import { baseEmptyRecruiters } from "../utils/baseValue";

export default function RecruitersTable() {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);
  const [newItem, setNewItem] = useState({...baseEmptyRecruiters});
  const [showNew, setShowNew] = useState(false);

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

  const submitNew = (data) => {
    postAPIData('recruiters', data)
    .then((resp) => {
      setShowNew(false);
      setNewItem({...baseEmptyRecruiters});
      // Easy: Re-Fetch the Data full page ????
      // optimal: Get the ID back & insert to the list? 
    }).catch((err) => {
      console.log(err);
    });
    // if no ID it could be inside a NEW Job or added from the CIE page... Save & adjust the ID
  };

  const updateExisting = (data) => {
    updateAPIData('recruiters', data)
    .then(() => {
      setList(list.map(item => {
        if (item._id === data._id) return data
        return item;
      }))
    }).catch((err) => {
      console.log(err);
    });
  }

  const showData = (id) => {
    if(activeId === id) return setActiveId('');
    return setActiveId(id);
  }

  const renderDataRow = (item) => {
    if (item._id === activeId) {
      return (<tr key={item._id}><td colSpan='2'>
        <RecruitersRowOptions removeIdFromList={removeIdFromList} item={item} clickSaveBtn={updateExisting}></RecruitersRowOptions>
      </td></tr>);
    };
    return (
      <tr key={item._id} onClick={() => showData(item._id)}>
        <td>{item.cie}</td>
        <td>{item.name}</td>
      </tr>
    );
  }

  const removeIdFromList = (data) => {
    // Remove the Item only instead of forcing a full fetch+refresh.
    setList(list.filter((item => item._id !== data._id)));
  }

  if (fetching) return ( <Spinner></Spinner>);
  if(error) return (<DisplayError error={error}></DisplayError>);

  return (
    <div>
      <h1>LEN: {list.length}</h1> <Button onClick={() => setShowNew(!showNew)}>{(showNew)? 'Hide': 'Add new'}</Button>
      {(showNew)? <RecruitersRowOptions removeIdFromList={() => setShowNew(false)} item={newItem}  clickSaveBtn={submitNew}></RecruitersRowOptions>: ''}
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
