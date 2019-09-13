// Third party libs
import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { baseEmptyCie } from '../utils/baseValue';

// Local components
import CompanyRowOptions from './CompanyRowOptions';
import { getAPIData, postAPIData, updateAPIData } from '../apiEndpoint';
import { Spinner, DisplayError } from '../utils';

export default function CieTable() {
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(undefined);
  const [newCie, setNewCie] = useState({...baseEmptyCie});
  const [showNewCie, setShowNewCie] = useState(false);

  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    getAPIData('cie').then((data) => {
      setList(data.sort((a,b) => a.name.localeCompare(b.name)));
      setFetching(false)
    })
    .catch(err => {
      setFetching(false);
      setError(err.code);
    });
  }, []);
  
  const submitNewCompany = (data) => {
    data.gps.properties.name = data.name; // TODO: fix in the BE.
    postAPIData('cie', data)
    .then((resp) => {
      setShowNewCie(false);
      setNewCie({...baseEmptyCie});
      // Easy: Re-Fetch the Data full page ????
      // optimal: Get the ID back & insert to the list? 
    }).catch((err) => {
      console.log(err);
    });
    // if no ID it could be inside a NEW Job or added from the CIE page... Save & adjust the ID
  };

  const updateExistingCie = (data) => {
    data.gps.properties.name = data.name; // TODO: fix in the BE.
    updateAPIData('cie', data)
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
      return (
        <tr key={item._id}><td colSpan='2'>
          <CompanyRowOptions removeIdFromList={removeIdFromList} item={item} clickSaveBtn={updateExistingCie}></CompanyRowOptions>
        </td></tr>
      );
    };
    return (
      <tr key={item._id}>
        <td onClick={() => showData(item._id)}>{item.name}</td>
        <td onClick={() => showData(item._id)}>{item.location}</td>
      </tr>
    );
  }

  const removeIdFromList = (id) => {
    // Send a API request to the BE
    // .Then() remove the Item only instead of forcing a full fetch+refresh.
    setList(list.filter((item => item._id !== id)));
  }

  if (fetching) return ( <Spinner></Spinner>);
  if (error) return (<DisplayError error={error}></DisplayError>);

  return (
    <div>
      <h1>LEN: {list.length}</h1> <Button onClick={() => setShowNewCie(!showNewCie)}>{(showNewCie)? 'Hide': 'Add new'}</Button>
      {(showNewCie)? <CompanyRowOptions removeIdFromList={removeIdFromList} item={newCie}  clickSaveBtn={submitNewCompany}></CompanyRowOptions>: ''}
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

