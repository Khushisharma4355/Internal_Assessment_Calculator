import React from "react";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useQuery, gql } from "@apollo/client";
import { Alert, Container, Row, Col, Spinner, Card } from "react-bootstrap";

const GET_COURSES = gql`
  query GetCourses {
    courses {
      courseId
      courseName
    }
  }
`;

export const Course = () => {
  const { loading, error, data } = useQuery(GET_COURSES);

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
        Error Loading Course Data: {error.message}
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
            <h1>Courses</h1>
          </Col>
        </Row>
        <Row>
          {data.courses.map((course) => (
            <Col key={course.courseId} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{course.courseName}</Card.Title>
                  <Card.Text>
                    <strong>ID:</strong> {course.courseId}
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
