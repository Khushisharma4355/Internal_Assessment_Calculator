import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, ListGroup, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen, FiUsers, FiClipboard, FiUpload, FiMail, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { TeaNav } from '../../Components/Teachers/TeaNav';
import { useQuery } from '@apollo/client';
import { GET_TEACHER, GET_TEACHER_CLASSES, GET_STUDENTS_BY_TEACHER } from '../../GraphQL/Queries';
import { RingLoader } from '../../Components/Spinner/RingLoader';
import { FaBars, FaTimes } from "react-icons/fa";

export const TeaHome = () => {
  const navigate = useNavigate();
  const emp_id = "T001"; // Hardcoded for now, later get from login context
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Queries
  const { data: teacherData, loading: teacherLoading, error: teacherError } = useQuery(GET_TEACHER, {
    variables: { emp_id },
  });

  const { data: classData, loading: classLoading, error: classError } = useQuery(GET_TEACHER_CLASSES, {
    variables: { emp_id },
  });

  const { data: studentsData, loading: studentsLoading, error: studentsError } = useQuery(GET_STUDENTS_BY_TEACHER, {
    variables: { emp_id },
  });

  if (teacherLoading || classLoading || studentsLoading) {
    return <RingLoader/>;
  }

  if (teacherError || classError || studentsError) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading data: {teacherError?.message || classError?.message || studentsError?.message}
      </Alert>
    );
  }

  // Process data from backend
  const teacherClasses = classData?.getTeacherClasses || [];
  const allStudents = studentsData?.getStudentsByTeacher || [];
  const teacherName = teacherData?.getTeacher?.emp_name || "Teacher";

  // Calculate metrics
  const totalClasses = teacherClasses.length;
  const totalStudents = allStudents.length;
  
  // Get unique subjects
  const subjectsSet = new Set(teacherClasses.map(cls => cls.subjectCode));
  const totalSubjects = subjectsSet.size;

  // Count pending marks (example implementation - modify based on your actual data)
  const pendingMarksCount = allStudents.filter(student => 
    !student.marksSubmitted // Replace with your actual condition
  ).length;

  return (
    <div className="d-flex">
      {/* Sidebar (Desktop) */}
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ 
          width: "250px", 
          background: "#fff", 
          borderRight: "1px solid #dee2e6",
          zIndex: 1000
        }}
      >
        <TeaNav />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3 p-md-4"
        style={
          isMobile
            ? { width: "100%" }
            : { marginLeft: "250px", width: "calc(100% - 250px)" }
        }
      >
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? <FaTimes className="me-1" /> : <FaBars className="me-1" />}
            Menu
          </Button>
        </div>

        {/* Mobile Overlay Nav */}
        {isMobileNavOpen && (
          <div
            className="d-lg-none position-fixed top-0 start-0 h-100 w-100"
            style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className="h-100"
              style={{ width: "75%", maxWidth: "280px", background: "#fff" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TeaNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <Container fluid className="p-0">
          {/* Welcome Message */}
          <Row className='mb-4'>
            <Col>
              <h2 style={{ color: '#1d3557' }}>Welcome, <span style={{ color: 'orange' }}>{teacherName}</span></h2>
              <p className="text-muted">Here's a quick look at your dashboard</p>
            </Col>
          </Row>

          {/* Stats Cards */}
          <Row className="g-4 mb-4">
            <Col md={6} lg={3}>
              <Card className='shadow-sm border-0 h-100' onClick={() => navigate("/teacher/classes")}>
                <Card.Body className="d-flex flex-column">
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h6 className="mb-0">My Classes</h6>
                    <div style={{ fontSize: "1.5rem", color: "#1d3557" }}>
                      <FiBookOpen />
                    </div>
                  </div>
                  <h3 className="mb-0">{totalClasses}</h3>
                  <small className="text-muted mt-auto">View all classes</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className='shadow-sm border-0 h-100' onClick={() => navigate("/teacher/students")}>
                <Card.Body className="d-flex flex-column">
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h6 className="mb-0">Students</h6>
                    <div style={{ fontSize: "1.5rem", color: "#1d3557" }}>
                      <FiUsers />
                    </div>
                  </div>
                  <h3 className="mb-0">{totalStudents}</h3>
                  <small className="text-muted mt-auto">Manage all students</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className='shadow-sm border-0 h-100'>
                <Card.Body className="d-flex flex-column">
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h6 className="mb-0">Subjects</h6>
                    <div style={{ fontSize: "1.5rem", color: "#1d3557" }}>
                      <FiFileText />
                    </div>
                  </div>
                  <h3 className="mb-0">{totalSubjects}</h3>
                  <small className="text-muted mt-auto">Subjects you teach</small>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className='shadow-sm border-0 h-100'>
                <Card.Body className="d-flex flex-column">
                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h6 className="mb-0">Pending Marks</h6>
                    <div style={{ fontSize: "1.5rem", color: "orange" }}>
                      <FiAlertCircle />
                    </div>
                  </div>
                  <h3 className="mb-0">{pendingMarksCount}</h3>
                  <small className="text-muted mt-auto">Require your attention</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Quick Actions */}
          <Row className="mt-4 mb-4">
            <Col>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex flex-wrap gap-3">
                    <Button 
                      style={{ backgroundColor: "#1d3557", border: 'none' }} 
                      onClick={() => navigate("/teacher/marks-entry")}
                    >
                      <FiClipboard className="me-2" />
                      Enter Marks
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => navigate("/teacher/bulk-upload")}
                    >
                      <FiUpload className="me-2" />
                      Bulk Upload
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      onClick={() => navigate("/teacher/messages")}
                    >
                      <FiMail className="me-2" />
                      Send Message
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activity + Attendance */}
          <Row className="g-4">
            <Col lg={8}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                  <h5 className="mb-0">Recent Activity</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="border-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiClipboard size={20} color="#1d3557" />
                        </div>
                        <div>
                          <small className="text-muted">Today, 9:45 AM</small>
                          <p className="mb-0">You submitted IA marks for <strong>DBMS</strong></p>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiMail size={20} color="#1d3557" />
                        </div>
                        <div>
                          <small className="text-muted">Yesterday, 2:30 PM</small>
                          <p className="mb-0">Sent message to <strong>BCA-A</strong> about test</p>
                        </div>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 py-3">
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                          <FiUsers size={20} color="#1d3557" />
                        </div>
                        <div>
                          <small className="text-muted">Yesterday, 11:00 AM</small>
                          <p className="mb-0">Checked attendance for <strong>BBA 2nd Sem</strong></p>
                        </div>
                      </div>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className='shadow-sm border-0 h-100'>
                <Card.Header style={{ backgroundColor: 'white', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
                  <h5 className="mb-0">Today's Attendance</h5>
                </Card.Header>
                <Card.Body>
                  <div className="text-center py-3">
                    <div 
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        backgroundColor: '#e9f5ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        border: '5px solid #1d3557'
                      }}
                    >
                      <h2 className="mb-0" style={{ color: '#1d3557' }}>92%</h2>
                    </div>
                    <h5 className="mb-1">Overall Attendance</h5>
                    <small className="text-danger">
                      <strong>Lowest:</strong> MBA-A (78%)
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};