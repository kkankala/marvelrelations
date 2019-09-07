import React, { Component } from 'react';
import { fetchGetApi } from '../../api/apiUtils';
import { withStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core/';
import { Redirect } from 'react-router-dom';
import CharacterItem from './CharacterItem';
import SearchIcon from '@material-ui/icons/Search';

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
      searchKey: '',
      results: []
    };
  }
  //const [redirect, setRedirect] = useState({ isRedirect: false, charId: 0 });
  //const [searchText, setSearchText] = useState('');
  //classes = useStyles();

  handleRedirect = charId => {
    //setRedirect({ isRedirect: true, charId });
    this.setState({ redirect: true, charId });
  };

  handleChangeText = event => {
    this.setState({ searchText: event.target.value });
  };

  //const [charactersData, setCharactersData] = useState([]);
  //const [searchKey, setSearchKey] = useState('');

  componentDidMount() {
    const fetchData = async () => {
      const result = await fetchGetApi('characters?limit=50');
      this.setState({ results: result.data.results });
      // setCharactersData(result.data.results);
      // setCachedResults(result.data.results)
    };
    fetchData();
  }

  searchApiByName = value => {
    if (!value) return;
    this.setState({ searchKey: value });
    (async () => {
      const result = await fetchGetApi(
        'characters?nameStartsWith=' + value + '&limit=100'
      );
      //nameStartsWith=loki&
      this.setState({ results: result.data.results });
    })();
  };

  handleSearchSubmit = searchValue => {
    this.searchApiByName(searchValue);
  };
  render() {
    const { classes } = this.props;

    return this.state.redirect.isRedirect ? (
      <Redirect push to={'/character/' + this.state.redirect.charId} />
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
          {this.state.results.map(item => (
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
const withLoading = Component => ({ isLoading, ...restProps }) =>
  isLoading ? <Loading /> : <Component {...restProps} />;

// export default withWidth()(CharactersList);
export default withStyles(styles)(CharactersList);
//export default withLoading(withStyles(styles)(CharactersList));

//export const CharactersListWithLoading = withLoading(CharactersList);
