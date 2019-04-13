import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    data: null
  }
  
  componentDidMount() {
    axios.get(`/test`)
      .then(res => {
        const data = res.data.msg;
        this.setState({data});
      })
      .catch(err => this.setState({data: err}))
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React {`${this.state.data}`}
            
          </a>
        </header>
      </div>
    );
  }
}

export default App;
