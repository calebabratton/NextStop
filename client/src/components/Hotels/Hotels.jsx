/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../helpers/context';
import useStyles from '../TabStyle.jsx';
import HotelController from './HotelController.jsx';
import HotelTile from './HotelTile.jsx';

export default function Hotels() {
  const { hotels, setHotels, hotelInfo, setHotelInfo } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    console.log(hotels)
  }, [hotels, hotelInfo]);
  return (
    <div className={classes.tabContainer}>
      <HotelController
        hotelInfo={hotelInfo}
        setHotels={setHotels}
        setHotelInfo={setHotelInfo}
        hotels={hotels}
        setLoading={setLoading}
      />
      {
        loading ? <img src="https://i.ibb.co/1JZ5jT4/output-onlinegiftools.gif" alt="hotel-loader" height="55%" border="0" />
          : hotels.length > 0 ? hotels.map((hotel) => (
            <HotelTile
              key={hotel.hotel.hotelId}
              hotel={hotel}
            />
          ))
            : <p>Enter some data</p>
          }
    </div>
  );
}
