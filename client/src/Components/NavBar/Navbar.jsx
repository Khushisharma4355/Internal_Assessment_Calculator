import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './Nav.css'; // Custom CSS for layout

export const Navv = () => {
  return (                 
    <>
      {/* Top Navbar */}
      <Navbar 
      style={{background:"#1d3557"}} 
      expand="lg" className="top-navbar">
        <Container fluid>
          <Navbar.Brand href="/"><h1 style={{color:"white"}}><i style={{color:"#FDD835", fontFamily:"cursive"}}>Edu</i>Track</h1></Navbar.Brand>
        </Container>
      </Navbar>

      {/* Sidebar + Main Layout */}
      <Container fluid>
          <Col md={2} className="sidebar bg-light p-3">
            <Nav className="flex-column">
              <Nav.Link href="/">Students</Nav.Link>
              <Nav.Link href="/Assesments">Assesments</Nav.Link>
              <Nav.Link href="/Report">Report</Nav.Link>
              {/* <Nav.Link href="#settings">Settings</Nav.Link> */}
              <Nav.Link href="/logout" className="text-danger mt-5">Logout</Nav.Link>
            </Nav>
          </Col>
      </Container>
    </>
  );
};
