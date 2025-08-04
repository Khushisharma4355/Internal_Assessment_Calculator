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
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setEmailExists } from '../../Redux/loginSlice';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CHECK_EMAIL } from '../../GraphQL/LoginQueries';
import { SEND_LOGIN_OTP } from '../../GraphQL/Mutation';
import { toast } from 'react-toastify'; // ✅ If using react-toastify for feedback

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [submitted, setSubmitted] = useState(false);
  const { emailExists } = useSelector((state) => state.login);

  // ✅ GraphQL: Lazy query for checking email
  const [checkEmail] = useLazyQuery(CHECK_EMAIL, {
    onCompleted: (data) => {
      dispatch(setEmailExists(data.checkEmail));
    },
    onError: () => {
      dispatch(setEmailExists(false));
    },
    fetchPolicy: 'no-cache',
  });

  // ✅ GraphQL: Mutation for sending OTP
  const [sendOtp] = useMutation(SEND_LOGIN_OTP);

  // ✅ Formik form setup
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      const email = values.email;
      const role = 'student'; // ✅ hardcoded role

      setSubmitted(true);
      dispatch(setEmail(email));

      try {
        // First check if the email exists
        const { data } = await checkEmail({
          variables: { email, role },
        });

        if (data?.checkEmail) {
          dispatch(setEmailExists(true));

          // Then send the OTP
          await sendOtp({ variables: { email, role } });
          toast.success('OTP sent to your email!');
        } else {
          dispatch(setEmailExists(false));
          toast.error('Email does not exist!');
        }
      } catch (error) {
        console.error('Error during login process:', error);
        toast.error('Something went wrong. Please try again.');
      }
    },
  });

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
            required
          />
        </Form.Group>

        {submitted && emailExists === false && (
          <p style={{ color: 'red', marginTop: '5px' }}>Email does not exist!</p>
        )}
        {submitted && emailExists === true && (
          <p style={{ color: 'green', marginTop: '5px' }}>OTP sent to your email!</p>
        )}

        <Button
          type="submit"
          className="w-100"
          style={{ backgroundColor: '#1d3557', border: 'none' }}
        >
          Send OTP
        </Button>
      </Form>
    </Container>
  );
};
