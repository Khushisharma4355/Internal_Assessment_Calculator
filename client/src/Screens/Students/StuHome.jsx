import React from 'react';
import { Row, Col, Container, Card, Badge, Spinner, Alert } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";
import { useQuery, gql } from "@apollo/client";
import { FiUser, FiBook, FiAward, FiHash, FiCalendar, FiBarChart2, FiPieChart } from "react-icons/fi";
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

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
  <Card className={`border-0 bg-${color}-subtle mb-3`}>
    <Card.Body className="d-flex align-items-center">
      <div className={`bg-${color} bg-opacity-10 p-3 rounded-circle me-3`}>
        {React.cloneElement(icon, { className: `text-${color} fs-4` })}
      </div>
      <div>
        <h6 className="mb-0">{title}</h6>
        <p className="mb-0 fw-bold">{value || "N/A"}</p>
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
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (errorStudent) return (
    <Alert variant="danger" className="m-4">
      Error loading student data: {errorStudent.message}
    </Alert>
  );

  if (errorAssess) return (
    <Alert variant="danger" className="m-4">
      Error loading assessment data: {errorAssess.message}
    </Alert>
  );

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
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [averageAttendance, 100 - averageAttendance],
        backgroundColor: [
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const testScoresData = {
    labels: assessments.map(a => a.subject?.subjectName || a.subjectCode),
    datasets: [
      {
        label: 'Class Test 1',
        data: assessments.map(a => a.Class_test_1 || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
      },
      {
        label: 'Class Test 2',
        data: assessments.map(a => a.Class_test_2 || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
      {
        label: 'Mid-Term',
        data: assessments.map(a => a.MTE || 0),
        backgroundColor: 'rgba(255, 206, 86, 0.7)',
      },
      {
        label: 'End-Term',
        data: assessments.map(a => a.ETE || 0),
        backgroundColor: 'rgba(153, 102, 255, 0.7)',
      },
    ],
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ flexShrink: 0, width: "250px" }}>
        <Stunav />
      </div>

      {/* Main Content */}
      <Container fluid className="p-0 bg-light">
        {/* Header with welcome message */}
        <div className="bg-primary bg-opacity-10 p-4">
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1 fw-bold">Welcome back, {student_name}!</h2>
              <p className="text-muted mb-0">
                Here's your academic overview for Semester {semester_id}
              </p>
            </Col>
            <Col xs="auto">
              <Badge bg="primary" pill className="px-3 py-2">
                <FiCalendar className="me-1" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Badge>
            </Col>
          </Row>
        </div>

        <Container className="py-4">
          {/* Student Information Section */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body className="p-4">
              <Row className="align-items-center">
                <Col md="auto" className="text-center mb-4 mb-md-0">
                  <div className="avatar-xl bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center">
                    <FiUser className="text-primary fs-1" />
                  </div>
                </Col>
                <Col>
                  <Row>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiHash />} 
                        title="Registration No" 
                        value={registrationNo} 
                        color="info"
                      />
                    </Col>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiAward />} 
                        title="Roll Number" 
                        value={rollno} 
                        color="warning"
                      />
                    </Col>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiBook />} 
                        title="Course" 
                        value={course?.courseName} 
                        color="success"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiCalendar />} 
                        title="Semester" 
                        value={semester_id} 
                        color="primary"
                      />
                    </Col>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiUser />} 
                        title="Section" 
                        value={section_id} 
                        color="secondary"
                      />
                    </Col>
                    <Col md={4}>
                      <InfoCard 
                        icon={<FiBook />} 
                        title="Subjects" 
                        value={assessments.length} 
                        color="danger"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Performance Summary Cards */}
          <Row className="mb-4 g-3">
            <Col md={4}>
              <Card className="border-0 shadow-sm bg-success bg-opacity-10">
                <Card.Body className="text-center">
                  <FiAward className="text-success fs-3 mb-2" />
                  <h3 className="mb-1">{averageMarks}%</h3>
                  <small className="text-muted">Average Marks</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm bg-info bg-opacity-10">
                <Card.Body className="text-center">
                  <FiCalendar className="text-info fs-3 mb-2" />
                  <h3 className="mb-1">{averageAttendance.toFixed(1)}%</h3>
                  <small className="text-muted">Average Attendance</small>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm bg-primary bg-opacity-10">
                <Card.Body className="text-center">
                  <FiBook className="text-primary fs-3 mb-2" />
                  <h3 className="mb-1">{assessments.length}</h3>
                  <small className="text-muted">Subjects Enrolled</small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="g-4">
            {/* Subject Performance */}
            <Col lg={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FiPieChart className="text-primary fs-4 me-2" />
                    <h5 className="mb-0">Subject Performance</h5>
                  </div>
                  <div style={{ height: '300px' }}>
                    <Doughnut 
                      data={performanceData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              padding: 15
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Attendance Overview */}
            <Col lg={6}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FiPieChart className="text-info fs-4 me-2" />
                    <h5 className="mb-0">Attendance Overview</h5>
                  </div>
                  <div style={{ height: '300px' }}>
                    <Pie 
                      data={attendanceData}
                      options={{
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              padding: 15
                            }
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Detailed Test Scores */}
            <Col xs={12}>
              <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <FiBarChart2 className="text-success fs-4 me-2" />
                    <h5 className="mb-0">Detailed Test Scores</h5>
                  </div>
                  <div style={{ height: '350px' }}>
                    <Bar 
                      data={testScoresData}
                      options={{
                        maintainAspectRatio: false,
                        responsive: true,
                        scales: {
                          y: {
                            beginAtZero: true,
                            max: 100,
                            title: {
                              display: true,
                              text: 'Marks (%)',
                              font: {
                                weight: 'bold'
                              }
                            }
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Subjects',
                              font: {
                                weight: 'bold'
                              }
                            }
                          }
                        },
                        plugins: {
                          legend: {
                            position: 'top',
                            labels: {
                              padding: 15,
                              font: {
                                size: 12
                              }
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};