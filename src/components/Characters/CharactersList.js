import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
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

function CharactersList(props) {
  const [redirect, setRedirect] = useState({ isRedirect: false, charId: 0 });
  const classes = useStyles();

  function handleRedirect(charId) {
    setRedirect({ isRedirect: true, charId });
  }
  return redirect.isRedirect ? (
    <Redirect push to={'/character/' + redirect.charId} />
  ) : (
    <div className={classes.root}>
      <Grid
        container
        spacing={10}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="space-around"
      >
        {props.characters.map(item => (
          <CharacterItem
            key={item.id}
            charItem={item}
            redirectHandler={handleRedirect}
          />
        ))}
      </Grid>
    </div>
  );
}

// export default withWidth()(CharactersList);
export default CharactersList;
