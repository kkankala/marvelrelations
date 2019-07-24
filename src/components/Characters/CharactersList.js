import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconLink from '@material-ui/icons/Link';
import IconButton from '@material-ui/core/IconButton';
import { Redirect } from 'react-router-dom';

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
          <Card className={classes.card} key={item.id}>
            <CardActionArea
              onClick={() => setRedirect({ isRedirect: true, charId: item.id })}
            >
              <CardMedia
                component="img"
                alt={item.name}
                height="140"
                image={item.thumbnail.path + '.' + item.thumbnail.extension}
                title={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {item.name}
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
                href={item.urls[0].url}
              >
                <IconLink />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

export default withWidth()(CharactersList);
