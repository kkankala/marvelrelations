import React from 'react';

// import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import AppToolbar from './components/common/AppToolbar';
import FirstComponent from './components/FirstComponent';
function App() {
  return (
    <div className="App">
      <AppToolbar>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </AppToolbar>
      <FirstComponent />
    </div>
  );
}

export default App;
