/* eslint-disable react/prop-types */
import React from 'react';
import {
  Paper,
  Typography,
} from '@material-ui/core';
import classnames from 'classnames';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
// styles
import useStyles from './styles';

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  type,
  clicked,
  ...props
}) {
  const classes = useStyles();

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper className={classes.paper} classes={{ root: classnames(classes.widgetRoot, {
        [classes.noWidgetShadow]: noWidgetShadow,
      }) }}>
        <div className={classnames(classes.widgetHeader, {
          [classes.noPadding]: noHeaderPadding,
          [headerClass]: headerClass,
        })}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary" noWrap>
                {title}
              </Typography>

              {type === 'editable' &&
                  <IconButton onClick={clicked} size='small' aria-label='Edit'>
                    <EditIcon />
                  </IconButton>}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
