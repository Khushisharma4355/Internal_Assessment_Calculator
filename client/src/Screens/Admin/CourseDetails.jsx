import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { Spinner, Alert, Container, Row, Col, Card } from "react-bootstrap";
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

export const CourseDetails = () => {
  const { courseId } = useParams();
  const { loading, error, data } = useQuery(GET_COURSE_DETAILS, {
    variables: { courseId },
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        Error loading course details: {error.message}
      </Alert>
    );
  }

  // FIX: access courseById, not course
  const course = data.courseById;

  if (!course) {
    return (
      <Alert variant="warning" className="mt-4">
        Course not found.
      </Alert>
    );
  }

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <AdminNav />
      </div>
      <Container className="bg-light p-4">
        <Row>
          <Col className="d-flex justify-content-center mb-4">
            <h1>{course.courseName || "No Course Name"}</h1>
          </Col>
        </Row>

        <Row>
          {course.semesters && course.semesters.length > 0 ? (
            course.semesters.map((sem) => (
              <Col key={sem.semester_id} md={4} sm={6} xs={12} className="mb-4">
                <Card className="shadow-sm h-100">
                  <Card.Body>
                    <Card.Title>{sem.semester_Name || "No Semester Name"}</Card.Title>
                    <Card.Text>
                      <strong>Subjects:</strong>
                      <ul className="mb-0">
                        {sem.subjects && sem.subjects.length > 0 ? (
                          sem.subjects.map((sub) => (
                            <li key={sub.subjectCode}>
                              {sub.subjectName || "No Name"} ({sub.subjectCode || "N/A"})
                            </li>
                          ))
                        ) : (
                          <li>No subjects found</li>
                        )}
                      </ul>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <Alert variant="info">No semesters found for this course.</Alert>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};


