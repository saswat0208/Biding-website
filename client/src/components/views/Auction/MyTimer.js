/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer(props) {
  // const {
  //   seconds,
  //   minutes,
  //   start,
  //   pause,
  //   resume,
  // } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    props.start();
  }, []);


  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '50px' }}>
        <span>{props.minutes}</span>:<span>{props.seconds}</span>
      </div>
    </div>
  );
}
