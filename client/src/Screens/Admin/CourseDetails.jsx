import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { 
  Alert, 
  Container, 
  Row, 
  Col, 
  Card, 
  Button 
} from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiBookOpen } from "react-icons/fi";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { GET_ALL_TEACHERS,GET_COURSE_DETAILS } from "../../GraphQL/Queries";

export const CourseDetails = () => {
  const { courseId } = useParams();

  const { loading: courseLoading, error: courseError, data: courseData } = useQuery(GET_COURSE_DETAILS, {
    variables: { courseId },
    fetchPolicy: "no-cache",
  });

  const { loading: teacherLoading, error: teacherError, data: teacherData } = useQuery(GET_ALL_TEACHERS);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (courseLoading || teacherLoading) return <RingLoader />;

  if (courseError || teacherError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error Loading Course Details</Alert.Heading>
          <p>{courseError?.message || teacherError?.message}</p>
          <Button variant="outline-danger" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  const course = courseData?.courseById;
  if (!course) {
    return (
      <Alert variant="warning" className="mt-4">
        Course not found.
      </Alert>
    );
  }

  const semesters = course.semesters || [];
  const teachers = teacherData?.getAllTeachers || [];

  const subjectTeachers = selectedSubject
    ? teachers.filter((t) =>
        t.Subjects.some((s) => s.subjectCode === selectedSubject.subjectCode)
      )
    : [];

  return (
    <div className="d-flex">
      {/* Sidebar (Desktop) */}
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ width: "250px", background: "#fff", borderRight: "1px solid #dee2e6" }}
      >
        <AdminNav />
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
              <AdminNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Course Details */}
        <Container fluid className="p-0">
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="mb-0 d-flex align-items-center" style={{ color: "#1d3557", fontWeight: "600" }}>
                <FiBookOpen className="me-2" size={24} /> {course.courseName}
              </h2>
            </Col>
          </Row>

          {/* Semester / Subject / Teachers View */}
          <Row className="g-4">
            {/* Show semesters */}
            {!selectedSemester &&
              semesters.map((sem) => (
                <Col key={sem.semester_id} xl={3} lg={4} md={6} sm={12}>
                  <Card className="h-100 shadow-sm hover-shadow" style={{ cursor: "pointer" }}>
                    <Card.Body className="d-flex flex-column">
                      <Card.Title className="mb-3">Semester {sem.semester_Name}</Card.Title>
                      <Button
                        variant="primary"
                        onClick={() => setSelectedSemester(sem)}
                        className="mt-auto"
                      >
                        View Subjects
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}

            {/* Show subjects */}
            {selectedSemester && !selectedSubject && (
              <>
                <Col xs={12}>
                  <Button variant="secondary" className="mb-3" onClick={() => setSelectedSemester(null)}>
                    ← Back to Semesters
                  </Button>
                </Col>
                {selectedSemester.subjects?.map((sub) => {
                  const teachersForSub = teachers.filter((t) =>
                    t.Subjects.some((s) => s.subjectCode === sub.subjectCode)
                  );
                  return (
                    <Col key={sub.subjectCode} xl={3} lg={4} md={6} sm={12}>
                      <Card className="h-100 shadow-sm hover-shadow">
                        <Card.Body>
                          <Card.Title>{sub.subjectName}</Card.Title>
                          <Card.Text>Code: {sub.subjectCode}</Card.Text>
                          {teachersForSub.length > 0 ? (
                            <Button variant="success" onClick={() => setSelectedSubject(sub)}>
                              View Teachers
                            </Button>
                          ) : (
                            <Button
                              variant="warning"
                              onClick={() => alert(`Assign teacher to ${sub.subjectName}`)}
                            >
                              Assign Teacher
                            </Button>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </>
            )}

            {/* Show teachers */}
            {selectedSubject && (
              <>
                <Col xs={12}>
                  <Button variant="secondary" className="mb-3" onClick={() => setSelectedSubject(null)}>
                    ← Back to Subjects
                  </Button>
                </Col>
                {subjectTeachers.map((t) => (
                  <Col key={t.emp_id} xl={3} lg={4} md={6} sm={12}>
                    <Card className="h-100 shadow-sm hover-shadow">
                      <Card.Body>
                        <Card.Title>{t.emp_name}</Card.Title>
                        <Card.Text>Email: {t.emp_email}</Card.Text>
                        <Card.Text>Phone: {t.emp_phone}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};
