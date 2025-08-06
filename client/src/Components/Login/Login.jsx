
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setEmailExists } from '../../Redux/loginSlice';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';
import { SEND_LOGIN_OTP, VERIFY_OTP } from '../../GraphQL/Mutation';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../Redux/authSlice';

export const LoginForm = ({ role }) => {

  // Redux hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { emailExists } = useSelector((state) => state.login);

  const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
    onCompleted: (data) => {
      dispatch(setEmailExists(data.checkEmail.success));
      console.log('Email check response', data);
    },
    onError: () => {
      dispatch(setEmailExists(false));
    },
    fetchPolicy: 'no-cache',
  });

  const [sendOtp] = useMutation(SEND_LOGIN_OTP);
  const [verifyLoginOtp] = useMutation(VERIFY_OTP); // You must define this in your GraphQL backend

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const email = values.email;


      setSubmitted(true);
      dispatch(setEmail(email));

      try {
        const { data } = await checkEmail({ variables: { email, role } });

      if (data?.checkEmail?.success) {
  dispatch(setEmailExists(true));
  await sendOtp({ variables: { email, role } });
  toast.success('OTP sent to your email!');
  setOtpSent(true);
} else {
  dispatch(setEmailExists(false));
  toast.error(data?.checkEmail?.message || 'Email does not exist!');
}

      } catch (error) {
        console.error('Login Error:', error);
        toast.error('Something went wrong. Please try again.');
      }
    },
  });


  const handleVerifyOtp = async () => {
    console.log('Verify OTP button clicked');
    if (!otp) {
      toast.error('Please enter the OTP to proceed');
      return;
    }

    try {
      const { data } = await verifyLoginOtp({
        variables: {
          email: formik.values.email,
          otp: otp,
          role: role, // Use the role passed as a prop
        },
      });
      console.log('OTP verification response:', data); // Add this for debugging
      if (data.verifyLoginOtp.success) {
        toast.success(data.verifyLoginOtp.message || 'Login successful!');

        
        // You can also dispatch login info if needed
        dispatch(setAuthToken(data.verifyLoginOtp.token)); // ✅ Correct Redux usage

         // Save the token in localStorage (optional)
        // persist the token across page refreshes
        localStorage.setItem('token', data.verifyLoginOtp.token);
        // Navigate based on user role

        const userRole = data.verifyLoginOtp.role||role;

        if (userRole === 'student') {
          navigate('/students/');
        } else if (userRole === 'faculty') {
          navigate('/teachers/');
        } else if (userRole === 'admin') {
          navigate('/admin/');
        }
      } else {
        toast.error(data.verifyLoginOtp.message || 'OTP verification failed');
      }
    } catch (err) {
      console.error('OTP verification error:', err.message);
      toast.error('Something went wrong while verifying OTP');
    }
  };

  useEffect(() => {
    setSubmitted(false);
    setOtpSent(false);
    setOtp('');
  }, [formik.values.email]);


  const handleEmailBlur = (email) => {
    checkEmail({
      variables: {
        email: email.trim(),
        role: role   // ✅ Important
      }
    });
  };
  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={(e) => handleEmailBlur(e.target.value)}
            required
          />
        </Form.Group>

        {submitted && emailExists === false && (
          <p style={{ color: 'red' }}>Email does not exist!</p>
        )}
        {submitted && emailExists === true && (
          <p style={{ color: 'green' }}>OTP sent to your email!</p>
        )}

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: '#1d3557', border: 'none' }}
          disabled={formik.isSubmitting}
          
        >
          Send OTP
        </Button>
      </Form>

      {otpSent && (
        <Form className="mt-4">
          <Form.Group className="mb-3" controlId="formOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </Form.Group>

          <Button
            onClick={handleVerifyOtp}
            className="w-100"
            style={{ backgroundColor: '#1d3557', border: 'none' }}
          >
            Verify OTP
          </Button>
        </Form>
      )}
    </Container>
  );
};
