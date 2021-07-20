/* eslint-disable react/prop-types */
import React from 'react';

// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers';

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
