import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="display-3 fw-bold text-warning">404</h1>
          <h2 className="mb-3">Hmm... This page wandered off</h2>
          <p className="text-muted mb-4">
            We looked everywhere but couldn’t find what you were looking for.  
            It might have been moved, deleted, or maybe it never existed.  
            Don’t worry — let’s head back to where you were.
          </p>
          <Button
            variant="secondary"
            className="d-flex align-items-center mx-auto"
            onClick={() => navigate(-1)}
          >
            <FiArrowLeft className="me-2" /> Go Back
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
