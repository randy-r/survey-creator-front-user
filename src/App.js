import React, { Component } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = { foos: [] }
    fetch('/api/foo').then(res => res.json()).then(foos => this.setState({foos})).catch(e => console.error(e))
    
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <DatePicker onChange={v => {}} />
        {this.state.foos.map(f => <h3>{f}</h3>)}
      </div>
    );
  }
}

export default App;
