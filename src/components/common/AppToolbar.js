import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  }
}));

export default function AppToolbar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Button href="/" variant="text" size="large">
            <Typography className={classes.title} variant="h6" noWrap>
              Marvel
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
