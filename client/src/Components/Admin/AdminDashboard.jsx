import React from 'react';
import { Container, Card, Row, Col, Button, ListGroup, NavLink } from 'react-bootstrap';
import { AdminNav } from '../../Components/Admin/AdminNav';
import { FiBook, FiUsers, FiAlertCircle, FiUserPlus, FiUpload, FiMail,FiClipboard } from 'react-icons/fi';
import { BsPersonCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useQuery,gql } from '@apollo/client';
// const GET_ADMIN=gql`
      
// `
export const AdminDashboard = () => {
  const navigate=useNavigate();
  // const
  const adminName="Dr Narinder Rana"
  return (
  <div style={{ display: 'flex', minHeight: '100vh', flexDirection: window.innerWidth < 992 ? 'column' : 'row' }}>
      {/* Sidebar */}
      <Col style={{ width: '250px', flexShrink: 0}} md={12} lg={2}>
       
        <AdminNav />
       
      </Col>
      
      {/* Main Content */}
      <Container fluid style={{padding:'2rem'}}>
        <Row className='mb-4'>
          <Col>
           <h2 style={{color:'#1d3557'}}>Welcome, <span style={{color: 'orange'}}>{adminName}</span></h2>
            <p className="text-muted">Here's what's happening today</p>
          </Col>
        </Row>
        
        {/* Stats Cards */}
        <Row>
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <Card className='shadow-sm' onClick={()=>{navigate("/admin/teachers")}}>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Teachers</h6>
                    <h3>40</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <FiUsers />
                  </div>
                </div>
              </Card.Body>
            </Card>
            {/* </NavLink> */}
          </Col>
          
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <Card className='shadow-sm' onClick={()=>{navigate("/admin/students")}}>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Students</h6>
                    <h3>400</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <BsPersonCheck />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Courses</h6>
                    <h3>5</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <FiBook/>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <Card className='shadow-sm' >
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Pending Actions</h6>
                    <h3>8</h3>
                    {/* <small className="text-muted">5 marks to approve</small><br/>
                    <small className="text-muted">3 messages to review</small> */}
                  </div>
                  <div style={{fontSize:"2rem", color:"orange"}}>
                    <FiAlertCircle />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Quick Actions */}
        <Row className="mt-4">
          <Col>
            <div className="d-flex gap-5">
              <Button style={{backgroundColor:"#1d3557"}}>
                <FiUserPlus className="me-2" />
                Add Student
              </Button>
              <Button variant="outline-secondary">
                <FiUpload className="me-2" />
                Bulk Import
              </Button>
              <Button variant="warning">
                <FiMail className="me-2" />
                Send Announcement
              </Button>
            </div>
          </Col>
        </Row>
        
        {/* Recent Activity */}
        <Row className="mt-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <small className="text-muted">Today, 10:30 AM</small><br/>
                    <strong>Ms. Sharma</strong> submitted Math test marks
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 3:45 PM</small><br/>
                    <strong>Mr. Khan</strong> requested course change
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 11:20 AM</small><br/>
                    <strong>System</strong> 15 new student accounts created
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
  <Card className='shadow-sm'>
    <Card.Body>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h6>Today's Attendance</h6>
          <h3>87%</h3>
          <small className="text-danger">Low: 9th-B (72%)</small>
        </div>
        <div style={{fontSize:"2rem", color:"#1d3557"}}>
          <FiClipboard />
        </div>
      </div>
    </Card.Body>
  </Card>
</Col>
        </Row>
      </Container>
    </div>
  );
};