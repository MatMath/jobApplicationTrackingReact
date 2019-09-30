// Third party libs
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap';

// Local components
import CompanyRowOptions from './CompanyRowOptions';
import { Spinner, DisplayError } from '../utils';
import { getAPIData, postAPIData, updateAPIData } from '../apiEndpoint';
import { baseEmptyCie } from '../utils/baseValue';

// Redux
import { getCieList, updateCie, submitNew } from '../store/actions/companyActions';

function CieTable({error, fetching, list, getCieList, updateCie, submitNew}) {
  const [newItem, setNewItem] = useState({...baseEmptyCie});
  const [showNew, setShowNew] = useState(false);

  const setList = () => {console.log('Old SetList');} // TMP
  
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    getCieList();
  }, []);
  
  const showData = (id) => {
    if(activeId === id) return setActiveId('');
    return setActiveId(id);
  }
  
  const renderDataRow = (item) => {
    if (item._id === activeId) {
      return (
        <tr key={item._id}><td colSpan='2'>
          <CompanyRowOptions removeIdFromList={removeIdFromList} item={item} clickSaveBtn={updateCie}></CompanyRowOptions>
        </td></tr>
      );
    };
    return (
      <tr key={item._id} onClick={() => showData(item._id)}>
        <td>{item.name}</td>
        <td>{item.location}</td>
      </tr>
    );
  }
  const removeIdFromList = (data) => {
    // Remove the Item only instead of forcing a full fetch+refresh.
    setList(list.filter((item => item._id !== data._id)));
  }
  
  if (fetching) return ( <Spinner></Spinner>);
  if (error) return (<DisplayError error={error}></DisplayError>);
  
  return (
    <div>
      <h1>LEN: {list.length}</h1> <Button onClick={() => setShowNew(!showNew)}>{(showNew)? 'Hide': 'Add new'}</Button>
      {(showNew)? <CompanyRowOptions removeIdFromList={() => setShowNew(false)} item={newItem}  clickSaveBtn={submitNew}></CompanyRowOptions>: ''}
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

const mapStateToProps = (props) => ({
  list: props.cieList,
  fetching: props.utils.fetching,
  error: props.utils.error,
});

export default connect(
  mapStateToProps,
  {
    getCieList,
    updateCie,
    submitNew,
  }
)(CieTable)
