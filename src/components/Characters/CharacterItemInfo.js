import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  IconButton
} from '@material-ui/core';

import IconLink from '@material-ui/icons/Link';

import React from 'react';

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 345,
    margin: 5
  },
  cardActions: {
    // justifyContent: 'flex-end'
  }
}));

export default function CharacterItem({ charItem, ...props }) {
  const classes = useStyles();

  return (
    <Card className={classes.card} key={charItem.id}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={charItem.name}
          height="140"
          image={charItem.thumbnail.path + '.' + charItem.thumbnail.extension}
          title={charItem.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {charItem.name}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
                  {item.description}
                </Typography> */}
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
      </CardActions>
    </Card>
  );
}
