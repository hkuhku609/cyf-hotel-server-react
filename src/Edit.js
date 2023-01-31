import React, { useState, useEffect } from 'react';

const Edit = ({ item, setUpdatedBooking, setErrorMsg }) => {
  const [booking, setBooking] = useState(item);

  useEffect(() => {
    setUpdatedBooking(booking);
  }, [booking]);
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMsg('');
  };

  return (
    <div className='grid'>
      <input
        type='text'
        className='update-input'
        name='title'
        value={booking.title}
        onChange={handleChange}
      />
      <input
        type='text'
        className='update-input'
        name='firstName'
        value={booking.firstName}
        onChange={handleChange}
      />
      <input
        type='text'
        className='update-input'
        name='surname'
        value={booking.surname}
        onChange={handleChange}
      />
      <input
        type='text'
        className='update-input'
        name='email'
        value={booking.email}
        onChange={handleChange}
      />
      <input
        type='text'
        className='update-input'
        name='roomId'
        value={booking.roomId}
        onChange={handleChange}
      />
      <input
        type='date'
        className='update-input'
        name='checkInDate'
        value={booking.checkInDate}
        min={booking.checkInDate}
        onChange={handleChange}
      />
      <input
        type='date'
        className='update-input'
        name='checkOutDate'
        value={booking.checkOutDate}
        min={booking.checkOutDate}
        onChange={handleChange}
      />
    </div>
  );
};

export default Edit;
