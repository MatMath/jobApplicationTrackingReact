import React from 'react';

import RecruitersTable from './RecruitersTable';
import CieTable from './CieTable';

export default class CieContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
    <div>
      <CieTable></CieTable>
      <RecruitersTable></RecruitersTable>
    </div>
    );
  }
}