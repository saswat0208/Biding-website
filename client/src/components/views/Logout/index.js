import { Redirect } from 'react-router';
import { logoutUser, auth } from '../../../redux/_actions/user_actions';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser());
    dispatch(auth());
  });
  return (
    <Redirect to='/'/>
  );
};

export default Logout;
