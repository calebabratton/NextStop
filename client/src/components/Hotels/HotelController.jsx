import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { AppContext } from '../../helpers/context';
import useStyles from '../TabStyle.jsx';
import HotelDatePicker from './HotelDatePicker.jsx';

export default function HotelController({ setHotels, setHotelInfo, setLoading }) {
  const classes = useStyles();
  const { currentDestination, currentLocation, hotelInfo } = useContext(AppContext);
  function formatDate(date) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  const getHotels = () => {
    const today = new Date()
    const tomorrow = new Date(today)


    axios.get('/api/hotels', {
      params: {
        latitude: currentDestination ? currentDestination.lat : currentLocation.lat,
        longitude: currentDestination ? currentDestination.lng : currentLocation.lng,
        checkInDate: hotelInfo.checkInDate ? hotelInfo.checkInDate : formatDate(today),
        checkOutDate: hotelInfo.checkOutDate ? hotelInfo.checkOutDate : formatDate(tomorrow.setDate(tomorrow.getDate() + 1)),
        adults: hotelInfo ? hotelInfo.adults : 1,
      },
    })
      .then((response) => {
        setHotels(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onHotelInfoChange = (input) => (e) => {
    setHotelInfo({
      ...hotelInfo,
      [input]: e.target.value,
    });
  };
  useEffect(() => {
    if (currentDestination || currentLocation) {
      getHotels();
    }
  }, [currentDestination, currentLocation])

  return (
    <div className={classes.controlBar}>
      <TextField
        label="Guests"
        id="guests-hotel"
        type="number"
        onChange={onHotelInfoChange('adults')}
        placeholder="How Many Of Ya?"
        variant="outlined"
        defaultValue={hotelInfo ? hotelInfo.adults : 1}
        size="small"
      />

      <HotelDatePicker hotelInfo={hotelInfo} setHotelInfo={setHotelInfo} />

      <Button
        variant="outlined"
        onClick={(e) => {
          e.preventDefault();
          setLoading(true);
          getHotels();
        }}
      >
        Go
      </Button>
    </div>
  );
}
