import React, { Component } from 'react';
import './App.css';
import Form from "./Components/Form/Form.js"
import AddUser from "./Components/AddUser/AddUser";
class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <Form/> */}
          <AddUser/>
      </div> 
    );
  }
}

export default App;
