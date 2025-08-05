import React from 'react';
import { Container, Card, Row, Col, Button, ListGroup, Alert, Spinner, Dropdown } from 'react-bootstrap';
import { AdminNav } from '../../Components/Admin/AdminNav';
import { FiBook, FiUsers, FiAlertCircle, FiUserPlus, FiUpload, FiMail, FiClipboard } from 'react-icons/fi';
import { BsPersonCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Modall } from '../../Components/Admin/modal';
import { useState } from 'react';
const GET_ADMIN_DATA = gql`
  query GetAdmin($empid: String!) {
    getAdmin(emp_id: $empid) {
      emp_id
      teacher {
        emp_name
        emp_email
        emp_phone
      }
      teacherCount
      studentCount
      courseCount
    }
  }
`;

export const AdminHome = () => {

    const navigate = useNavigate();
    const empid = "T001"; // This should be dynamically set based on logged-in admin


    //for add user modal
    const [modalShow, setModalShow] = React.useState(false);
    const [activeFormType, setActiveFormType] = useState('teacher'); //for form type 

    const { loading, error, data } = useQuery(GET_ADMIN_DATA, {
        variables: { empid },
    });

    if (loading) return (
        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
            <Spinner animation='border' variant='primary' />
        </div>
    );

    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                Error loading admin data: {error.message}
            </Alert>
        );
    }

    const adminData = data?.getAdmin;
    const adminName = adminData?.teacher?.emp_name || "Admin";
    const teacherCount = adminData?.teacherCount || 0;
    const studentCount = adminData?.studentCount || 0;
    const courseCount = adminData?.courseCount || 0;

    return (
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: window.innerWidth < 992 ? 'column' : 'row' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', flexShrink: 0 }} md={12} lg={2}>
                <AdminNav />
            </div>

            {/* Main Content */}
            <Container fluid style={{ padding: '2rem' }}>
                <Row className='mb-4'>
                    <Col>
                        <h2 style={{ color: '#1d3557' }}>Welcome, <span style={{ color: 'orange' }}>{adminName}</span></h2>
                        <p className="text-muted">Here's what's happening today</p>
                    </Col>
                </Row>

                {/* Stats Cards */}
                <Row>
                    <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                        <Card className='shadow-sm' onClick={() => { navigate("/admin/teachers") }}>
                            <Card.Body>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h6>Teachers</h6>
                                        <h3>{teacherCount}</h3>
                                    </div>
                                    <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                                        <FiUsers />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                        <Card className='shadow-sm' onClick={() => { navigate("/admin/students") }}>
                            <Card.Body>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <h6>Students</h6>
                                        <h3>{studentCount}</h3>
                                    </div>
                                    <div style={{ fontSize: "2rem", color: "#1d3557" }}>
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
                                        <h3>{courseCount}</h3>
                                    </div>
                                    <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                                        <FiBook />
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
                                    </div>
                                    <div style={{ fontSize: "2rem", color: "orange" }}>
                                        <FiAlertCircle />
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Quick Actions */}
                {/* Quick Actions */}
                <Row className="mt-4">
                    <Col>
                        <div className="d-flex gap-3 flex-wrap"> {/* Added flex-wrap for responsiveness */}
                            <Dropdown>
                                <Dropdown.Toggle style={{ backgroundColor: "#1d3557" }}>
                                    <FiUserPlus className="me-2" />
                                    Add User
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {/* <Dropdown.Item onClick={() => navigate("/admin/add-teacher")}> */}
                                    <Dropdown.Item onClick={() => 
                                        {setModalShow(true)
                                         setActiveFormType('teacher')
                                        }}>
                                        Add Teacher
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setModalShow(true)
                                        setActiveFormType('student')
                                    }}>
                                        Add Student
                                    </Dropdown.Item>
                                    <Modall
                                        show={modalShow}
                                        onHide={() => setModalShow(false)}
                                        formType={activeFormType}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-secondary">
                                    <FiUpload className="me-2" />
                                    Bulk Import
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate("/admin/bulk-import?type=teachers")}>
                                        Import Teachers
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate("/admin/bulk-import?type=students")}>
                                        Import Students
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate("/admin/bulk-import?type=courses")}>
                                        Import Courses
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Button variant="warning" onClick={() => navigate("/admin/send-announcement")}>
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
                                        <small className="text-muted">Today, 10:30 AM</small><br />
                                        <strong>Ms. Sharma</strong> submitted Math test marks
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <small className="text-muted">Yesterday, 3:45 PM</small><br />
                                        <strong>Mr. Khan</strong> requested course change
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <small className="text-muted">Yesterday, 11:20 AM</small><br />
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
                                    <div style={{ fontSize: "2rem", color: "#1d3557" }}>
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