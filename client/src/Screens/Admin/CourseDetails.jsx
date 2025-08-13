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

  const course = data.course;

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <AdminNav />
      </div>
      <Container className="bg-light p-4">
        {/* Course title */}
        <Row>
          <Col className="d-flex justify-content-center mb-4">
            <h1>{course.courseName}</h1>
          </Col>
        </Row>

        {/* Semester cards */}
        <Row>
          {course.semesters.map((sem) => (
            <Col key={sem.sem_id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title>{sem.sem_name}</Card.Title>
                  <Card.Text>
                    <strong>Subjects:</strong>
                    <ul className="mb-0">
                      {sem.subjects.map((sub) => (
                        <li key={sub.subjectCode}>
                          {sub.subjectName} ({sub.subjectCode})
                        </li>
                      ))}
                    </ul>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
