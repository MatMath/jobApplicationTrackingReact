import React from 'react';

export default class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'bob'
    };
    console.log(props);
    
  }
  render() {
    return (
      <tr>
        <td>{this.props.value._id}</td>
        <td>{this.props.value.company}</td>
        <td>{this.props.value.recruiters}</td>
        <td>{this.props.value.title}</td>
        <td>{this.props.value.date}</td>
      </tr>
    )
  }
}