import React, { Component } from 'react';
import './App.css';
import Form from "./Components/Form/Form.js"
import MainPage from "./Components/MainPage/MainPage";
class App extends Component {
  render() {
    return (
      <div className="App">
          <MainPage/>
      </div> 
    );
  }
}

export default App;
