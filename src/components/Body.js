import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import Card from './Card/Card';
import LeftNav from '../assets/icons/navigate-left.svg';
import RigtNav from '../assets/icons/navigate-right.svg';
import { formatDate, getNextOccurenceOfWeekday, getPrevOccurenceOfWeekday, handleError } from './Utility.js';

//TODO: Plced API key here for now
const API_KEY = 'SWYG7SU6LL8HLMVRT3EEFJ5AZ';

function Body() {
  // Input variables
  const [locationInput, setLocationInput] = useState('Dolores Park, SF');
  const [dayOfWeekInput, setDayOfWeekInput] = useState('Friday');
  const [timeInput, setTimeInput] = useState('Afternoon');
  const [locationPressed, setLocationEntered] = useState(false); // Prevents querying incomplete location

  // Use to check if a Weather Card is this week's or next week's to format text
  const [thisWeekDate, setThisWeekDate] = useState('');
  const [nextWeekDate, setNextWeekDate] = useState('');

  // Weather data
  const [weather1, setWeather1] = useState({ dateObj: null, data: null });
  const [weather2, setWeather2] = useState({ dateObj: null, data: null });

  // Updates page if user enters a new location
  useEffect(() => {
    if (locationPressed) {
      handleInputDataChange();

      // Reset locationPressed state
      setLocationEntered(false);
    }
  }, [locationPressed]);

  // Updates page if user changes day of week input
  useEffect(() => {
    handleInputDataChange();
  }, [dayOfWeekInput]);

  // Handles location input change
  function handleLocationChange(e) {
    if (e.key === 'Enter') {
      // This triggers re-rendering of page to update data
      setLocationEntered(true);
    } else {
      // Handle input change normally
      setLocationInput(e.target.value);
    }
  }

  // Queries Visual Crossing API and displays this week's and next week's weather data
  function handleInputDataChange() {
    // Get this week and next week's Date objs based on the current date
    const thisWeekDateObj = getNextOccurenceOfWeekday(new Date(), dayOfWeekInput);
    const nextWeekDateObj = getNextOccurenceOfWeekday(thisWeekDateObj, dayOfWeekInput);

    // Format as yyyy-mm-dd
    const thisWeekDateStr = formatDate(thisWeekDateObj);
    const nextWeekDateStr = formatDate(nextWeekDateObj);

    // Save formatted dates
    setThisWeekDate(thisWeekDateStr);
    setNextWeekDate(nextWeekDateStr);

    // Query API for this week's weather data
    const url1 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${thisWeekDateStr}?iconSet=icons2&key=${API_KEY}`;
    console.log('about to call axios #1');
    axios
      .get(url1)
      .then((res) => {
        // Set this week's data
        setWeather1({ dateObj: thisWeekDateObj, data: res.data });
        console.log('finished calling axios #1');
      })
      .catch((error) => {
        handleError(error);
      });

    // Query API for next week's weather data
    const url2 = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${nextWeekDateStr}?iconSet=icons2&key=${API_KEY}`;
    console.log('about to call axios #2');
    axios
      .get(url2)
      .then((res) => {
        // Set next week's data
        setWeather2({ dateObj: nextWeekDateObj, data: res.data });
        console.log('finished calling axios #2');
      })
      .catch((error) => {
        handleError(error);
      });
  }

  // Queries Visual Crossing API and updates page to display future data
  function handleForwardBtn(e) {
    e.preventDefault();

    // Get new date obj
    const newDateObj = getNextOccurenceOfWeekday(weather2.dateObj, dayOfWeekInput);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${formatDate(
      newDateObj
    )}?iconSet=icons2&key=${API_KEY}`;

    console.log('about to call axios #3');
    axios
      .get(url)
      .then((res) => {
        // Shift right weather data to the left
        setWeather1({ dateObj: weather2.dateObj, data: weather2.data });

        // Set right weather data
        setWeather2({ dateObj: newDateObj, data: res.data });
        console.log('finished calling axios #3');
      })
      .catch((error) => {
        handleError(error);
      });
  }

  // Queries Visual Crossing API and updates page to display past data
  function handleBackBtn(e) {
    e.preventDefault();

    // Get new date obj
    const newDateObj = getPrevOccurenceOfWeekday(weather1.dateObj, dayOfWeekInput);

    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}/${formatDate(
      newDateObj
    )}?iconSet=icons2&key=${API_KEY}`;

    console.log('about to call axios #4');
    axios
      .get(url)
      .then((res) => {
        // Shift left weather data to the right
        setWeather2({ dateObj: weather1.dateObj, data: weather1.data });

        // Set left weather data
        setWeather1({ dateObj: newDateObj, data: res.data });

        console.log('finished calling axios #4');
      })
      .catch((error) => {
        handleError(error);
      });
  }

  return (
    <div className="Body">
      <Input
        locationValue={locationInput}
        dayValue={dayOfWeekInput}
        timeValue={timeInput}
        handleLocationInput={handleLocationChange}
        handleDayInput={setDayOfWeekInput}
        handleTimeInput={setTimeInput}
      />
      {weather1.data && weather2.data && (
        <div className="display-div" style={{ display: 'flex' }}>
          <button onClick={handleBackBtn} className="nav-btn">
            <img src={LeftNav} alt="back button" />
          </button>
          <div className="card-div">
            <Card
              data={weather1.data}
              isThisUpcoming={weather1.data.days[0].datetime === thisWeekDate}
              isNextUpcoming={weather1.data.days[0].datetime === nextWeekDate}
              dayOfWeek={dayOfWeekInput}
              time={timeInput}
            />
            <Card
              data={weather2.data}
              isThisUpcoming={weather2.data.days[0].datetime === thisWeekDate}
              isNextUpcoming={weather2.data.days[0].datetime === nextWeekDate}
              dayOfWeek={dayOfWeekInput}
              time={timeInput}
            />
          </div>
          <button onClick={handleForwardBtn} className="nav-btn">
            <img src={RigtNav} alt="forward button" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Body;
