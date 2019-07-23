import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  bigAvatar: {
    // margin: 10,
    width: 150,
    height: 150
  }
});

export default function ComicAvatar(props) {
  const classes = useStyles();
  return (
    <Avatar
      alt={props.item.name}
      src={props.item.thumbnail.path + '.' + props.item.thumbnail.extension}
      className={classes.bigAvatar}
    />
  );
}
