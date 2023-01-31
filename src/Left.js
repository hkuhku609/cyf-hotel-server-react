import React, { useState, useEffect, useCallback } from 'react';

const Left = ({ callData, setFilteredBookings, bookings }) => {
  const [booking, setBooking] = useState({
    title: '',
    firstName: '',
    surname: '',
    email: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: ''
  });
  const [searchData, setSearchData] = useState({ term: '', date: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://susan-hotel-server.glitch.me/bookings/', {
        method: 'POST',
        body: JSON.stringify(booking),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (!res.ok) return setErrorMsg(data);
      callData();
      clearInput();
    } catch (err) {
      console.error(err);
    }
  };
  const clearInput = () => {
    setBooking({
      title: '',
      firstName: '',
      surname: '',
      email: '',
      roomId: '',
      checkInDate: '',
      checkOutDate: ''
    });
    setErrorMsg('');
  };
  const fetchSearchedData = useCallback(async (fieldName, searchValue) => {
    try {
      const res = await fetch(
        `https://susan-hotel-server.glitch.me/bookings/search?${fieldName}=${searchValue}`
      );
      const data = await res.json();
      setFilteredBookings(data);
    } catch (err) {
      console.error(err);
    }
  }, []);
  useEffect(() => {
    fetchSearchedData();
  }, [fetchSearchedData]);

  const handleSearch = (name, value) => {
    if (!value) {
      setFilteredBookings(bookings);
      setSearchData({ term: '', date: '' });
    } else {
      setSearchData((prevState) => ({ ...prevState, [name]: value }));
      fetchSearchedData(name, value);
    }
  };

  return (
    <div className='left-container'>
      <div className='search-container'>
        <h2>Search</h2>
        <input
          type='text'
          name='term'
          placeholder='Search firstName/surname/email'
          aria-label='search term input'
          value={searchData.term}
          onChange={(e) => handleSearch(e.target.name, e.target.value)}
        />
        <input
          type='date'
          name='date'
          value={searchData.date}
          aria-label='search date input'
          onChange={(e) => handleSearch(e.target.name, e.target.value)}
        />
      </div>
      <form onSubmit={handlePost} className='form-container'>
        <h2>Create Bookings</h2>
        <input
          type='text'
          name='title'
          value={booking.title}
          placeholder='title...'
          aria-label='title input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <input
          type='text'
          name='firstName'
          value={booking.firstName}
          placeholder='first name...'
          aria-label='first name input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <input
          type='text'
          name='surname'
          value={booking.surname}
          placeholder='surname...'
          aria-label='surname input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <input
          type='text'
          name='email'
          value={booking.email}
          placeholder='email...'
          aria-label='email input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <input
          type='text'
          name='roomId'
          value={booking.roomId}
          placeholder='room id...'
          aria-label='room id input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
        />

        <input
          type='date'
          name='checkInDate'
          value={booking.checkInDate}
          aria-label='check in date input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          min={new Date().toISOString().slice(0, 10)}
        />

        <input
          type='date'
          name='checkOutDate'
          value={booking.checkOutDate}
          aria-label='check out date input'
          onChange={(e) =>
            setBooking((prev) => ({ ...prev, [e.target.name]: e.target.value }))
          }
          min={new Date().toISOString().slice(0, 10)}
        />

        <button>Submit</button>
        <button type='button' onClick={clearInput}>
          Clear
        </button>
        {errorMsg && <p>{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Left;
