import React from "react";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";

export const Attendance = () => {
  const attendancePercent = 94;

  return (
    <Container fluid className="bg-light min-vh-100 py-4">
      <Row>
        {/* Left side navigation */}
        <Col md={3} className="bg-white shadow-sm">
          <Stunav />
        </Col>

        {/* Main content */}
        <Col md={9} className="d-flex flex-column align-items-center justify-content-center">
          <Card className="shadow-lg p-4" style={{ width: "60%", borderRadius: "20px" }}>
            <Card.Body className="text-center">
              <h3 className="mb-4" style={{ fontWeight: "bold", color: "#2c3e50" }}>
                Attendance Overview
              </h3>

              {/* Percentage Display */}
              <h1 style={{ fontSize: "4rem", color: attendancePercent >= 75 ? "green" : "red" }}>
                {attendancePercent}%
              </h1>
              <p className="text-muted mb-4">
                Keep it up! Try to maintain above 75% to avoid shortage.
              </p>

              {/* Progress Bar */}
              <ProgressBar
                now={attendancePercent}
                label={`${attendancePercent}%`}
                variant={attendancePercent >= 75 ? "success" : "danger"}
                style={{ height: "25px", fontSize: "1rem" }}
              />

              {/* Message */}
              <p className="mt-4" style={{ fontSize: "1.1rem", color: "#34495e" }}>
                You've attended <strong>47</strong> out of <strong>50</strong> classes this semester.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
