/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function Notify(props) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <>
        <Alert variant={props.variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{props.content}</Alert.Heading>
          <hr />
        </Alert>

      </>
    );
  } else {
    return (
      <div></div>
    );
  }
}
