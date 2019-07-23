import React, { useEffect, useState } from 'react';
import { fetchGetApi } from './api/apiUtils';
// import logo from './logo.svg';
import './App.css';
import AppToolbar from './components/common/AppToolbar';
import FirstComponent from './components/FirstComponent';
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
      console.log(result.data.results);
      setData(result.data.results);
    })();
  }
  function searchChar(event) {
    if (event.target.value.length >= 4) {
      searchApiByName(event.target.value);
    }
  }
  return (
    <div className="App">
      <AppToolbar searchCharacter={searchChar} />
      <FirstComponent data={data} />
    </div>
  );
}

export default App;
