import React from 'react';

import CieTable from './CieTable';

export default class CieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className='container main-data'>
      <CieTable></CieTable>
    </div>
    );
  }
}
