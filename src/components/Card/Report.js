import React from 'react';

function Report({ data, isThisUpcoming, isNextUpcoming, dayOfWeek, time }) {
  const timeMapping = {
    Morning: {
      startTime: 8,
      endTime: 12,
    },
    Afternoon: {
      startTime: 12,
      endTime: 17,
    },
    Evening: {
      startTime: 17,
      endTime: 21,
    },
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const description = getParam('conditions');
  const temperature = getParam('temp');
  const windspeed = getParam('windspeed');
  const precipprob = getParam('precipprob');
  const iconName = getParam('icon');
  const day = parseInt(getParam('datetime').substring(8, 10));
  const month = months[parseInt(getParam('datetime').substring(5, 7)) - 1];
  const year = parseInt(getParam('datetime').substring(0, 4));

  function getParam(param) {
    // For dates too far in the future, there is no hourly data available
    if (param === 'datetime') {
      return data.days[0][param];
    } else {
      return data.days[0].hours ? data.days[0].hours[timeMapping[time].startTime][param] : data.days[0][param];
    }
  }

  // Get classname
  const className = isThisUpcoming || isNextUpcoming ? 'heading-text active' : 'heading-text';

  return (
    <div className="Report">
      <h1 className={className}>
        {isThisUpcoming && `This `}
        {isNextUpcoming && `Next `}
        {`${dayOfWeek}, ${month} ${day}, ${year}`}
      </h1>
      <div className="conditions">
        <div style={{ marginRight: '24px' }}>
          <img src={require(`../../assets/weather-icons/${iconName}.svg`)} width="100" height="100" />
        </div>
        <div className="description">
          <span className="body-text">{`${description} ${temperature.toFixed(0)}°F`}</span>
          <span className="small-text">{`Winds ${windspeed.toFixed(0)}mph`}</span>
          <span className="small-text">{`Chance of rain ${precipprob.toFixed(0)}%`}</span>
        </div>
      </div>
    </div>
  );
}

export default Report;
