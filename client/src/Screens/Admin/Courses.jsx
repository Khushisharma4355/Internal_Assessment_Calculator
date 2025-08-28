import React, { useState, useEffect } from "react";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useQuery, gql } from "@apollo/client";
import { 
  Alert, 
  Container, 
  Row, 
  Col, 
  Card,
  Button,
  Badge
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiBook, FiPlus } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { GET_COURSES } from "../../GraphQL/Queries";

export const Course = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_COURSES);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <RingLoader />;

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Error Loading Courses</Alert.Heading>
          <p>{error.message}</p>
          <Button variant="outline-danger" size="sm" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

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

        {/* Courses Section */}
        <Container fluid className="p-0">
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 className="mb-0 d-flex align-items-center" style={{ color: "#1d3557", fontWeight: "600" }}>
                <FiBook className="me-2" size={24} /> Courses
              </h2>
            </Col>
            <Col xs="auto">
              <Button 
                variant="primary" 
                onClick={() => navigate("/admin/courses/new")}
                className="d-flex align-items-center"
              >
                <FiPlus className="me-2" /> Add Course
              </Button>
            </Col>
          </Row>

          <Row className="g-4">
            {data.courses.map((course) => (
              <Col key={course.courseId} xl={3} lg={4} md={6} sm={12}>
                <Card 
                  onClick={() => navigate(`/admin/courses/${course.courseId}`)}
                  className="h-100 shadow-sm hover-shadow"
                  style={{ 
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    borderLeft: "4px solid #0d6efd"
                  }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg="light" text="dark" className="fs-6">
                        #{course.courseId}
                      </Badge>
                    </div>
                    <Card.Title className="mb-3">{course.courseName}</Card.Title>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/admin/courses/${course.courseId}`);
                      }}
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {data.courses.length === 0 && (
            <Alert variant="info" className="mt-4">
              No courses available. Click "Add Course" to create one.
            </Alert>
          )}
        </Container>
      </div>
    </div>
  );
};
