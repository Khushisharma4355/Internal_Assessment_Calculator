import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_ACTIVITIES } from "../../GraphQL/Queries";
import {
  Container,
  Card,
  ListGroup,
  Alert,
  Spinner,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMenu, FiX, FiCalendar } from "react-icons/fi";
import { AdminNav } from "../../Components/Admin/AdminNav";

const AdminActivities = () => {
  const { data, loading, error } = useQuery(GET_ACTIVITIES, {
    variables: { limit: 50 },
  });

  const activities = data?.getActivities || [];
  const navigate = useNavigate();

  // Sidebar responsive logic
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {/* Sidebar Navigation */}
      <div
        className="d-none d-lg-block"
        style={{
          width: "250px",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1030,
        }}
      >
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className={`flex-grow-1 p-3 p-md-4 ${isDesktop ? "ms-lg-250" : ""}`}>
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="d-flex align-items-center"
          >
            {isMobileNavOpen ? <FiX className="me-1" /> : <FiMenu className="me-1" />}
            Menu
          </Button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMobileNavOpen && (
          <div
            className="d-lg-none position-fixed top-0 start-0 h-100 w-100"
            style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className="h-100 bg-white"
              style={{ width: "75%", maxWidth: "280px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AdminNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Page Header */}
        <Container style={{ marginLeft: isDesktop ? 250 : 0, width: "auto" }}>
          <Row className="mb-4 align-items-center">
            <Col>
              <h2 style={{ color: "#1d3557" }}>All Activities</h2>
              <p className="text-muted">Track system-wide recent actions</p>
            </Col>
            <Col md="auto" className="d-flex align-items-center">
              <FiCalendar className="me-2" />
              <span>
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Col>
          </Row>

          {/* Back Button */}
          <Row className="mb-3">
            <Col>
              <Button
                variant="outline-primary"
                className="d-flex align-items-center"
                onClick={() => navigate("/admin")}
              >
                <FiArrowLeft className="me-2" />
                Back to Dashboard
              </Button>
            </Col>
          </Row>

          {/* Activities Card */}
          <Card className="shadow-sm">
            <Card.Header>Recent Activities</Card.Header>
            <Card.Body style={{ maxHeight: "500px", overflowY: "auto" }}>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" />
                </div>
              )}
              {error && (
                <Alert variant="danger">Error loading activities</Alert>
              )}
              {!loading && activities.length === 0 && (
                <p className="text-muted">No activities found</p>
              )}

              <ListGroup variant="flush">
                {activities.map((activity) => (
                  <ListGroup.Item key={activity.id}>
                    <small className="text-muted">
                      {new Date(activity.createdAt).toLocaleString()}
                    </small>
                    <br />
                    <strong>{activity.teacher?.emp_name || "System"}</strong>{" "}
                    {activity.action}
                    {activity.details && (
                      <div className="text-muted">{activity.details}</div>
                    )}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default AdminActivities;
