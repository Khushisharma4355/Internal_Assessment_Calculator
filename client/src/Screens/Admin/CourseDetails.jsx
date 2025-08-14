import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Spinner, Alert, Container, Row, Col, Card, Button } from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";

const GET_COURSE_DETAILS = gql`
  query GetCourseDetails($courseId: ID!) {
    courseById(courseId: $courseId) {
      courseName
      semesters {
        semester_id
        semester_Name
        subjects {
          subjectCode
          subjectName
        }
      }
    }
  }
`;

const GET_ALL_TEACHERS = gql`
  query GetAllTeachers {
    getAllTeachers {
      emp_id
      emp_name
      emp_email
      emp_phone
      Subjects {
        section_id
        subjectCode
        subject {
          subjectName
        }
      }
    }
  }
`;

export const CourseDetails = () => {
  const { courseId } = useParams();

  const { loading: courseLoading, error: courseError, data: courseData } = useQuery(GET_COURSE_DETAILS, {
    variables: { courseId },
    fetchPolicy: "no-cache",
  });

  const { loading: teacherLoading, error: teacherError, data: teacherData } = useQuery(GET_ALL_TEACHERS);

  const [selectedSemester, setSelectedSemester] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  if (courseLoading || teacherLoading)
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" />
      </div>
    );

  if (courseError || teacherError)
    return (
      <Alert variant="danger" className="mt-4">
        Error loading data: {courseError?.message || teacherError?.message}
      </Alert>
    );

  const course = courseData?.courseById;
  if (!course)
    return (
      <Alert variant="warning" className="mt-4">
        Course not found.
      </Alert>
    );

  const semesters = course.semesters || [];
  const teachers = teacherData?.getAllTeachers || [];

  // Filter teachers who teach the selected subject
  const subjectTeachers = selectedSubject
    ? teachers.filter((t) =>
        t.Subjects.some((s) => s.subjectCode === selectedSubject.subjectCode)
      )
    : [];

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <AdminNav />
      </div>

      <Container className="bg-light p-4">
        {/* Always show Course Name */}
        <h1 className="text-center mb-2">{course.courseName}</h1>

        {/* Show Semester Name if a semester is selected */}
        {selectedSemester && !selectedSubject && (
          <h4 className="text-center mb-4">Semester: {selectedSemester.semester_Name}</h4>
        )}

        {/* Show Subject Name and back button if viewing teachers */}
        {selectedSubject && (
          <>
            <Col xs={12} className="mb-3">
              <Button variant="secondary" onClick={() => setSelectedSubject(null)}>
                ← Back to Subjects
              </Button>
            </Col>
            <h4 className="text-center mb-2">{selectedSemester.semester_Name}</h4>
            <h5 className="text-center mb-4">Subject: {selectedSubject.subjectName}</h5>
          </>
        )}

        <Row>
          {/* Show semesters if none selected */}
          {!selectedSemester
            ? semesters.map((sem) => (
                <Col key={sem.semester_id} md={4} sm={6} xs={12} className="mb-4">
                  <Card className="shadow-sm h-100">
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <Card.Title>Semester {sem.semester_Name}</Card.Title>
                      <Button variant="primary" onClick={() => setSelectedSemester(sem)}>
                        View Subjects
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            : !selectedSubject
            ? (
                <>
                  {/* Back button to semesters */}
                  <Col xs={12} className="mb-3">
                    <Button variant="secondary" onClick={() => setSelectedSemester(null)}>
                      ← Back to Semesters
                    </Button>
                  </Col>

                  {/* Show subjects */}
                  {selectedSemester.subjects?.map((sub) => {
                    const teachersForSub = teachers.filter((t) =>
                      t.Subjects.some((s) => s.subjectCode === sub.subjectCode)
                    );

                    return (
                      <Col key={sub.subjectCode} md={4} sm={6} xs={12} className="mb-4">
                        <Card className="shadow-sm h-100">
                          <Card.Body className="d-flex flex-column justify-content-between">
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
              )
            : (
                <>
                  {/* Show teachers for selected subject */}
                  {subjectTeachers.map((t) => (
                    <Col key={t.emp_id} md={4} sm={6} xs={12} className="mb-4">
                      <Card className="shadow-sm h-100">
                        <Card.Body>
                          <Card.Title>{t.emp_name}</Card.Title>
                          <Card.Text>Email: {t.emp_email}</Card.Text>
                          <Card.Text>Phone: {t.emp_phone}</Card.Text>
                          {/* <Button variant="primary">Assign to Class</Button> */}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </>
              )
          }
        </Row>
      </Container>
    </div>
  );
};
