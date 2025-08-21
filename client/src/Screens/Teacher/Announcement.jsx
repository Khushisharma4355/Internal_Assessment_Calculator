
import React from "react";
import { Announcements } from "../../Components/Announcement/Announcement.jsx";
import { Container, Row, Col } from "react-bootstrap";
import { TeaNav } from "../../Components/Teachers/TeaNav.jsx"; // assuming teacher nav component

const TeacherAnnouncements = () => {
  return (
    <Container fluid className="mt-4">
      <Row className="gx-2">
        {/* Sidebar */}
        <Col xs={12} md={3} className="mb-4 mb-md-0">
          <TeaNav />
        </Col>

        {/* Announcements */}
        <Col xs={12} md={9}>
          <h3 className="mb-4">📢 Recent Announcements</h3>
          <Announcements />
        </Col>
      </Row>
    </Container>
  );
};

export default TeacherAnnouncements;
