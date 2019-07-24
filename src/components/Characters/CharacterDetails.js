import React, { useState, useEffect } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '64px'
  },
  gridList: {
    minWidth: 500,
    minHeight: 500
  },
  card: {
    maxWidth: 345,
    margin: 5
  },
  cardActions: {
    justifyContent: 'flex-end'
  }
}));

export function CharacterDetails({ match, ...props }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGetApi(
        `characters/${match.params.charId}/events`
      );
      debugger;
      console.log(result.data.results);
      setEvents(result.data.results);
    };
    fetchData();
  }, [match.params.charId]);

  return <div>Hii</div>;
}
