import React, { useContext } from 'react';
import { RangeDatePicker } from 'react-google-flight-datepicker';
import 'react-google-flight-datepicker/dist/main.css';

export default function HotelDatePicker({ hotelInfo, setHotelInfo }) {
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
  const onDateChange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    const addDate = {
      ...hotelInfo,
      checkInDate: start,
      checkOutDate: end,
    }
    setHotelInfo(addDate)
  };

  return (
    <RangeDatePicker
      startDate={hotelInfo ? hotelInfo.checkInDate : new Date()}
      endDate={hotelInfo ? hotelInfo.checkOutDate : new Date()}
      onChange={(startDate, endDate) => onDateChange(startDate, endDate)}
    />
  );
}
