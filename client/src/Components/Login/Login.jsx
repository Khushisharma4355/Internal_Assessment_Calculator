import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
//redux requirements
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setEmailExists } from '../../Redux/loginSlice';
import { useLazyQuery } from '@apollo/client';
import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';
export const LoginForm = () => {
  const [submitted, setSubmitted] = useState(false);


  const dispatch = useDispatch();
  const { email, emailExists } = useSelector((state) => state.login)

  const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
    onCompleted: (data) => {
      dispatch(setEmailExists(data.checkEmail));
    },
  })



  const formik = useFormik({

    initialValues: {
      email: ''
    },
    onSubmit: (values) => {
      // You can call your OTP API here
      console.log('Send OTP to:', values.email);


      dispatch(setEmail(values.email)); // optional, for storing email
      checkEmail({ variables: { email: values.email } }); // 🚀 Call query here

      setSubmitted(true); // mark that user submitted the form
    }
  });
  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      {/* <h3 className="mb-4 text-center">Login</h3> */}
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </Form.Group>
        {/* {emailExists === false && (
          <div style={{ color: 'red' }}>Email does not exist</div>
        )} */}
        {submitted && emailExists === false && (
  <p style={{ color: 'red', marginTop: '5px' }}>
    Email does not exist!
  </p>
)}

{submitted && emailExists === true && (
  <p style={{ color: 'green', marginTop: '5px' }}>
    OTP sent to your email!
  </p>
)}

        <Button type="submit" className="w-100" style={{ backgroundColor: '#1d3557', border: 'none' }} >
          Send OTP
        </Button>
      </Form>
    </Container>
  );
};

