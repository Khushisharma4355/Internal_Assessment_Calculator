import React from 'react';
import { Row, Col, Container, Card, Badge, Spinner, Alert, ListGroup, Button } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";
import { useQuery, gql } from "@apollo/client";
import { FiUser, FiBook, FiAward, FiHash, FiCalendar, FiBarChart2, FiPieChart, FiAlertCircle } from "react-icons/fi";
import { BsPersonCheck } from "react-icons/bs";
import { Pie, Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { RingLoader } from '../../Components/Spinner/RingLoader';
// Register ChartJS components
ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, Title, PointElement, LineElement
);

// Modern color palette
const colors = {
  primary: '#1d3557',
  secondary: '#457b9d',
  accent: '#a8dadc',
  success: '#4cc9f0',
  warning: '#f72585',
  light: '#f8f9fa',
  dark: '#212529',
  white: '#ffffff'
};

const GET_STUDENT_BY_EMAIL = gql`
  query studentByEmail($student_email: String!) {
    studentByEmail(student_email: $student_email) {
      registrationNo
      student_name
      student_email
      rollno
      semester_id
      section_id
      course {
        courseName
      }
    }
  }
`;

const GET_ASSESSMENT = gql`
  query GetAssessment($regno: BigInt!) {
    getStudentAssessment(registrationNo: $regno) {
      registrationNo
      subjectCode
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
      subject {
        subjectName
      }
    }
  }
`;

const InfoCard = ({ icon, title, value, color = "primary" }) => (
  <Card className='shadow-sm mb-3' onClick={() => {}}>
    <Card.Body>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h6>{title}</h6>
          <h3 style={{ color: colors[color] }}>{value || "N/A"}</h3>
        </div>
        <div style={{ fontSize: "2rem", color: colors[color] }}>
          {icon}
        </div>
      </div>
    </Card.Body>
  </Card>
);

export const StuHome = () => {
  const student_email = localStorage.getItem("student_email") || "pallavigoswami153@gmail.com";

  // Fetch student info
  const { loading: loadingStudent, error: errorStudent, data: dataStudent } = useQuery(GET_STUDENT_BY_EMAIL, {
    variables: { student_email },
    skip: !student_email,
  });

  // When student data is loaded, get assessments with registrationNo
  const regno = dataStudent?.studentByEmail?.registrationNo;

  const { loading: loadingAssess, error: errorAssess, data: dataAssess } = useQuery(GET_ASSESSMENT, {
    variables: { regno },
    skip: !regno,
  });

  if (loadingStudent || loadingAssess) return (
    <RingLoader/>
  );

  if (errorStudent) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading student data: {errorStudent.message}
      </Alert>
    );
  }

  if (errorAssess) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading assessment data: {errorAssess.message}
      </Alert>
    );
  }

  if (!dataStudent?.studentByEmail) return (
    <Alert variant="warning" className="m-4">
      Student not found. Please check your login details.
    </Alert>
  );

  const {
    registrationNo,
    student_name,
    student_email: email,
    rollno,
    semester_id,
    section_id,
    course,
  } = dataStudent.studentByEmail;

  const assessments = dataAssess?.getStudentAssessment || [];

  // Calculate average marks across all assessments
  const averageMarks = assessments.length 
    ? (assessments.reduce((sum, item) => {
        const total = (item.Class_test_1 || 0) + (item.Class_test_2 || 0) + (item.MTE || 0) + (item.ETE || 0);
        return sum + (total / 4);
      }, 0) / assessments.length).toFixed(1)
    : 0;

  // Calculate average attendance
  const averageAttendance = assessments.length
    ? (assessments.reduce((sum, item) => sum + (item.attendance || 0), 0) / assessments.length)
    : 0;

  // Prepare data for charts
  const performanceData = {
    labels: assessments.map(a => a.subject?.subjectName || a.subjectCode),
    datasets: [
      {
        label: 'Average Marks',
        data: assessments.map(a => {
          const total = (a.Class_test_1 || 0) + (a.Class_test_2 || 0) + (a.MTE || 0) + (a.ETE || 0);
          return total / 4;
        }),
        backgroundColor: [
          colors.primary,
          colors.secondary,
          colors.accent,
          colors.success,
          colors.warning
        ],
        borderColor: colors.white,
        borderWidth: 2,
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [averageAttendance, 100 - averageAttendance],
        backgroundColor: [
          colors.success,
          colors.warning
        ],
        borderColor: colors.white,
        borderWidth: 2,
      },
    ],
  };

  const testScoresData = {
    labels: assessments.map(a => a.subject?.subjectName || a.subjectCode),
    datasets: [
      {
        label: 'Class Test 1',
        data: assessments.map(a => a.Class_test_1 || 0),
        backgroundColor: colors.primary,
        borderRadius: 4
      },
      {
        label: 'Class Test 2',
        data: assessments.map(a => a.Class_test_2 || 0),
        backgroundColor: colors.secondary,
        borderRadius: 4
      },
      {
        label: 'Mid-Term',
        data: assessments.map(a => a.MTE || 0),
        backgroundColor: colors.accent,
        borderRadius: 4
      },
      {
        label: 'End-Term',
        data: assessments.map(a => a.ETE || 0),
        backgroundColor: colors.success,
        borderRadius: 4
      },
    ],
  };

  const attendanceTrendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
    datasets: [
      {
        label: 'Attendance %',
        data: [85, 82, 90, 87, averageAttendance],
        fill: false,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        tension: 0.1
      }
    ]
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', flexDirection: window.innerWidth < 992 ? 'column' : 'row' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px', 
        flexShrink: 0,
        background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)'
      }}>
        <Stunav />
      </div>

      {/* Main Content */}
      <Container fluid style={{ padding: '2rem', backgroundColor: colors.light }}>
        <Row className='mb-4'>
          <Col>
            <h2 style={{ color: colors.primary }}>Welcome, <span style={{ color: 'orange' }}>{student_name}</span></h2>
            <p className="text-muted">Your academic dashboard for Semester {semester_id}</p>
          </Col>
          <Col md="auto" className="d-flex align-items-center">
            <FiCalendar className="me-2" />
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row>
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <InfoCard 
              icon={<FiAward />} 
              title="Average Marks" 
              value={`${averageMarks}%`} 
              color="primary"
            />
          </Col>
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <InfoCard 
              icon={<BsPersonCheck />} 
              title="Attendance" 
              value={`${averageAttendance.toFixed(1)}%`} 
              color="success"
            />
          </Col>
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <InfoCard 
              icon={<FiBook />} 
              title="Subjects" 
              value={assessments.length} 
              color="secondary"
            />
          </Col>
          <Col md={6} lg={3} className='mb-3 mb-lg-0'>
            <InfoCard 
              icon={<FiAlertCircle />} 
              title="Pending Tasks" 
              value="3" 
              color="warning"
            />
          </Col>
        </Row>

        {/* Quick Actions */}
        {/* <Row className="mt-4">
          <Col>
            <div className="d-flex gap-3 flex-wrap">
              <Button variant="primary">
                <FiCalendar className="me-2" />
                View Timetable
              </Button>
              <Button variant="outline-secondary">
                <FiBook className="me-2" />
                Study Materials
              </Button>
              <Button variant="warning">
                <FiAlertCircle className="me-2" />
                Report Issue
              </Button>
            </div>
          </Col>
        </Row> */}

        {/* Charts and Recent Activity Section */}
        <Row className="mt-4">
          {/* Subject Performance Pie Chart */}
          <Col md={12} lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Subject Performance</span>
                <FiPieChart />
              </Card.Header>
              <Card.Body>
                <div style={{ height: '250px' }}>
                  <Doughnut 
                    data={performanceData} 
                    options={{ 
                      maintainAspectRatio: false,
                      cutout: '70%',
                      plugins: {
                        legend: {
                          position: 'bottom'
                        }
                      }
                    }} 
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Attendance Trend Line Chart */}
          <Col md={12} lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Attendance Trend</span>
                <FiBarChart2 />
              </Card.Header>
              <Card.Body>
                <div style={{ height: '250px' }}>
                  <Line 
                    data={attendanceTrendData} 
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: false,
                          min: 70,
                          max: 100
                        }
                      }
                    }} 
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Today's Schedule */}
          <Col md={12} lg={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header>Today's Schedule</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Mathematics</span>
                    <div className="text-end">
                      <strong>9:00 - 10:00</strong>
                      <div className="text-success">
                        <small>Room 201</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Computer Science</span>
                    <div className="text-end">
                      <strong>10:30 - 11:30</strong>
                      <div className="text-success">
                        <small>Lab 3</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>English</span>
                    <div className="text-end">
                      <strong>12:00 - 1:00</strong>
                      <div className="text-success">
                        <small>Room 105</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>Physics</span>
                    <div className="text-end">
                      <strong>2:00 - 3:00</strong>
                      <div className="text-success">
                        <small>Room 302</small>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Second Row */}
        <Row>
          {/* Detailed Test Scores */}
          <Col md={12} lg={6} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Detailed Test Scores</span>
                <FiBarChart2 />
              </Card.Header>
              <Card.Body>
                <div style={{ height: '250px' }}>
                  <Bar 
                    data={testScoresData}
                    options={{ 
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 100,
                          title: {
                            display: true,
                            text: 'Marks (%)',
                          },
                          ticks: {
                            callback: value => value + '%'
                          }
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                        }
                      }
                    }} 
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Recent Announcements */}
          <Col md={12} lg={6} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Header>Recent Announcements</Card.Header>
              <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <small className="text-muted">Today, 10:30 AM</small><br />
                    <strong>Mathematics Test</strong> scheduled for Friday
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 3:45 PM</small><br />
                    <strong>Library</strong> will remain closed tomorrow
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Monday, 11:20 AM</small><br />
                    <strong>Sports Day</strong> registration now open
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Last Friday, 9:15 AM</small><br />
                    <strong>Exam Schedule</strong> has been updated
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};