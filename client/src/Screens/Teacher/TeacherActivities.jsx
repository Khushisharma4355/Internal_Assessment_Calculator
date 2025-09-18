import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/client';
import { GET_TEACHER_ACTIVITIES } from '../../GraphQL/Queries';
import moment from 'moment';
import { FiClipboard } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { TeaNav } from '../../Components/Teachers/TeaNav';
import { FaBars, FaTimes } from 'react-icons/fa';

export const TeacherActivities = () => {
  const navigate = useNavigate();
  const emp_id = "T001"; // replace with login context later

  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, loading, error } = useQuery(GET_TEACHER_ACTIVITIES, {
    variables: { emp_id, limit: 100 },
    fetchPolicy: 'network-only'
  });

  const activities = data?.getTeacherActivities || [];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ width: "250px", background: "#fff", borderRight: "1px solid #dee2e6", zIndex: 1000 }}
      >
        <TeaNav />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3 p-md-4"
        style={isMobile ? { width: "100%" } : { marginLeft: "250px", width: "calc(100% - 250px)" }}
      >
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button variant="outline-secondary" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
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
              onClick={e => e.stopPropagation()}
            >
              <TeaNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        <Container fluid className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>All Activities</h2>
            <Button variant="secondary" onClick={() => navigate(-1)}>Back</Button>
          </div>

          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : error ? (
            <Alert variant="danger">Failed to load activities: {error.message}</Alert>
          ) : activities.length === 0 ? (
            <p className="text-muted">No activities found</p>
          ) : (
            <ListGroup>
              {activities.map(activity => (
                <ListGroup.Item key={activity.id} className="d-flex align-items-center py-3">
                  <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                    <FiClipboard size={20} color="#1d3557" />
                  </div>
                  <div>
                    <small className="text-muted">{moment(parseInt(activity.createdAt)).fromNow()}</small>
                    <p className="mb-0">
                      {activity.action} {activity.details && <>– <strong>{activity.details}</strong></>}
                      <br />
                      <small className="text-muted">By: {activity.teacher?.emp_name}</small>
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Container>
      </div>
    </div>
  );
};
