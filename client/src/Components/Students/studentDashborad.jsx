import React, { useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import student2 from '../../assets/student2.jpg';


import { Stunav } from './Stunav';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CiHome } from "react-icons/ci";
import { MdOutlineAssessment } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GrScorecard } from "react-icons/gr";

import { MdLogout } from "react-icons/md";
import './StudentDashboard.css'; // <-- Add custom CSS
import { Footer } from '../Footer/Footer';

export const StudentDashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const navItemStyle = {
    backgroundColor: '#1d3557',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    fontSize: "23px"
  };

  return (
    <Container fluid className="p-0">
      <Row className="min-vh-100 m-0 ">
        {/* Sidebar for large screens */}
        <Col md={3} className="d-none d-md-block ">
          <Stunav />
        </Col>

        {/* Hamburger for small screens */}
   {/* Row for Logo and Hamburger (on small screens only) */}
<Row className="d-md-none align-items-center shadow-sm px-3 py-2">
  {/* Logo on the left */}
  <Col xs="auto" className="d-flex align-items-center">
    <img
      src="http://192.168.1.12/images/maimt_logo.png"
      width="40"
      height="40"
      className="me-2"
      alt="Maimt"
    />
    <span style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
      <span style={{ color: "orange" }}>Ur</span>Level
    </span>
  </Col>

  {/* Hamburger on the right */}
  <Col className="d-flex justify-content-end">
    <button
      onClick={() => setShowSidebar(!showSidebar)}
      style={{
        background: 'transparent',
        border: 'none',
        fontSize: '1.8rem',
        color: '#1d3557',
        cursor: 'pointer',
      }}
    >
      ☰
    </button>
  </Col>
</Row>

         
        {/* Mobile Sidebar Slide-in */}
        <div className={`mobile-sidebar ${showSidebar ? 'show' : ''}`}>
          <div className="text-end p-3">
            <button
              onClick={() => setShowSidebar(false)}
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                color: 'white',
              }}
            >
              ✕
            </button>
          </div>
        <Nav className="flex-column fw-bold fs-5">
        <Nav.Link as={Link} to="/students/" className="text-white" ><CiHome />Home</Nav.Link>
        <Nav.Link as={Link} to="/students/assesments" className="text-white"><MdOutlineAssessment /> Assesments</Nav.Link>
        <Nav.Link as={Link} to="/students/reports" className="text-white"><GrScorecard /> Report</Nav.Link>
        <Nav.Link as={Link} to="/students/attendance" className="text-white"><SlCalender /> Attendance</Nav.Link>
        <Nav.Link as={Link} to="/student/logout" className="text-white"><MdLogout /> Log out</Nav.Link>
      </Nav>
        </div>

        {/* Main Content */}
        <Col md={9} xs={12} className="bg-white ">
          <Card className='ms-0'>
            <Card.Header className="text-center text-white" style={{ backgroundColor: '#1d3557' }}>
              <h4>Your Profile</h4>
            </Card.Header>
            <Card.Body className="text-center">
              <div
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: '120px',
                  height: '120px',
                  overflow: 'hidden',
                  border: '3px solid #1d3557',
                }}
              >
                <img 
                  src={student2}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h5><strong>Name:</strong>Sarita Rana</h5>
              <p><strong>Email:</strong>saritarana@example.com</p>
              <p><strong>Class Roll No:</strong>23</p>
              <p><strong>University Roll No:</strong>MAIMT23CS123</p>
            </Card.Body>
          </Card>
           
    <div className="mt-5 px-0">
    <Footer />
  </div>
        </Col>
      </Row>
  
 

    </Container>
  );
};


