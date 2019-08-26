import React from 'react';
import { Table } from 'react-bootstrap';

import CompanyRowOptions from './CompanyRowOptions';

export default class CieTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: mockCieList.sort((a,b) => a.name.localeCompare(b.name)),
      activeId: '',
    }
  }

  showData(id) {
    if(this.state.activeId === id) return this.setState({'activeId': ''});
    return this.setState({'activeId':id});
  }

  renderDataRow(item) {
    if (item._id === this.state.activeId) {
      return (<CompanyRowOptions key={item._id} item={item}></CompanyRowOptions>);
    };
    return (
      <tr key={item._id}>
        <td onClick={() => this.showData(item._id)}>{item.name}</td>
        <td onClick={() => this.showData(item._id)}>{item.location}</td>
      </tr>
    );
  }

  render() {
    return (
      <div>
        <h1>LEN: {this.state.list.length}</h1>
        <Table striped bordered hover>
          <thead onClick={() => this.showData('')}>
            <tr>
              <th>Name</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map(item => this.renderDataRow(item))}
          </tbody>
        </Table>
        <p>This is the Company table to display</p>
      </div>
    )
  }
}

const mockCieList = [
  {"_id":"3d78344","name":"Equifax","location":"Blood Stoney Rd, Grand Canal Dock, Dublin, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.34494249999999,-6.236052400000062]},"properties":{"name":"Equifax"}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"3d78345","name":"Future finance","location":"Dublin, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3461064,-6.256503699999939]},"properties":{"name":"Future finance"}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31bda","name":"TwoTenHealth","location":" Grand Canal Dock, Dublin 2, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[52.5230063,13.410008699999935]},"properties":{"name":"TwoTenHealth"}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31bdd","name":"SoftwareDesign","location":"Digital Court, Rainsford St, Ushers, Dublin 8, D08 R2YP, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3421514,-6.282675799999993]},"properties":{"name":"SoftwareDesign"}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31bdf","name":"HMH","location":"Trinity Central, 152-160 Pearse St, Dublin 2, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3433758,-6.247317399999929]},"properties":{"name":"HMH"}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31be4","name":"NA","location":"NA","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[0,0]},"properties":{}},"email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31be6","name":"Accenture","location":"3, Grand Canal Plaza, Grand Canal Street Upper, Grand Canal Dock, Dublin 4, D04 EE70, Ireland","gps":{"type":"Feature","geometry":{"type":"Point","coordinates":[53.3394414,-6.238942599999973]},"properties":{"name":"Accenture"}},"email":"mathieu.k.legault@gmail.com"}
];