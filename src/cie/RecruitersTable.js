import React from 'react';
import { Table } from 'react-bootstrap';

export default class RecruitersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: mockRecruitersList,
      activeId: '',
    };
  }

  showData(id) {
    if(!id) return;
    if(this.state.activeId === id) return this.setState({'activeId': ''});
    return this.setState({'activeId':id});
  }

  renderDataRow (item) {
    if (item._id === this.state.activeId) {
      return (
        <tr onClick={() => this.showData(item._id)}>
          <td>SHOW EXTENDED VIEW</td>
        </tr>
      );
    };
    return (
      <tr key={item._id} onClick={() => this.showData(item._id)}>
        <td>{item.cie}</td>
        <td>{item.name}</td>
      </tr>
    );
  }

  render() {
    return (
    <div>
      <h1>Len: {this.state.list.length}</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <td>Company</td>
            <td>Agent</td>
          </tr>
        </thead>
        <tbody>
            {this.state.list.map(item => this.renderDataRow(item))}
        </tbody>
      </Table>
    </div>
    );
  }
}

const mockRecruitersList = [
  {"_id":"6ec2752","cie":"Reach Perso","name":"Kieran Hinphey","email":"mathieu.k.legault@gmail.com"},
  {"_id":"6ec2753","cie":"Gempool","name":"Sarah McGrath","email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31bdc","cie":"Software Placement","name":"Kenny Vaughan","email":"mathieu.k.legault@gmail.com","notes":"Good:\nSuper professional, Good english (no accent), Send most of the info by mail, and only call to confirm some stuff. \n\nStrange:\nLove to meet me in person. "}
];