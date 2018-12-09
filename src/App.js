import React, { Component } from 'react';
import Authenticate from './components/Authenticate';

class App extends Component {
  render() {
    return (
      <div className="main-wrap">
        <Authenticate />
      </div>
    );
  }
}

export default App;
