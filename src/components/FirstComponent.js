import React from 'react';
import ComicAvatar from './ComicAvatar/ComicAvatar';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
    // backgroundColor: theme.palette.background.paper
  },
  gridList: {
    minWidth: 500,
    minHeight: 500
  }
}));

function FirstComponent(props) {
  const classes = useStyles();

  //https://stackoverflow.com/questions/48921432/how-to-make-the-gridlist-component-in-react-material-ui-responsive
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 5;
    }

    if (isWidthUp('lg', props.width)) {
      return 4;
    }

    if (isWidthUp('md', props.width)) {
      return 3;
    }

    return 2;
  };

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={160}
        className={classes.gridList}
        cols={getGridListCols()}
      >
        {props.data.map(item => (
          <GridListTile key={item.id} cols={item.cols || 1}>
            <ComicAvatar item={item} />
            <GridListTileBar title={item.name} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withWidth()(FirstComponent);
