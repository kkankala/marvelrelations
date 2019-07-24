import React, { useEffect, useState } from 'react';
import { fetchGetApi } from './api/apiUtils';
// import logo from './logo.svg';
import './App.css';
import AppToolbar from './components/common/AppToolbar';
import CharactersList from './components/Characters/CharactersList';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CharacterDetails } from './components/Characters/CharacterDetails';

//TODO: Implement this routing thingy.... https://reacttraining.com/react-router/web/example/auth-workflow

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGetApi('characters?limit=100');
      setData(result.data.results);
    };
    fetchData();
  }, []);

  function searchApiByName(value) {
    (async () => {
      const result = await fetchGetApi(
        'characters?nameStartsWith=' + value + '&limit=100'
      );
      //nameStartsWith=loki&
      setData(result.data.results);
    })();
  }
  function searchChar(event) {
    if (event.target.value.length >= 4) {
      searchApiByName(event.target.value);
    }
  }
  return (
    <Router>
      <div className="App">
        <AppToolbar searchCharacter={searchChar} />
        <Route
          exact
          path="/"
          render={routerProps => (
            <CharactersList {...routerProps} characters={data} />
          )}
        />
        <Route path="/Character/:charId" component={CharacterDetails} />
      </div>
    </Router>
  );
}

export default App;
