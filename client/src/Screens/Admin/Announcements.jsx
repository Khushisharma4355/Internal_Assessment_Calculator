

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Badge,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createAnnouncement
} from "../../Redux/announcementSlice"; // Adjust path as needed

const getBadgeVariant = (type) => {
  switch (type) {
    case "Date Sheet":
      return "primary";
    case "Time Table":
      return "success";
    case "Event":
      return "warning";
    case "General":
    default:
      return "info";
  }
};

export const AdminAnnouncements = () => {
  const dispatch = useDispatch();
  const { announcements, loading } = useSelector((state) => state.announcement);
  const user = useSelector((state) => state.login?.user); // Ensure user reducer is defined

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    file: null,
    date: "",
  });

  const [showToast, setShowToast] = useState(false);

  // useEffect(() => {
  //   dispatch(fetchAnnouncements());
  // }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const fakeFileUrl = formData.file ? URL.createObjectURL(formData.file) : "";

    const announcementData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      type: formData.type,
      fileUrl: fakeFileUrl,
      createdAt: formData.date || new Date().toLocaleDateString(),
      uploadedBy: user?.name || "Admin",
    };

    dispatch(createAnnouncement(announcementData)).then(() => {
      setShowToast(true);
      setFormData({
        title: "",
        description: "",
        type: "",
        file: null,
        date: "",
      });
    });
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100" >
      <h2 className="text-center mb-4 fw-bold" style={{ color: '#1d3557' }}>📢 Announcements</h2>

      {/* ✅ Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">
            ✅ Announcement posted successfully!
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* ✅ Announcement Form */}
      <Card className="p-4 shadow-sm mb-5 border-0 rounded-4">
        <h5 className="mb-4 fw-semibold">📝 Create a New Announcement</h5>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-semibold">📌 Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Mid-Sem Date Sheet Released"
                className="rounded-3 shadow-sm"
                required
              />
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold">📂 Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="rounded-3 shadow-sm"
                required
              >
                <option value="">Select type</option>
                <option>Date Sheet</option>
                <option>Time Table</option>
                <option>Event</option>
                <option>General</option>
              </Form.Select>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">🧾 Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write announcement details here..."
              className="rounded-3 shadow-sm"
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label className="fw-semibold">📎 Upload File (optional)</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleChange}
                accept=".pdf,.jpg,.png"
                className="rounded-3 shadow-sm"
              />
              {formData.file && (
                <div className="small mt-1 text-muted">
                  Selected: {formData.file.name}
                </div>
              )}
            </Col>
            <Col md={6}>
              <Form.Label className="fw-semibold">📅 Publish Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="rounded-3 shadow-sm"
                required
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end mt-4">
            <Button
              type="submit"
              // variant="primary"
              className="px-4 py-2 rounded-3 shadow-sm fw-semibold"
              disabled={loading}
              style={{ backgroundColor: '#1d3557', border: 'none' }}
            >
              📤 Post Announcement
            </Button>
          </div>
        </Form>
      </Card>

      {/* ✅ Announcements List */}
      <h5 className="mb-3 fw-semibold">📄 Recent Announcements</h5>
      {loading ? (
        <p>Loading...</p>
      ) : announcements?.length === 0 ? (
        <p className="text-muted">No announcements yet.</p>
      ) : (
        <Row>
          {announcements.map((ann, idx) => (
            <Col md={6} lg={4} key={idx}>
              <Card className="mb-4 shadow-sm h-100 border-0 rounded-4">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Card.Title className="mb-0 text-truncate">{ann.title}</Card.Title>
                    <Badge bg={getBadgeVariant(ann.type)}>{ann.type}</Badge>
                  </div>
                  <Card.Subtitle className="text-muted mb-2 small">
                    📅 {ann.createdAt || "N/A"}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary" style={{ minHeight: "60px" }}>
                    {ann.description}
                  </Card.Text>

                  {ann.fileUrl && (
                    <a
                      href={ann.fileUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline-secondary rounded-2"
                    >
                      📎 Download Attachment
                    </a>
                  )}

                  <div className="text-muted small mt-3">
                    👤 Uploaded by: <strong>{ann.uploadedBy}</strong>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AdminAnnouncements;
