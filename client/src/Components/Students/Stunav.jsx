import React, { useState } from 'react';
import { Offcanvas, Button, Nav,Col } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiMenu, 
  FiHome, 
  FiUsers, 
  FiBook, 
  FiMail, 
  FiLogOut 
} from 'react-icons/fi';
import './sidebar.css';
import LogoutButton from '../Logout/Logout';
export const Stunav = () => {
    const [show, setShow] = useState(false);
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navStyle = (path) => ({
        color: isActive(path) ? 'orange' : 'white',
        textDecoration: 'none',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: '500',
        borderRadius: '4px',
        marginBottom: '8px',
        transition: 'all 0.3s ease',
        backgroundColor: isActive(path) ? 'rgba(255, 165, 0, 0.1)' : 'transparent',
        ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }
    });

    const iconStyle = {
        marginRight: '12px',
        fontSize: '1.1rem',
        color: 'inherit'
    };

    // Common navigation items to avoid duplication
    const navItems = [
        { path: '/students/', icon: <FiHome style={iconStyle} />, label: 'Home' },
        { path: '/students/assesments', icon: <FiUsers style={iconStyle} />, label: 'Assessment' },
        // { path: '/students/attendance', icon: <FiUsers style={iconStyle} />, label: 'Attendance' },
        // { path: '/student/', icon: <FiBook style={iconStyle} />, label: 'Logout' },
        // { path: '/admin/sendreports', icon: <FiMail style={iconStyle} />, label: 'Send Reports' }
    ];

    return (
        <>
            {/* Hamburger Button for Small Screens */}
            <Col md={12}>
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
                aria-label="Open navigation menu"
            >
                <FiMenu size={20} />
            </Button>
            </Col>
          

            {/* Sidebar - Large screens */}
            <nav
                className="d-none d-lg-flex flex-column justify-content-between p-4"
                style={{ 
                    width: '250px',
                    height: '100vh',
                    position: 'fixed',
                    backgroundColor: '#1d3557',
                    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
                    zIndex: 100
                }}
                aria-label="Main navigation"
            >
                <div>
                    <div className="mb-5 d-flex align-items-center">
                        <img
                            src="http://192.168.1.12/images/maimt_logo.png"
                            alt="UrLevel Logo"
                            width="35"
                            height="35"
                            className="me-2"
                        />
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                            <span style={{ color: 'orange' }}>Ur</span>Level
                        </span>
                    </div>

                    <Nav className="flex-column">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.path}
                                to={item.path} 
                                style={navStyle(item.path)}
                                aria-current={isActive(item.path) ? 'page' : undefined}
                            >
                                {item.icon} {item.label}
                            </NavLink>
                        ))}
                    </Nav>
                </div>

                <div>
                   <LogoutButton/> 
                    <div 
                        className="text-center mt-3 p-2 admin-indicator fw-bold"
                        aria-label="Admin privileges"
                        style={{ color: 'orange' }}
                    >
                        Student
                    </div>
                </div>
            </nav>

            {/* Offcanvas - Small screens */}
            <Offcanvas 
                show={show} 
                onHide={handleClose} 
                backdrop={true}
                responsive="lg" 
                style={{ 
                    backgroundColor: '#1d3557',
                    width: '75%',
                    maxWidth: '280px'
                }}
                aria-labelledby="offcanvas-nav-label"
            >
                <Offcanvas.Header closeButton closeVariant="white">
                    <Offcanvas.Title id="offcanvas-nav-label">
                        <div className="d-flex align-items-center">
                            <img
                                src="/images/maimt_logo.png"
                                alt="UrLevel Logo"
                                width="50"
                                height="35"
                            />
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                                <span style={{ color: 'orange' }}>Ur</span>Level
                            </span>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column justify-content-between">
                    <Nav className="flex-column">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.path}
                                to={item.path} 
                                onClick={handleClose}
                                style={navStyle(item.path)}
                                aria-current={isActive(item.path) ? 'page' : undefined}
                            >
                                {item.icon} {item.label}
                            </NavLink>
                        ))}
                    </Nav>

                    <div>
                       <LogoutButton/> 
                        
                        <div 
                            className="text-center mt-3 p-2 admin-indicator fw-bold"
                            aria-label="Admin privileges"
                            style={{ color: 'orange' }}
                        >
                            Student
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};