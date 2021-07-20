/* eslint-disable react/prop-types */
import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import setIsSnackbarOpen from '../../../redux/_actions/snackbar_actions';
export const EditUserImg = ({
  user,
  ...props
}) => {
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(user.image);
  const handleSubmit = async () => {
    const dataToSubmit = {
      user: user,
      image: imgSrc,
    };
    axios.post(`http://localhost:8080/editDetails`, dataToSubmit)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: 'Details Updated Successfully',
              severity: 'success',
            }));
          } else {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: response.payload.err.errmsg,
              severity: 'error',
            }));
          }
          ;
        });
  };
  return (<div style={{ flex: 1 }}>
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
      <p>Edit Details</p>

    </div>
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        label='image_src'
        name='imagesrc'
        type='text'
        value={imgSrc}
        placeholder='Paste your image link'
        onChange={(e) => setImgSrc(e.target.value)}
      />
      {/* Update button */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: '15px',
        // alignItems: 'flex-end',
        justifyContent: 'flex-end',
      }}>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{
            width: '30%',
            marginLeft: 'auto',
            background: 'linear-gradient(to right,purple,magenta)',
            color: 'white',
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          }}
        >
                  Save
        </Button>
      </div>
    </form>
  </div>);
};


const validationSchema = Yup.object({
  name: Yup.string()
      .required('Name is required'),
  lastName: Yup.string()
      .required('Last Name is required'),
  email: Yup.string()
      .email('Email is invalid')
      .required('Email is required'),
});
export const EditUserDetails = ({
  user,
  ...props }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: user.email,
      lastname: user.lastname,
      name: user.name,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
    },
  });
  const handleSubmit = async () => {
    const dataToSubmit = {
      user: user,
      email: formik.values.email,
      name: formik.values.name,
      lastname: formik.values.lastname,
    };
    console.log(dataToSubmit);
    axios.post(`http://localhost:8080/editDetails`, dataToSubmit)
        .then((response) => {
          if (response.data.success) {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: 'Details Updated Successfully',
              severity: 'success',
            }));
          } else {
            dispatch(setIsSnackbarOpen({
              isOpen: true,
              message: response.data.err.errmsg,
              severity: 'error',
            }));
          }
        });
  };
  return (<div style={{
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
      <p>Edit Details</p>

    </div>
    <div style={{ flex: '1' }}>
      <form noValidate onSubmit={handleSubmit} style={{
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
          placeholder="Enter your new email"
        />
        {/* First Name */}
        <TextField
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          id="name"
          name="name"
          label="firstname"
          placeholder="Enter your First Name"
        />
        {/* Last Name */}
        <TextField
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname}
          id="lastname"
          name="lastname"
          label="lastname"
          placeholder="Enter your Last Name"
        />
        {/* Update button */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '15px',
          // alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={{
              width: '30%',
              marginLeft: 'auto',
              background: 'linear-gradient(to right,purple,magenta)',
              color: 'white',
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
            }}
          >
                        Save
          </Button>
        </div>
      </form>
    </div>
  </div>);
};
