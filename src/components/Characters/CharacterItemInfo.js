import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Collapse
} from '@material-ui/core';

import IconLink from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
  card: {
    // minWidth: 500,
    maxWidth: 800,
    // minHeight: 500,
    // maxHeight: 650,
    margin: 5
  },
  cardActions: {
    justifyContent: 'flex-end'
  },
  //media: {
  // height: 0,
  // paddingTop: '56.25%' // 16:9
  //},
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

export default function CharacterItemInfo({ charItem, ...props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  function handleExpandClick() {
    setExpanded(!expanded);
  }
  return (
    charItem && (
      <Card className={classes.card} key={charItem.id}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={charItem.name}
            image={charItem.thumbnail.path + '.' + charItem.thumbnail.extension}
            title={charItem.name}
            className={classes.media}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {charItem.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {charItem.comics.available} Comics, {charItem.series.available}{' '}
              Series and {charItem.stories.available} Stories
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <IconButton
            aria-label="Upload picture"
            component="a"
            target="_blank"
            href={charItem.urls[0].url}
          >
            <IconLink />
          </IconButton>
          {charItem.description.length > 0 && (
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          )}
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description</Typography>
            <Typography paragraph>{charItem.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    )
  );
}
