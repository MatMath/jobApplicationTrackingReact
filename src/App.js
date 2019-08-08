import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

// components:
import TopNavBar from './header/navbar';
import JobListContainer from './joblist/container';

function App() {
  return (
    <div className="App">
      <TopNavBar></TopNavBar>
      <JobListContainer></JobListContainer>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
