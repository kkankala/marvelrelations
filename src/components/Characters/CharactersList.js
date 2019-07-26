import React, { useEffect, useState } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Divider } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';
import CharacterItem from './CharacterItem';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
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
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

function CharactersList(props) {
  const [redirect, setRedirect] = useState({ isRedirect: false, charId: 0 });
  const [searchText, setsearchText] = useState('');
  const classes = useStyles();

  function handleRedirect(charId) {
    setRedirect({ isRedirect: true, charId });
  }
  function handleChangeText(event) {
    setsearchText(event.target.value);
  }

  const [charactersData, setcharactersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGetApi('characters?limit=100');
      setcharactersData(result.data.results);
    };
    fetchData();
  }, []);

  function searchApiByName(value) {
    (async () => {
      const result = await fetchGetApi(
        'characters?nameStartsWith=' + value + '&limit=100'
      );
      //nameStartsWith=loki&
      setcharactersData(result.data.results);
    })();
  }

  function handleSearchSubmit(searchValue) {
    searchApiByName(searchValue);
  }
  return redirect.isRedirect ? (
    <Redirect push to={'/character/' + redirect.charId} />
  ) : (
    <div>
      <div className={classes.margin}>
        <form
          onSubmit={event => {
            event.preventDefault();
            handleSearchSubmit(searchText);
          }}
        >
          <Grid container alignItems="flex-end">
            <Grid item>
              <SearchIcon />
            </Grid>
            <Grid item xs={11}>
              <TextField
                fullWidth
                label="Search Character"
                onChange={evet => {
                  handleChangeText(evet);
                }}
              />
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Divider className={classes.divider} /> */}
      <Grid
        container
        className={classes.root}
        spacing={10}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="space-around"
      >
        {charactersData.map(item => (
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
