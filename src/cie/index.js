// Third party libs
import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap';

// Local components
import CompanyRowOptions from './CompanyRowOptions';
import { Spinner, DisplayError } from '../utils';

// Redux
import {
  getCieList,
  updateCie,
  submitNew,
  removeIdFromList,
  setShowNew,
  setActiveId,
} from './actions';

function CieTable({
  error,
  fetching,
  list,
  newItem,
  showNew,
  activeId,

  // Functions
  getCieList,
  updateCie,
  submitNew,
  removeIdFromList,
  setShowNew,
  setActiveId,
}) {

  useEffect(() => { getCieList() }, []);
  
  const renderDataRow = (item) => {
    if (item._id === activeId) {
      return (
        <tr key={item._id}><td colSpan='2'>
          <CompanyRowOptions removeIdFromList={() => removeIdFromList(item._id)} item={item} clickSaveBtn={updateCie}></CompanyRowOptions>
        </td></tr>
      );
    };
    return (
      <tr key={item._id} onClick={() => setActiveId(item._id)}>
        <td>{item.name}</td>
        <td>{item.location}</td>
      </tr>
    );
  }
  
  if (fetching) return ( <Spinner></Spinner>);
  if (error) return (<DisplayError error={error}></DisplayError>);
  
  return (
    <div className='container main-data'>
      <h1>LEN: {list.length}</h1> <Button onClick={() => setShowNew(!showNew)}>{(showNew)? 'Hide': 'Add new'}</Button>
      {(showNew)? <CompanyRowOptions removeIdFromList={() => setShowNew(false)} item={newItem}  clickSaveBtn={submitNew}></CompanyRowOptions>: ''}
      <Table striped bordered hover>
        <thead onClick={() => setActiveId('')}>
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

const mapStateToProps = (props) => ({
  list: props.cieList.list,
  newItem: props.cieList.newItem,
  showNew: props.cieList.showNew,
  activeId: props.cieList.activeId,
  fetching: props.utils.fetching,
  error: props.utils.error,
});

export default connect(
  mapStateToProps,
  {
    getCieList,
    updateCie,
    submitNew,
    removeIdFromList,
    setShowNew,
    setActiveId,
  }
)(CieTable)
