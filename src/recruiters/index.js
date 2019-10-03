// Third party libs
import React, { useEffect } from "react";
import { connect } from 'react-redux'
import { Table, Button } from 'react-bootstrap';

// Local components
import RecruitersRowOptions from './RecruitersRowOptions';
import { Spinner, DisplayError } from '../utils';

// Redux
import {
  getList,
  updateExisting,
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
  getList,
  updateExisting,
  submitNew,
  removeIdFromList,
  setShowNew,
  setActiveId,
}) {

  useEffect(() => { getList() }, []);
  
  const renderDataRow = (item) => {
    if (item._id === activeId) {
      return (
        <tr key={item._id}><td colSpan='2'>
          <RecruitersRowOptions removeIdFromList={() => removeIdFromList(item._id)} item={item} clickSaveBtn={updateExisting}></RecruitersRowOptions>
        </td></tr>
      );
    };
    return (
      <tr key={item._id} onClick={() => setActiveId(item._id)}>
        <td>{item.cie}</td>
        <td>{item.name}</td>
      </tr>
    );
  }
  
  if (fetching) return ( <Spinner></Spinner>);
  if (error) return (<DisplayError error={error}></DisplayError>);
  
  return (
    <div className='container main-data'>
      <h1>LEN: {list.length}</h1> <Button onClick={() => setShowNew(!showNew)}>{(showNew)? 'Hide': 'Add new'}</Button>
      {(showNew)? <RecruitersRowOptions removeIdFromList={() => setShowNew(false)} item={newItem}  clickSaveBtn={submitNew}></RecruitersRowOptions>: ''}
      <Table striped bordered hover>
        <thead onClick={() => setActiveId('')}>
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
  )
}

const mapStateToProps = (props) => ({
  list: props.recruitList.list,
  newItem: props.recruitList.newItem,
  showNew: props.recruitList.showNew,
  activeId: props.recruitList.activeId,
  fetching: props.utils.fetching,
  error: props.utils.error,
});

export default connect(
  mapStateToProps,
  {
    getList,
    updateExisting,
    submitNew,
    removeIdFromList,
    setShowNew,
    setActiveId,
  }
)(CieTable)
