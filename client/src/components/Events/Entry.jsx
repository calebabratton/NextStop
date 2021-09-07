/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Paper, Typography, ButtonBase, Button, Fab, Image,
} from '@material-ui/core/';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import { AppContext } from '../../helpers/context';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    marginBottom: '2px',
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '12rem',
    maxHeight: '12rem',
  },
  amenities: {
    display: 'inline',
  },
}));

export default function Entry({
  index, name, tags, category, event,
}) {
  const [fav, setFav] = useState(false);
  const classes = useStyles();
  const { favorites, setFavorites } = useContext(AppContext);
  // const getOnlyFirstFour = (array) => {
  //   const firstFour = array.slice(0, 4);
  //   return firstFour;
  // };
  // const eventTags = getOnlyFirstFour(tags);
  let source;
  const eventIcons = (cat) => {
    cat === 'RESTAURANT' ? source = 'https://www.creativefabrica.com/wp-content/uploads/2018/12/Restaurant-icon-vector-by-Hoeda80-580x386.jpg' : null;
    cat === 'NIGHTLIFE' ? source = 'https://image.shutterstock.com/image-illustration/dancing-couple-icon-element-party-260nw-1159039519.jpg' : null;
    cat === 'SIGHTS' ? source = 'https://image.shutterstock.com/image-vector/eye-icon-vector-260nw-1329652607.jpg' : null;
    cat === 'SHOPPING' ? source = 'https://image.shutterstock.com/image-vector/shopping-bag-vector-icon-260nw-661740685.jpg' : null;
    return source;
  };
  const icon = eventIcons(category);

  const saveEvent = (favoritedEvent) => {
    axios
      .put('/user/events', favoritedEvent)
      .then((response) => response)
      .catch((err) => {
        console.log('err saving event to user in client', err);
      });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
          <img style={{width: 250, height: 200, position: 'relative'}} src={event.performers[0].image || 'https://i.ibb.co/NpM9JYv/event.jpg'} />

          </Grid>
          <Grid item xs={6} sm containers="true">
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                {/* <img src={event.performers[0].image} /> */}
                <Typography gutterBottom variant="subtitle1">
                  {event.title}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {event.stats.lowest_price === null ? <span>No Tickets Available</span> : <span>Starting At: ${event.stats.lowest_price}</span>}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  {moment(event.datetime_local).format('MMMM Do YYYY, h:mm:ss a')}
                </Typography>
                <Typography gutterBottom variant="subtitle1">
                  <Button href={event.url} target="_blank" size="small" variant="contained" color="#cdc545">BUY TICKETS</Button>
                </Typography>
                {/* <Typography variant="body2" gutterBottom>
                  Tags:
                  {' '}
                  {eventTags[0]}
                  {eventTags[1]
                    ? (
                      <span>
                        ,
                        {' '}
                        {eventTags[1]}
                      </span>
                    ) : null}
                  {eventTags[2]
                    ? (
                      <span>
                        ,
                        {' '}
                        {eventTags[2]}
                      </span>
                    ) : null}
                  {eventTags[3]
                    ? (
                      <span>
                        ,
                        {' '}
                        {eventTags[3]}
                      </span>
                    ) : null}
                </Typography> */}
              </Grid>
                <div>
                  {fav === false ? (
                    <Fab
                      aria-label="like"
                      size="small"
                      onClick={(e) => {
                        e.preventDefault();
                        setFav(true);
                        saveEvent(event);
                        setFavorites([...favorites, event]);
                      }}
                    >
                      <FavoriteIcon />
                    </Fab>
                  ) : (
                    <Fab
                      disabled
                      aria-label="like"
                      size="small"
                    >
                      <FavoriteIcon />
                    </Fab>
                  )}
                </div>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}