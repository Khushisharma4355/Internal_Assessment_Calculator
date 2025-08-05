// // import {Navv} from "../../Components/Students/NavBar/Navbar"
// import { Row,Col,Container } from "react-bootstrap"
// import { TeaNav } from "../../Components/Teachers/TeaNav"
// // import { TeacherDashboard } from "../../Components/Teachers/TeacherDashboard"
// import { TeacherDashboard } from "../../Components/Teachers/TeacherDashboard.jsx"

// export const TeaHome=()=>{
//     return(
    //     <>
    //     <div className="d-flex">
    //         <div style={{flexShrink:0, width:"250px"}}>
    //        <TeaNav/>
    //         </div>

    //     <Container className="bg-light">
    //         <Row >
    //       <Col className="d-flex  justify-content-center">
    //    <TeacherDashboard/>
    //             </Col>
    //         </Row>
    //     </Container>
    //     </div>
    //     </>
//     )
// }




import React from 'react';
import { Container, Card, Row, Col, Button, ListGroup, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiBookOpen, FiUsers, FiClipboard, FiUpload, FiMail, FiFileText, FiAlertCircle } from 'react-icons/fi';
import { TeaNav } from '../../Components/Teachers/TeaNav';
import { useQuery, gql } from '@apollo/client';

// ==================== GraphQL Queries ====================

const GET_TEACHER = gql`
  query GetTeacher($emp_id: ID!) {
    getTeacher(emp_id: $emp_id) {
      emp_name
      emp_email
    }
  }
`;

const GET_TEACHER_CLASSES = gql`
  query GetTeacherClasses($emp_id: ID!) {
    getTeacherClasses(emp_id: $emp_id) {
      courseId
      courseName
      semester_id
      section_id
      subjectCode
      subjectName
    }
  }
`;

const GET_STUDENTS_BY_CLASS = gql`
  query GetStudentsByClass($emp_id: ID!, $courseId: ID!, $semester_id: ID!, $section_id: String!) {
    getStudentsByClass(
      emp_id: $emp_id,
      courseId: $courseId,
      semester_id: $semester_id,
      section_id: $section_id
    ) {
      registrationNo
      student_name
    }
  }
`;

export const TeaHome = () => {
  const navigate = useNavigate();
  const emp_id = "T001"; // Hardcoded for now, later get from login context

  // Queries
  const { data: teacherData, loading: teacherLoading } = useQuery(GET_TEACHER, {
    variables: { emp_id },
  });

  const { data: classData, loading: classLoading } = useQuery(GET_TEACHER_CLASSES, {
    variables: { emp_id },
  });

  // Derive subjects and students from classData
  const classes = classData?.getTeacherClasses || [];

  // Unique subjects
  const subjectsSet = new Set(classes.map(cls => cls.subjectCode));
  const totalSubjects = subjectsSet.size;

  // Unique classes for "My Classes"
  const uniqueClassesSet = new Set(
    classes.map(cls => `${cls.courseId}-${cls.semester_id}-${cls.section_id}`)
  );
  const totalClasses = uniqueClassesSet.size;

  // Simulated student count — in real case you'd want a batch query
  const estimatedStudents = totalClasses * 30; // assume ~30 per class

  if (teacherLoading || classLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const teacherName = teacherData?.getTeacher?.emp_name || "Teacher";

  return (
     <>
        <div className="d-flex">
            <div style={{flexShrink:0, width:"250px"}}>
           <TeaNav/>
            </div>

        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
       {/* <TeacherDashboard/> */}
                
      


      {/* Main Content */}
      <Container fluid style={{ padding: '2rem' }}>
        {/* Welcome Message */}
        <Row className='mb-4'>
          <Col>
            <h2 style={{ color: '#1d3557' }}>Welcome, <span style={{ color: 'orange' }}>{teacherName}</span></h2>
            <p className="text-muted">Here's a quick look at your dashboard</p>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row>
          <Col md={6} lg={3} className='mb-3'>
            <Card className='shadow-sm' onClick={() => navigate("/teacher/classes")}>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>My Classes</h6>
                    <h3>{totalClasses}</h3>
                  </div>
                  <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                    <FiBookOpen />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className='mb-3'>
            <Card className='shadow-sm' onClick={() => navigate("/teacher/students")}>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Students</h6>
                    <h3>{estimatedStudents}</h3>
                  </div>
                  <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                    <FiUsers />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className='mb-3'>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Subjects</h6>
                    <h3>{totalSubjects}</h3>
                  </div>
                  <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                    <FiFileText />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className='mb-3'>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Pending Marks</h6>
                    <h3>2</h3> {/* Hardcoded for now */}
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
        <Row className="mt-4">
          <Col>
            <div className="d-flex gap-4">
              <Button style={{ backgroundColor: "#1d3557" }} onClick={() => navigate("/teacher/marks-entry")}>
                <FiClipboard className="me-2" />
                Enter Marks
              </Button>
              <Button variant="outline-secondary">
                <FiUpload className="me-2" />
                Bulk Upload
              </Button>
              <Button variant="warning">
                <FiMail className="me-2" />
                Send Message
              </Button>
            </div>
          </Col>
        </Row>

        {/* Recent Activity + Attendance */}
        <Row className="mt-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <small className="text-muted">Today, 9:45 AM</small><br />
                    You submitted IA marks for <strong>DBMS</strong>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 2:30 PM</small><br />
                    Sent message to <strong>BCA-A</strong> about test
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 11:00 AM</small><br />
                    Checked attendance for <strong>BBA 2nd Sem</strong>
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
                    <h3>92%</h3>
                    <small className="text-danger">Low: MBA-A (78%)</small>
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
    </Col>
            </Row>
        </Container>
        </div>
      </>
  );
};
