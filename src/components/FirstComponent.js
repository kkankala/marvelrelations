import React, { useEffect, useState } from 'react';
import { fetchGetApi } from '../api/apiUtils';
import ComicAvatar from './ComicAvatar/ComicAvatar';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import GridListTileBar from '@material-ui/core/GridListTileBar';

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
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGetApi('characters?limit=100');
      //nameStartsWith=loki&
      console.log(result.data.results);
      setData(result.data.results);
    };
    fetchData();
  }, []);

  //https://stackoverflow.com/questions/48921432/how-to-make-the-gridlist-component-in-react-material-ui-responsive
  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) {
      return 6;
    }

    if (isWidthUp('lg', props.width)) {
      return 5;
    }

    if (isWidthUp('md', props.width)) {
      return 3;
    }

    return 2;
  };

  // container
  //       direction="row"
  //       justify="space-around"
  //       alignItems="center"

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={160}
        className={classes.gridList}
        cols={getGridListCols()}
      >
        {data.map(item => (
          <GridListTile key={item.id} cols={item.cols || 1}>
            <ComicAvatar item={item} />
            <GridListTileBar
              title={item.name}
              //subtitle={<span>by: {tile.author}</span>}
              //actionIcon={
              //  <IconButton aria-label={`info about ${tile.title}`} className={classes.icon}>
              //    <InfoIcon />
              //  </IconButton>
              //}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withWidth()(FirstComponent);
