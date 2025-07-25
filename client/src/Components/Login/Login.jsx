import React from 'react';
import { useFormik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: ''
    },
    onSubmit: (values) => {
      console.log('Send OTP to:', values.email);
      // You can call your OTP API here
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

        <Button variant="primary" type="submit" className="w-100">
          Send OTP
        </Button>
      </Form>
    </Container>
  );
};

