import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

export default function Leave() {
  const [leave, setLeave] = useState(false);
  setTimeout(() => {
    setLeave(true);
  }, 3000);
  return (
    <div style={{ margin: 'auto', textAlign: 'center' }}>
      <Spinner animation="grow" variant="danger" />
      <h1 style={{ fontFamily: 'cursive', color: 'greenyellow' }}>
        Exiting from the auction......</h1>
      <h3 style={{ fontFamily: 'cursive', color: 'blue' }}>
        You will be redirected to the home page</h3>

      {
        leave == true &&
                <Redirect to ='/' />
      }
    </div>
  );
}
