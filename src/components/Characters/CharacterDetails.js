import React, { useState, useEffect } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Divider, Chip } from '@material-ui/core';
import CharacterItemInfo from './CharacterItemInfo';

const useStyles = makeStyles(theme => ({
  root: {
    //marginTop: '64px'
  },
  // gridList: {
  //   minWidth: 500,
  //   minHeight: 500
  // },
  // card: {
  //   maxWidth: 345,
  //   margin: 5
  // },
  paper: {
    minHeight: 300,
    margin: '10px 10px 0px -30px;'
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export function CharacterDetails({ match, ...props }) {
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [characterItemData, setCharacterItemData] = useState({
    events: { items: [] }
  });
  useEffect(
    () => {
      const fetchCharItemData = async () => {
        const result = await fetchGetApi('/characters/' + match.params.charId);
        //console.log(result.data.results[0].events.items[0].name);
        setCharacterItemData(result.data.results[0]);
        setEvents(result.data.results[0].events.items);
      };
      fetchCharItemData();
    },
    [match.params.charId]
  );

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        alignContent="space-around"
      >
        <Grid item xs={6}>
          {characterItemData.id && (
            <CharacterItemInfo
              key={characterItemData.id}
              charItem={characterItemData}
            />
          )}
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Events related to {characterItemData.name}
            </Typography>
            <Divider />
            {events.map(item => (
              <Chip
                key={item.name}
                label={item.name}
                className={classes.chip}
              />
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
