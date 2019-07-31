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
    minHeight: 500, //TODO:this should change for screen sizes
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
  const [availableEventsCount, setAvailableEventsCount] = useState(0);
  const classes = useStyles();
  const [characterItemData, setCharacterItemData] = useState({
    events: { items: [] }
  });
  useEffect(() => {
    const fetchCharItemData = async () => {
      const result = await fetchGetApi('characters/' + match.params.charId);
      setCharacterItemData(result.data.results[0]);
      setAvailableEventsCount(result.data.results[0].events.available);
      var modifiedEvents = result.data.results[0].events.items.map(item => {
        var newItem = {};
        newItem.title = item.name;
        newItem.resourceURI = item.resourceURI;
        return newItem;
      });
      setEvents(modifiedEvents);
    };
    fetchCharItemData();
  }, [match.params.charId]);

  async function loadMoreEvents() {
    if (events.length < availableEventsCount) {
      let currentLimit =
        availableEventsCount - events.length > 100
          ? 100
          : availableEventsCount - events.length;
      const eventsResponse = await fetchGetApi(
        'characters/' +
          match.params.charId +
          '/events?offset=' +
          events.length +
          '&limit=' +
          currentLimit
      );
      setEvents(previousEvents => [
        ...previousEvents,
        ...eventsResponse.data.results
      ]);
    }
  }
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
                  key={item.resourceURI}
                  label={item.title}
                  className={classes.chip}
                />
              ))}
            </div>
            <Button
              className={classes.loadMore}
              color="secondary"
              onClick={() => loadMoreEvents()}
              disabled={events.length >= availableEventsCount}
            >
              Load More Events
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
