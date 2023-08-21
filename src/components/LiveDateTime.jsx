import React, { useEffect, useState } from 'react';
import './css/styles.css'

const LiveDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return time.toLocaleTimeString(undefined, options);
  };

  return (
    <div className='container'>
      <p className='date'>{formatDate(currentTime)}</p>
      <p className='time'>{formatTime(currentTime)}</p>
    </div>
  );
};

export default LiveDateTime;
