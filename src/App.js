import React from 'react';
// import logo from './logo.svg';
import './App.css';
import AppToolbar from './components/common/AppToolbar';
import CharactersList from './components/Characters/CharactersList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CharacterDetails } from './components/Characters/CharacterDetails';

//TODO: Implement this routing thingy.... https://reacttraining.com/react-router/web/example/auth-workflow

function App(props) {
  return (
    <Router>
      <div className="App">
        <AppToolbar />
        <Route exact path="/" component={CharactersList} />
        <Route path="/Character/:charId" component={CharacterDetails} />
      </div>
    </Router>
  );
}

export default App;
