/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { Route, Switch, HashRouter } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './components/Navigation/Navigation.jsx';
import Home from './components/Home/Home.jsx';
import UserProfile from './components/UserProfile/UserProfile.jsx';
import { AppContext } from './helpers/context';

const theme = createTheme({
  palette: {
    background: {
      default: '#4ecdc4',
    },
  },
});

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    width: 'auto',
  },
}));

function App() {
  const [user, setUser] = useState({});
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentDestination, setCurrentDestination] = useState(null);
  const [currentLocation, setLocation] = useState(null);
  const [hotelInfo, setHotelInfo] = useState({
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    adults: null,
  });
  const [eventData, updateEventData] = useState(null);

  const classes = useStyles();

  useEffect(() => {
    axios.get('/user/data')
      .then((res) => {
        if (res.data === '') {
          setUser({});
          setLoggedIn(false);
        } else if (res.data.nickname) {
          setUser(res.data);
          setLoggedIn(true);
        }
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log('THIS IS ERROR', err));
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({lat: position.coords.latitude, lng: position.coords.longitude});
      });
  }, []);

  return (
    <HashRouter>
      <Switch>
        <ThemeProvider theme={theme}>
          <AppContext.Provider value={{
            flights,
            setFlights,
            hotels,
            setHotels,
            favorites,
            setFavorites,
            currentDestination,
            currentLocation,
            hotelInfo,
            setHotelInfo,
            eventData,
            updateEventData
          }}
          >
            <CssBaseline />
            <Navigation
              user={user}
              loggedIn={loggedIn}
              setCurrentDestination={setCurrentDestination}
            />
            <div className={classes.main}>
              <Route path="/profile" exact component={UserProfile} />
              <Route path="/home" exact component={Home} />
              <Route path="/" exact component={Home} />
            </div>
          </AppContext.Provider>
        </ThemeProvider>
      </Switch>
    </HashRouter>
  );
}
ReactDOM.render(<App />, document.getElementById('app'));
