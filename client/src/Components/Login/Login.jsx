// import React from 'react';
// import { useFormik } from 'formik';
// import { useState } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// //redux requirements
// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail, setEmailExists } from '../../Redux/loginSlice';
// import { useLazyQuery } from '@apollo/client';
// import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';

// export const LoginForm = () => {
//   const [submitted, setSubmitted] = useState(false);


//   const dispatch = useDispatch();
//   const { email, emailExists } = useSelector((state) => state.login)
// const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
//   onCompleted: (data) => {
//     dispatch(setEmailExists(data.checkEmail));
//   },
// });

// const formik = useFormik({
//   initialValues: {
//     email: '',
//   },
//   onSubmit: (values) => {
//     dispatch(setEmail(values.email));
//     checkEmail({
//       variables: {
//         email: values.email,
//         role: 'student', // 👈 use 'teacher' or 'admin' for other forms
//       }
//     });
//     setSubmitted(true);
//   }
// });

//   // const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
//   //   onCompleted: (data) => {
//   //     dispatch(setEmailExists(data.checkEmail));
//   //   },
//   // })



//   // const formik = useFormik({

//   //   initialValues: {
//   //     email: ''
//   //   },
//   //   onSubmit: (values) => {
//   //     // You can call your OTP API here
//   //     console.log('Send OTP to:', values.email);


//   //     dispatch(setEmail(values.email)); // optional, for storing email
//   //     checkEmail({ variables: { email: values.email } }); // 🚀 Call query here

//   //     setSubmitted(true); // mark that user submitted the form
//   //   }
//   // });
//   return (
//     <Container className="mt-5" style={{ maxWidth: '400px' }}>
//       {/* <h3 className="mb-4 text-center">Login</h3> */}
//       <Form onSubmit={formik.handleSubmit}>
//         <Form.Group className="mb-3" controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//           />
//         </Form.Group>
//         {/* {emailExists === false && (
//           <div style={{ color: 'red' }}>Email does not exist</div>
//         )} */}
//         {submitted && emailExists === false && (
//   <p style={{ color: 'red', marginTop: '5px' }}>
//     Email does not exist!
//   </p>
// )}

// {submitted && emailExists === true && (
//   <p style={{ color: 'green', marginTop: '5px' }}>
//     OTP sent to your email!
//   </p>
// )}

//         <Button type="submit" className="w-100" style={{ backgroundColor: '#1d3557', border: 'none' }} >
//           Send OTP
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import { Container, Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail, setEmailExists } from '../../Redux/loginSlice';
// import { useLazyQuery } from '@apollo/client';
// import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';
// import { SEND_LOGIN_OTP } from '../../GraphQL/Mutation'; // case-sensitive path
// import { useMutation } from '@apollo/client';


// export const LoginForm = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const dispatch = useDispatch();
//   const { email, emailExists } = useSelector((state) => state.login);


//   const [sendOtp] = useMutation(SEND_LOGIN_OTP);
//   const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
//     onCompleted: (data) => {
//       dispatch(setEmailExists(data.checkEmail));
//     },
//     onError: () => {
//       dispatch(setEmailExists(false));
//     },
//     fetchPolicy: 'no-cache',
//   });

//   const formik = useFormik({
//   initialValues: {
//     email: '',
//   },
//   onSubmit: async (values) => {
//     const email = values.email;
//     const role = 'student'; // ✅ hardcoded role

//     setSubmitted(true);
//     dispatch(setEmail(email));

//     try {
//       const { data } = await checkEmail({
//         variables: { email, role },
//       });

//       if (data?.checkEmail) {
//         dispatch(setEmailExists(true));
//         await sendOtp({ variables: { email, role } });
//         toast.success('OTP sent to your email!');
//       } else {
//         dispatch(setEmailExists(false));
//         toast.error('Email does not exist!');
//       }
//     } catch (error) {
//       console.error('Something went wrong:', error);
//       toast.error('Something went wrong');
//     }
//   }
// });


//   // const formik = useFormik({
//   //   initialValues: {
//   //     email: '',
//   //     role:"student"
//   //   },
//   //   onSubmit: (values) => {
//   //     dispatch(setEmail(values.email));
//   //     setSubmitted(true);
//   //   },
//   // });

//   // Trigger checkEmail on blur
//   // const handleEmailBlur = async (e) => {
//   //   const emailValue = e.target.value;
//   //   if (emailValue) {
//   //     checkEmail({
//   //       variables: {
//   //         email: emailValue,
//   //         role: 'student', // 👈 Change to 'teacher' or 'admin' for other forms
//   //       },
//   //     });
//   //   }
//   // };
// const handleEmailBlur = async (e) => {
//   const email = e.target.value;
//   const role = formik.values.role;

//   if (email && role) {
//     try {
//       const { data } = await client.query({
//         query: CHECK_EMAIL,
//         variables: { email, role },
//         fetchPolicy: 'network-only',
//       });

//       if (data.checkEmail) {
//         setEmailExists(true);
//         // ✅ Send OTP directly after confirmation
//         await sendOtp({ variables: { email, role } });
//         toast.success('OTP sent to your email!');
//       } else {
//         setEmailExists(false);
//         toast.error('Email not found!');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   }
// };
//   return (
//     <Container className="mt-5" style={{ maxWidth: '400px' }}>
//       <Form onSubmit={formik.handleSubmit}>
//         <Form.Group className="mb-3" controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={handleEmailBlur}
//             required
//           />
//         </Form.Group>

//         {submitted && emailExists === false && (
//           <p style={{ color: 'red', marginTop: '5px' }}>Email does not exist!</p>
//         )}
//         {submitted && emailExists === true && (
//           <p style={{ color: 'green', marginTop: '5px' }}>OTP sent to your email!</p>
//         )}

//         <Button
//           type="submit"
//           className="w-100"
//           style={{ backgroundColor: '#1d3557', border: 'none' }}
//           disabled={emailExists === false}
//         >
//           Send OTP
//         </Button>
//       </Form>
//     </Container>
//   );
// };



// Login.jsx
// import React, { useState } from 'react';
// import { useFormik } from 'formik';
// import { Container, Form, Button } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { setEmail, setEmailExists } from '../../Redux/loginSlice';
// import { useLazyQuery, useMutation } from '@apollo/client';
// import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';
// import { SEND_LOGIN_OTP } from '../../GraphQL/Mutation';
// import { toast } from 'react-toastify'; // ✅ If using react-toastify for feedback
// import * as Yup from 'yup';
// import { useEffect } from 'react';

// export const LoginForm = () => {
// const validationSchema = Yup.object({
//   email: Yup.string().email('Invalid email').required('Required'),
// });

//   const dispatch = useDispatch();
//   const [submitted, setSubmitted] = useState(false);
//   const { emailExists } = useSelector((state) => state.login);

//   // ✅ GraphQL: Lazy query for checking email
//   const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
//     onCompleted: (data) => {
//       dispatch(setEmailExists(data.checkEmail));
//     },
//     onError: () => {
//       dispatch(setEmailExists(false));
//     },
//     fetchPolicy: 'no-cache',
//   });

//   // ✅ GraphQL: Mutation for sending OTP
//   const [sendOtp] = useMutation(SEND_LOGIN_OTP);

//   // ✅ Formik form setup
//   const formik = useFormik({
//     initialValues: {
//       email: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       const email = values.email;
//       const role = 'student'; // ✅ hardcoded role

//       setSubmitted(true);
//       dispatch(setEmail(email));

//       try {
//         // First check if the email exists
//         const { data } = await checkEmail({
//           variables: { email, role },
//         });

//         if (data?.checkEmail) {
//           dispatch(setEmailExists(true));

//           // Then send the OTP
//           await sendOtp({ variables: { email, role } });
//           toast.success('OTP sent to your email!');
//         } else {
//           dispatch(setEmailExists(false));
//           toast.error('Email does not exist!');
//         }
//       } catch (error) {
//         console.error('Error during login process:', error);
//         toast.error('Something went wrong. Please try again.');
//       }
//     },
//   });


//   useEffect(() => {
//   setSubmitted(false);
// }, [formik.values.email]);
//   return (
//     <Container className="mt-5" style={{ maxWidth: '400px' }}>
//       <Form onSubmit={formik.handleSubmit}>
//         <Form.Group className="mb-3" controlId="formEmail">
//           <Form.Label>Email address</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Enter email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             required
//           />
//         </Form.Group>

//         {submitted && emailExists === false && (
//           <p style={{ color: 'red', marginTop: '5px' }}>Email does not exist!</p>
//         )}
//         {submitted && emailExists === true && (
//           <p style={{ color: 'green', marginTop: '5px' }}>OTP sent to your email!</p>
//         )}

//         <Button
//           type="submit"
//           className="w-100"
//           style={{ backgroundColor: '#1d3557', border: 'none' }}
//         >
//           Send OTP
//         </Button>
//       </Form>
//     </Container>
//   );
// };
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

        const userRole = data.verifyLoginOtp.role;

        if (userRole === 'student') {
          navigate('/students/');
        } else if (userRole === 'faculty') {
          navigate('/faculty/');
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
