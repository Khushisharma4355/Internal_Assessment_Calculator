import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import './Announcement.css';

const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      id
      title
      description
      type
      filePath
      createdBy {
        emp_id
        emp_name
      }
      createdAt
    }
  }
`;

const getBadgeVariant = (type) => {
  switch (type.toLowerCase()) {
    case "info":
      return "info";        // blue
    case "urgent":
      return "danger";      // red
    case "general":
      return "secondary";   // gray
    case "event":
      return "success";     // green
    case "exam":
    case "exam notice":
      return "warning";     // yellow/orange
    default:
      return "primary";     // fallback blue
  }
};

export const Announcements = () => {
  const { data, loading, error } = useQuery(GET_ANNOUNCEMENTS);

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  if (error) return <p className="text-danger">Error: {error.message}</p>;

  const announcements = data.getAnnouncements;

  if (!announcements.length)
    return <p className="text-muted">No announcements yet.</p>;

  return (
   

   <Row className="g-4">
  {announcements.map((ann) => (
    <Col md={6} lg={4} key={ann.id}>
      <Card className="announcement-card mb-4 h-100">
        <Card.Body className="d-flex flex-column">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <Card.Title className="fw-bold text-truncate title-text">
              {ann.title}
            </Card.Title>
            <Badge pill bg={getBadgeVariant(ann.type)} className="px-3 py-2">
              {ann.type}
            </Badge>
          </div>

          {/* Date */}
          <Card.Subtitle className="text-muted small mb-2">
            📅 {ann.createdAt
              ? new Date(ann.createdAt).toLocaleDateString()
              : "Date not available"}
          </Card.Subtitle>

          {/* Description */}
          <Card.Text className="text-secondary flex-grow-1 description-text">
            {ann.description}
          </Card.Text>

          {/* Attachment */}
          {ann.filePath && (
            <a
              href={ann.filePath}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-primary rounded-pill mt-2"
            >
              📎 Download Attachment
            </a>
          )}

          {/* Footer */}
          <div className="mt-3 pt-3 border-top d-flex justify-content-between small text-muted">
            <span>
              👤 <strong>{ann.createdBy.name}</strong> ({ann.createdBy.emp_id})
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>




  );
};

// export default Announcements;
