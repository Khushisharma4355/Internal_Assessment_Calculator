
import React from "react";
import { Announcements } from "../../Components/Announcement/Announcement.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav.jsx";

const StudentAnnouncements = () => {
  return (
    <Container fluid className>
      <Row className="g-0">
        {/* Sidebar */}
        <Col xs={12} md={3} className="mb-4 mb-md-0">
          <Stunav />
        </Col>

        {/* Announcements */}
        <Col xs={12} md={9}>
          <h3 className="mb-4"> 📢 Recent Announcements</h3>
          <Announcements />
        </Col>
      </Row>
    </Container>
  );
};

export default StudentAnnouncements;
