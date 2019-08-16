import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';

// components:
import TopNavBar from './header/navbar';
import JobListContainer from './joblist/container';

function App() {
  return (
    <div className="App">
      <TopNavBar></TopNavBar>
      <Router>
        <Route path='/joblist' component={JobListContainer} />
      </Router>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
