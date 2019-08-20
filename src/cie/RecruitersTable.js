import React from 'react';

export default class RecruitersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: mockRecruitersList,
    };
  }
  render() {
    return (
    <div>
      <h1>Len: {this.state.list.length}</h1>
      Recruiters table here
    </div>
    );
  }
}

const mockRecruitersList = [
  {"_id":"6ec2752","cie":"Reach Perso","name":"Kieran Hinphey","email":"mathieu.k.legault@gmail.com"},
  {"_id":"6ec2753","cie":"Gempool","name":"Sarah McGrath","email":"mathieu.k.legault@gmail.com"},
  {"_id":"ce31bdc","cie":"Software Placement","name":"Kenny Vaughan","email":"mathieu.k.legault@gmail.com","notes":"Good:\nSuper professional, Good english (no accent), Send most of the info by mail, and only call to confirm some stuff. \n\nStrange:\nLove to meet me in person. "}
];