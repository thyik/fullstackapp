import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = { serverResponse: "" };
  }

  callAPIServer() {
    fetch("http://localhost:7000/mypage")
    .then(res => res.text())
    .then(res => this.setState({ serverResponse: res }))
    .catch(err => err);
  }

  componentDidMount(){ // react lifecycle method componentDidMount()
      // will execute the callAPIServer() methods afteer the component mounts
    this.callAPIServer();
  }

  render(){
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to FintechSG React Course</h1>
          <h2 className="App-intro">{this.state.serverResponse}</h2>
        </header>
      </div>
    )
  }
}

export default App;