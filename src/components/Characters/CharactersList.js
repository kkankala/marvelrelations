import React, { Component } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';
import CharacterItem from './CharacterItem';
import SearchIcon from '@material-ui/icons/Search';

const DEFAULT_SEARCH_KEY = 'ALL';
const DEFAULT_PAGE_SIZE = 50;

const styles = theme => ({
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
});

class CharactersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      charId: null,
      searchText: '',
      searchKey: 'ALL',
      results: [],
      isLoading: true
    };
  }

  setCharactersData(searchResults = []) {
    const { searchKey, results } = this.state;
    const oldResults = results && results[searchKey] ? results[searchKey] : [];
    const updatedResults = [...oldResults, ...searchResults];
    this.setState({
      results: {
        ...results,
        [searchKey]: { updatedResults }
      }
    });
  }

  handleRedirect = charId => {
    this.setState({ redirect: true, charId });
  };

  handleChangeText = event => {
    this.setState({ searchText: event.target.value });
  };

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const result = await fetchGetApi(`characters?limit=${DEFAULT_PAGE_SIZE}`);
    this.setState({ searchKey: DEFAULT_SEARCH_KEY });
    this.setCharactersData(result.data.results);
    this.setState({ isLoading: false });
  };

  searchApiByName = value => {
    if (!value) {
      this.setState({ searchKey: DEFAULT_SEARCH_KEY });
    } else {
      this.setState({ searchKey: value });
      (async () => {
        const result = await fetchGetApi(
          `characters?nameStartsWith=${value}&limit=${DEFAULT_PAGE_SIZE}`
        );
        this.setCharactersData(result.data.results);
      })();
    }
  };

  handleSearchSubmit = searchValue => {
    this.searchApiByName(searchValue);
  };

  render() {
    const { classes } = this.props;
    const { results, searchKey } = this.state;

    const page =
      (results && results[searchKey] && results[searchKey].page) || 0;

    const list =
      (results && results[searchKey] && results[searchKey].updatedResults) ||
      [];

    return this.state.redirect ? (
      <Redirect push to={'/character/' + this.state.charId} />
    ) : (
      <div>
        <div className={classes.margin}>
          <form
            onSubmit={event => {
              event.preventDefault();
              this.handleSearchSubmit(this.state.searchText);
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
                    this.handleChangeText(evet);
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </div>
        <Grid
          container
          className={classes.root}
          direction="row"
          justify="center"
          alignItems="center"
          alignContent="space-around"
        >
          {list.map(item => (
            <CharacterItem
              key={item.id}
              charItem={item}
              redirectHandler={this.handleRedirect}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

const Loading = () => <div>Loading ...</div>;
const withLoading = Component => ({ isLoading, ...restProps }) => {
  debugger;
  return isLoading ? <Loading /> : <Component {...restProps} />;
};

// export default withWidth()(CharactersList);
//export default withStyles(styles)(CharactersList);
export default withStyles(styles)(withLoading(CharactersList));

//export const CharactersListWithLoading = withLoading(CharactersList);
