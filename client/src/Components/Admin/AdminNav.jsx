// import { Navbar, Nav, Container, NavDropdown,Dropdown } from "react-bootstrap"
// import "./navbar.css"
// import { Link } from "react-router-dom"
// export const AdminNav = () => {
//     return (
//         <>
//             <Navbar
//                 variant="dark"
//                 sticky="top" expand="lg" style={{
//                     backgroundColor: "#1d3557"
//                 }} className="m-0 p-3" sticky-top>
//                 <Container fluid className="m-0 p-0 justify-content-start">

//                     <Navbar.Brand as={Link} to="/">
//                         <img
//                             src="http://192.168.1.12/images/maimt_logo.png"
//                             width="40"
//                             height="40"
//                             className="d-inline-block align-top"
//                             alt="Maimt"
//                         />
//                         <span style={{ fontWeight: 'bold', fontSize: '1.6rem', color: 'white' }}><span style={{color:"orange"}}>Ur</span>Level</span>
//                     </Navbar.Brand>
//                     <Navbar.Toggle aria-controls="basic-navbar-nav " className="ms-auto" />
//                     <Navbar.Collapse id="basic-navbar-nav">
//                         <Nav className="me-auto fw-bold fs-5">
//                             <Nav.Link as={Link} to="/admin/">Home</Nav.Link>
//                             <Nav.Link as={Link} to="/admin/teachers">Teachers</Nav.Link>
//                             <Nav.Link as={Link} to="/admin/students">Students</Nav.Link>
//                             <Nav.Link as={Link} to="/admin/courses">Courses</Nav.Link>
//                             <Nav.Link as={Link} to="/admin/sendreports">Send Reports</Nav.Link>
//                         </Nav>
//                         <Nav className="fw-bold fs-5">
//                             <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Container>
//             </Navbar>
//         </>
//     )
// }
import React, { useState } from 'react';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import { FiMenu } from 'react-icons/fi';

export const AdminNav = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navStyle = ({ isActive }) => ({
    color: isActive ? 'orange' : 'white',
    textDecoration: 'none',
    padding: '10px 15px',
    display: 'block',
    fontWeight: 'bold',
  });

  return (
    <>
      {/* Hamburger Button for Small Screens */}
      <Button  onClick={handleShow} className="d-lg-none m-2" style={{ backgroundColor: '#1d3557', border: 'none' }}>
        <FiMenu size={24} />
      </Button>

      {/* Sidebar - Large screens */}
      <div
        className="d-none d-lg-block  text-white p-3"
        style={{ width: '220px', height: '100vh', position: 'fixed',backgroundColor: '#1d3557' }}
      >
        <div className="mb-4 d-flex align-items-center">
          <img
            src="http://192.168.1.12/images/maimt_logo.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            <span style={{ color: 'orange' }}>Ur</span>Level
          </span>
        </div>

        <Nav className="flex-column">
          <NavLink to="/admin/" style={navStyle}>Home</NavLink>
          <NavLink to="/admin/teachers" style={navStyle}>Teachers</NavLink>
          <NavLink to="/admin/students" style={navStyle}>Students</NavLink>
          <NavLink to="/admin/courses" style={navStyle}>Courses</NavLink>
          <NavLink to="/admin/sendreports" style={navStyle}>Send Reports</NavLink>
          <NavLink to="/logout" style={navStyle}>Logout</NavLink>
        </Nav>
      </div>

      {/* Offcanvas - Small screens */}
      <Offcanvas show={show} onHide={handleClose} className=" text-white" backdrop={false} style={{ backgroundColor: '#1d3557',width:"50%" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
              <span style={{ color: 'orange' }}>Ur</span>Level
            </span> */}
             <div className="mb-4 d-flex align-items-center">
          <img
            src="http://192.168.1.12/images/maimt_logo.png"
            alt="Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
            <span style={{ color: 'orange' }}>Ur</span>Level
          </span>
        </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          
          <Nav className="flex-column">
            <NavLink to="/admin/" onClick={handleClose} style={navStyle}>Home</NavLink>
            <NavLink to="/admin/teachers" onClick={handleClose} style={navStyle}>Teachers</NavLink>
            <NavLink to="/admin/students" onClick={handleClose} style={navStyle}>Students</NavLink>
            <NavLink to="/admin/courses" onClick={handleClose} style={navStyle}>Courses</NavLink>
            <NavLink to="/admin/sendreports" onClick={handleClose} style={navStyle}>Send Reports</NavLink>
            <NavLink to="/logout" onClick={handleClose} style={navStyle}>Logout</NavLink>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
