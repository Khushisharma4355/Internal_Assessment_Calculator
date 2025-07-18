import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Nav.css'; // Custom CSS for layout

export const Navv = () => {
  return (                 
    <>
      {/* <Container fluid> */}
          {/* <Col md={2} className="sidebar bg-light p-3"> */}
          <h1 className="brand-heading">
  <i className="brand-sub">edu</i>Track
</h1>
<Nav className="flex-column">
  <Nav.Link as={Link} to="/" className="nav-link-custom">Students</Nav.Link>
  <Nav.Link as={Link} to="/assesments" className="nav-link-custom">Assessments</Nav.Link>
  <Nav.Link as={Link} to="/report" className="nav-link-custom">Report</Nav.Link>
  <Nav.Link as={Link} to="/logout" className="nav-link-custom text-danger mt-5">Logout</Nav.Link>
</Nav>

          {/* </Col> */}
      {/* </Container> */}
    </>
  );
};
