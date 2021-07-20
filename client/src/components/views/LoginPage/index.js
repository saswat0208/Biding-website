/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  // eslint-disable-next-line no-unused-vars
  TextField,
  makeStyles,
  Card,
  Button,
} from '@material-ui/core';
import { loginUser } from '../../../redux/_actions/user_actions';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import background from '../../../utils/BG.jpg';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import setIsSnackbarOpen from '../../../redux/_actions/snackbar_actions';

const validationSchema = Yup.object({
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
  password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
});
const useStyles = makeStyles((theme) => ({
  root: {
    'flex': '1',
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'flex-start',
    'alignItems': 'center',
    'height': '70%',
    'width': '80%',
    'marginVertical': '30px',
  },
  card: {
    'display': 'flex',
    'flexDirection': 'row',
    'height': '80%',
    'width': '100%',
    'borderRadius': '10px',

  },
  containers: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',

  },
  containers1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    width: '100%',
    margin: '20px',
  },
}));
function LoginPage1(props) {
  // State declaration for this component
  const [isFormEnabled, setFormEnabled] = useState(true);
  const classes = useStyles();

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  let initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';
  if (initialEmail == 'undefined') {
    initialEmail = '';
  };
  const formik = useFormik({
    initialValues: {
      email: initialEmail,
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setFormEnabled(false);
      setTimeout(() => {
        const dataToSubmit = {
          email: values.email,
          password: values.password,
        };

        dispatch(loginUser(dataToSubmit))
            .then((response) => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                dispatch(
                    setIsSnackbarOpen(
                        { isOpen: true, message: 'Login Successful', severity: 'success' }));
                props.history.push('/');
              } else {
                setFormErrorMessage('Check out your Account or Password again');
                setFormEnabled(true);
                dispatch(setIsSnackbarOpen(
                    {
                      isOpen: true,
                      message: 'Check out your Email or Password again',
                      severity: 'error',
                    }));
              }
            })
            .catch((err) => {
              setIsSnackbarOpen(
                  {
                    isOpen: true,
                    message: 'Check out your Email or Password again',
                    severity: 'error',
                  });
              setFormErrorMessage('Check out your Email or Password again');
              setFormEnabled(true);
              setTimeout(() => {
                setFormErrorMessage('');
              }, 3000);
            });
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <div className='app'>
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.containers} style={{
            background: `url(${background})`,
            backgroundSize: '100% 100%',
          }}>
            {/* Logo and my site region */}
            <div style={{
              margin: '3px',
              padding: '3px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '20%',
              width: '100%',
              color: 'white',
              fontSize: '28px',
              fontFamily: 'sans-serif',
            }}>
              <p>Auctopus</p>
            </div>
            <div style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'column',
              color: 'white',
              fontSize: '30px',
              fontWeight: 'bolder',
              fontFamily: 'sans-serif',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '10px',
            }}>
              <p>Welcome Back!</p>
              <p style={{
                fontSize: '20px',
                fontWeight: 'normal',
              }}>To keep connected with us<br/> please login with your personal details</p>
            </div>
            <div style={{
              display: 'flex',
              color: 'white',
              flexDirection: 'column-reverse',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              fontFamily: 'sans-serif',
              fontSize: '16px',
              margin: '5px',
            }}>
              <p>www.auctopus.com</p>
            </div>
          </div>
          <div className={classes.containers1}>
            {/* form*/}
            <div style={{
              height: '100%',
              width: '100%',
              marginVertical: '5px',
              display: 'flex',
              flexDirection: 'column',
              padding: '5px',
            }}>
              <div style={{
                height: '30%',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'flex-start',
                justifyContent: 'center',
                fontSize: '30px',
                fontFamily: 'sans-serif',
                fontWeight: 'bolder',
                color: 'black',
              }}>
                <p>Sign in</p>

              </div>
              <div style={{ flex: '1' }}>
                <form noValidate onSubmit={formik.handleSubmit} style={{
                  height: '100%',
                  width: '100%',
                  marginVertical: '5px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '10px',
                }}>
                  {/* Email */}
                  <TextField
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  {/* Password */}
                  <TextField
                    d="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    placeholder="Enter your password"
                  />
                  {/* Login button */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '15px',
                    // alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                    <Button
                      disabled={formik.isSubmitting}
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={{
                        width: '30%',
                        marginLeft: 'auto',
                        background: 'linear-gradient(to right,purple,magenta)',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        fontWeight: 'bold' }}
                    >
                                          Sign In
                    </Button>
                  </div>
                </form>
              </div>
              <div style={{
                flex: '1',
                fontFamily: 'sans-serif',
                fontSize: '25px',
              }}>
                              or
                <a href='/register'> Register Now</a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default withRouter(LoginPage1);
