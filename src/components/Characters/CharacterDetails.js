import React, { useState, useEffect } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CharacterItem from './CharacterItem';

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
  const classes = useStyles();
  const [characterItemData, setCharacterItemData] = useState({});
  useEffect(() => {
    const fetchEventsData = async () => {
      const result = await fetchGetApi(
        `characters/${match.params.charId}/events`
      );
      setEvents(result.data.results);
    };
    const fetchCharItemData = async () => {
      const result = await fetchGetApi('/characters/' + match.params.charId);
      setCharacterItemData(result.data.results[0]);
    };
    fetchCharItemData().then(fetchEventsData());
  }, [match.params.charId]);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={10}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="space-around"
      >
        <Grid item xs={6}>
          {characterItemData.id && (
            <CharacterItem
              key={characterItemData.id}
              charItem={characterItemData}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          {/* <Paper className={classes.paper}>xs=6</Paper> */}
        </Grid>
      </Grid>
    </div>
  );
}
