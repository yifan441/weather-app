import React, { useState, useEffect } from 'react';
import Report from './Report';
import Chart from './Chart';

function Card(props) {
  // Do not render Chart.js if there is no hourly data
  const hourDataExists = props.data.days[0].hours ? true : false;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };
    handleResize(); // Call the function once to set the initial state
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Don't render Chart if it's mobile

  if (isMobile) {
    return (
      <div className="Card">
        <Report {...props} />
      </div>
    );
  }

  return (
    <div className="Card">
      <Report {...props} />

      {hourDataExists ? (
        <Chart data={props.data} time={props.time} />
      ) : (
        <span class="no-hourly-data">No hourly data available yet</span>
      )}
    </div>
  );
}

export default Card;
