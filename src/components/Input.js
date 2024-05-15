import React from 'react';
import MapPin from '../assets/icons/pin.svg';
import Clock from '../assets/icons/time.svg';

function Input({ locationValue, dayValue, timeValue, handleLocationInput, handleDayInput, handleTimeInput }) {
  return (
    <div className="Input">
      {/* Location Parameter */}
      <div className="labels">
        <label>
          <img src={MapPin} alt="Map pin" />
          <input
            name="locationInput"
            value={locationValue}
            placeholder="Enter a location"
            onChange={(e) => handleLocationInput(e)}
            onKeyDown={(e) => handleLocationInput(e)}
          />
        </label>
        <div className="time-inputs">
          {/* Day of the Week Parameter */}
          <label style={{ marginRight: '20px' }}>
            <img src={Clock} alt="Map pin" />
            <select name="dayInput" value={dayValue} onChange={(e) => handleDayInput(e.target.value)}>
              <option value="Monday">Every Monday</option>
              <option value="Tuesday">Every Tuesday</option>
              <option value="Wednesday">Every Wednesday</option>
              <option value="Thursday">Every Thursday</option>
              <option value="Friday">Every Friday</option>
              <option value="Saturday">Every Saturday</option>
              <option value="Sunday">Every Sunday</option>
            </select>
          </label>
          {/* Time of Day Parameter */}
          <label>
            <select name="timeInput" value={timeValue} onChange={(e) => handleTimeInput(e.target.value)}>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </label>
        </div>
      </div>
      <div className="divider">
        <hr />
      </div>
    </div>
  );
}

export default Input;
