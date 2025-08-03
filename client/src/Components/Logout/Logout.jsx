import React, { useState } from 'react';
import { Container, Button, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setEmail, setEmailExists } from '../../Redux/loginSlice';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {

  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = () => {
    // Clear login-related states
    dispatch(setEmail(''));
    dispatch(setEmailExists(null));
    setLoggedOut(true);
    navigate('/')

    // Optional: You can redirect using react-router-dom here
    // navigate("/login"); or show a logout message
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h4 className="mb-3 text-center">Are you sure you want to logout?</h4>

      {loggedOut ? (
        <Alert variant="success" className="text-center">
          You have been successfully logged out.
        </Alert>
      ) : (
        <Button
          onClick={handleLogout}
          className="w-100"
          style={{ backgroundColor: '#1d3557', border: 'none' }}
        >
          Logout
          
        </Button>
      )}
    </Container>
  );
};
