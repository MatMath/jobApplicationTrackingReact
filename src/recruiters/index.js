import React from 'react';

import RecruitersTable from './RecruitersTable';

export default class CieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div className='container main-data'>
      <RecruitersTable></RecruitersTable>
    </div>
    );
  }
}
