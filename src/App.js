import React from 'react'
import './App.css'
import Search from './components/search'
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from "react-bootstrap/Jumbotron";

class App extends React.Component {

  render() {
    return (
        <Jumbotron>
          <Search/>
        </Jumbotron>
    );
  }

}

export default App;
