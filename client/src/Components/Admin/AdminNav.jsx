import React, { useState } from 'react';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiHome, FiUsers, FiBook, FiMail, FiLogOut } from 'react-icons/fi';
import './sidebar.css';

export const AdminNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navStyle = ({ isActive }) => ({
        color: isActive ? 'orange' : 'white',
        textDecoration: 'none',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        borderRadius: '4px',
        marginBottom: '8px',
        transition: 'all 0.3s ease',
        backgroundColor: isActive ? 'rgba(255, 165, 0, 0.1)' : 'transparent',
    });

    const iconStyle = {
        marginRight: '12px',
        fontSize: '1.1rem',
        color: 'inherit'
    };

    return (
        <>
            {/* Hamburger Button for Small Screens */}
            <Button 
                onClick={handleShow} 
                className="d-lg-none m-2" 
                style={{ 
                    backgroundColor: '#1d3557',
                    border: 'none',
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1000
                }}
            >
                <FiMenu size={20} />
            </Button>

            {/* Sidebar - Large screens */}
            <div
                className="d-none d-lg-flex flex-column justify-content-between p-4"
                style={{ 
                    width: '250px',
                    height: '100vh',
                    position: 'fixed',
                    backgroundColor: '#1d3557',
                    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 100
                }}
            >
                <div>
                    <div className="mb-5 d-flex align-items-center">
                        <img
                            src="http://192.168.1.12/images/maimt_logo.png"
                            alt="Logo"
                            width="40"
                            height="40"
                            className="me-2"
                            style={{ borderRadius: '50%' }}
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                            <span style={{ color: 'orange' }}>Ur</span>Level
                        </span>
                    </div>

                    <Nav className="flex-column">
                        <NavLink to="/admin/" style={navStyle}>
                            <FiHome style={iconStyle} /> Home
                        </NavLink>
                        <NavLink to="/admin/teachers" style={navStyle}>
                            <FiUsers style={iconStyle} /> Teachers
                        </NavLink>
                        <NavLink to="/admin/students" style={navStyle}>
                            <FiUsers style={iconStyle} /> Students
                        </NavLink>
                        <NavLink to="/admin/courses" style={navStyle}>
                            <FiBook style={iconStyle} /> Courses
                        </NavLink>
                        <NavLink to="/admin/sendreports" style={navStyle}>
                            <FiMail style={iconStyle} /> Send Reports
                        </NavLink>
                    </Nav>
                </div>

                <div>
                    <NavLink to="/logout" style={navStyle}>
                        <FiLogOut style={iconStyle} /> Logout
                    </NavLink>
                    
                    {/* Admin indicator at bottom */}
                    <div className="text-center mt-3 p-2" style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '4px',
                        color: 'orange',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        ADMIN
                    </div>
                </div>
            </div>

            {/* Offcanvas - Small screens */}
            <Offcanvas 
                show={show} 
                onHide={handleClose} 
                backdrop={true} 
                style={{ 
                    backgroundColor: '#1d3557',
                    width: '75%',
                    maxWidth: '280px'
                }}
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title>
                        <div className="d-flex align-items-center">
                            <img
                                src="http://192.168.1.12/images/maimt_logo.png"
                                alt="Logo"
                                width="50"
                                height="35"
                                // className="me-2"
                                style={{ borderRadius: '10%', border:"10"}}
                            />
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                                <span style={{ color: 'orange' }}>Ur</span>Level
                            </span>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column justify-content-between">
                    <Nav className="flex-column">
                        <NavLink to="/admin/" onClick={handleClose} style={navStyle}>
                            <FiHome style={iconStyle} /> Home
                        </NavLink>
                        <NavLink to="/admin/teachers" onClick={handleClose} style={navStyle}>
                            <FiUsers style={iconStyle} /> Teachers
                        </NavLink>
                        <NavLink to="/admin/students" onClick={handleClose} style={navStyle}>
                            <FiUsers style={iconStyle} /> Students
                        </NavLink>
                        <NavLink to="/admin/courses" onClick={handleClose} style={navStyle}>
                            <FiBook style={iconStyle} /> Courses
                        </NavLink>
                        <NavLink to="/admin/sendreports" onClick={handleClose} style={navStyle}>
                            <FiMail style={iconStyle} /> Send Reports
                        </NavLink>
                    </Nav>

                    <div>
                        <NavLink to="/logout" onClick={handleClose} style={navStyle}>
                            <FiLogOut style={iconStyle} /> Logout
                        </NavLink>
                        
                        {/* Admin indicator at bottom for mobile */}
                        <div className="text-center mt-3 p-2" style={{ 
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderRadius: '4px',
                            color: 'orange',
                            fontWeight: '600',
                            fontSize: '0.9rem'
                        }}>
                            ADMIN
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};