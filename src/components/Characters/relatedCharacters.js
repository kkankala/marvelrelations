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

const useStyles = makeStyles(theme => ({
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

export function RelatedCharacters({ match, ...props }) {
  const [relatedChars, setRelatedChars] = useState([]);
  const [availableEventsCount, setAvailableEventsCount] = useState(0);
  const classes = useStyles();
  //TODO: Take events state level up, as events are loaded, pull involved distinct characters and pass them to Relatedcharacters
}
