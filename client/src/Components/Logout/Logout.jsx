// components/LogoutButton.jsx
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { resetAuthState } from '../../Redux/loginSlice'; // Import the new action
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = ({ variant = 'link', className = '', icon = true }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(resetAuthState()); // Use the new action
        navigate('/');
    };

    return (
        <>
            <Button
                onClick={() => setShowConfirm(true)}
                variant={variant}
                className={`d-flex align-items-center ${className}`}
                style={variant === 'link' ? { 
                    color: 'white', 
                    padding: '12px 16px',
                    width: '100%',
                    textAlign: 'left',
                    backgroundColor: 'transparent',
                    border: 'none',
                    textDecoration:"none"
                } : {}}
            >
                {icon && <FiLogOut style={{ marginRight: '12px', fontSize: '1.1rem' }} />}
                Logout
            </Button>

            <Modal 
                show={showConfirm} 
                onHide={() => setShowConfirm(false)} 
                centered
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleLogout}
                        data-testid="confirm-logout-button"
                    >
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default LogoutButton;