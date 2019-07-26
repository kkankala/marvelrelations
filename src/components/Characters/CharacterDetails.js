import React, { useState, useEffect } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Typography,
  Divider,
  Chip,
  Button
} from '@material-ui/core';
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
    minHeight: 500, //this should change for screen sizes
    margin: '5px',
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'flex-start'
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  loadMore: {
    marginTop: 'auto'
  }
}));

export function CharacterDetails({ match, ...props }) {
  const [events, setEvents] = useState([]);
  const classes = useStyles();
  const [characterItemData, setCharacterItemData] = useState({
    events: { items: [] }
  });
  useEffect(() => {
    const fetchCharItemData = async () => {
      const result = await fetchGetApi('/characters/' + match.params.charId);
      //console.log(result.data.results[0].events.items[0].name);
      setCharacterItemData(result.data.results[0]);
      let availableEventsCount = result.data.results[0].events.available;
      if (availableEventsCount > result.data.results[0].events.items.length) {
      }
      setEvents(result.data.results[0].events.items);
    };
    fetchCharItemData();
  }, [match.params.charId]);

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
              {characterItemData.name} related Events
            </Typography>
            <Divider />
            <div>
              {events.map(item => (
                <Chip
                  key={item.name}
                  label={item.name}
                  className={classes.chip}
                />
              ))}
            </div>
            <Button className={classes.loadMore} color="secondary">
              Load More Events
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
