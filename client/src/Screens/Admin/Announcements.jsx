
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Toast,
  ToastContainer,
  Badge,
} from "react-bootstrap";



import { gql, useMutation, useQuery } from "@apollo/client";
import { AdminNav } from "../../Components/Admin/AdminNav"; // Sidebar component
// import { DELETE_ANNOUNCEMENT,UPDATE_ANNOUNCEMENT,GET_ANNOUNCEMENTS,CREATE_ANNOUNCEMENT } from "../../GraphQL/AnnouncementQueries";


// GraphQL Mutation
const CREATE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
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

// GraphQL Query
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
export const DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncement($id: ID!) {
    deleteAnnouncement(id: $id)
  }
`;

export const UPDATE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncement($id: ID!, $input: CreateAnnouncementInput!) {
    updateAnnouncement(id: $id, input: $input) {
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
      updatedAt
    }
  }
`;



const getBadgeVariant = (type) => {
  switch (type) {
    case "Exam":
      return "danger";
    case "Notice":
      return "warning";
    case "Event":
      return "info";
    default:
      return "secondary";
  }
};

export const AdminAnnouncements = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    file: null,
    emp_id: "",
  });

  const [showToast, setShowToast] = useState(false);

  const [editingId, setEditingId] = useState(null);


  const { data, loading: loadingAnnouncements, error, refetch } =
    useQuery(GET_ANNOUNCEMENTS);

  const [createAnnouncement, { loading }] = useMutation(CREATE_ANNOUNCEMENT, {
    onCompleted: () => {
      setShowToast(true);
      setFormData({
        title: "",
        description: "",
        type: "",
        file: null,
        emp_id: "",
      });
      refetch();
    },
  });

  const [updateAnnouncement] = useMutation(UPDATE_ANNOUNCEMENT);


  // Setup mutation
  const [deleteAnnouncement] = useMutation(DELETE_ANNOUNCEMENT);
  // Fix handleDelete to accept id
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this announcement?"
    );
    if (!confirmDelete) return;

    try {
      await deleteAnnouncement({ variables: { id } });
      refetch(); // refresh after deletion
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
      // 🔄 Update flow
      await updateAnnouncement({
        variables: {
          id: editingId,
          input: {
            title: formData.title.trim(),
            description: formData.description.trim(),
            type: formData.type,
            filePath: formData.file ? formData.file.name : formData.filePath,
            emp_id: formData.emp_id,
          },
        },
      });
    } else {
      // ➕ Create flow
      await createAnnouncement({
        variables: {
          input: {
            title: formData.title.trim(),
            description: formData.description.trim(),
            type: formData.type,
            filePath: formData.file ? formData.file.name : "",
            emp_id: formData.emp_id,
          },
        },
      });
    }

    // Reset form
    setFormData({
      title: "",
      description: "",
      type: "",
      filePath: "",
      emp_id: "",
      file: null,
    });
    setEditingId(null);
    refetch();

  } catch (err) {
    console.error("Save failed:", err.message);
  }
};



  const sortedAnnouncements =
    data?.getAnnouncements?.slice().sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ) || [];

  return (
    <Container fluid>
      <Row className="vh-100">
        {/* Sidebar */}
        <Col
          xs={12}
          md={3}
          lg={2}
          className="bg-light p-0 shadow-sm"
          style={{ minHeight: "100vh" }}
        >
          <AdminNav />
        </Col>

        {/* Main Content */}
        <Col xs={12} md={9} lg={10} className="p-4 overflow-auto">
          <h2 className="text-center mb-4 fw-bold" style={{ color: "#1d3557" }}>
            📢 Announcements
          </h2>

          {/* Toast */}
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

          {/* Form */}
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
                    <option>Exam</option>
                    <option>Notice</option>
                    <option>Event</option>
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
                  <Form.Label className="fw-semibold">
                    📎 Upload File (optional)
                  </Form.Label>
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
                  <Form.Label className="fw-semibold">👤 Teacher ID</Form.Label>
                  <Form.Control
                    type="text"
                    name="emp_id"
                    value={formData.emp_id}
                    onChange={handleChange}
                    placeholder="e.g. T102"
                    className="rounded-3 shadow-sm"
                    required
                  />
                </Col>
              </Row>

              <div className="d-flex justify-content-end mt-4">
                <Button
                  type="submit"
                  className="px-4 py-2 rounded-3 shadow-sm fw-semibold"
                  disabled={loading}
                  style={{ backgroundColor: "#1d3557", border: "none" }}
                >
                  📤 Post Announcement
                </Button>
              </div>
            </Form>
          </Card>

          {/* Announcements List */}
          <h5 className="mb-3 fw-semibold">📄 Recent Announcements</h5>
          {loadingAnnouncements ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-danger">{error.message}</p>
          ) : sortedAnnouncements.length === 0 ? (
            <p className="text-muted">No announcements yet.</p>
          ) : (
           

            <Row className="g-4">
              {sortedAnnouncements.map((ann) => (
                <Col md={6} lg={4} key={ann.id}>
                  <Card className="mb-4 shadow-sm h-100 border-0 rounded-4">
                    <Card.Body className="d-flex flex-column">
                      {/* Header: Title + Badge */}
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="mb-0 fw-semibold text-truncate">
                          {ann.title}
                        </Card.Title>
                        <Badge bg={getBadgeVariant(ann.type)} className="text-uppercase">
                          {ann.type}
                        </Badge>
                      </div>

                      {/* Date */}
                      <Card.Subtitle className="text-muted mb-3 small">
                        📅{" "}
                        {ann.createdAt && !isNaN(new Date(ann.createdAt))
                          ? new Date(ann.createdAt).toLocaleDateString()
                          : "Date not available"}
                      </Card.Subtitle>

                      {/* Description */}
                      <Card.Text className="text-secondary flex-grow-1" style={{ minHeight: "60px" }}>
                        {ann.description}
                      </Card.Text>

                      {/* Attachment */}
                      {/* {ann.filePath && ( */}
                        {/* <a
                          href={ann.filePath}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-outline-secondary rounded-2 mt-2"
                        >
                          📎 Download Attachment
                        </a> */}
                      {/* )} */}
{ann.filePath && (
      <a 
        href={`http://localhost:5000${ann.filePath}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="btn btn-sm btn-primary rounded-3"
        download
      >
        📥 Download Attachment
      </a>
    )}
                      {/* Footer Info */}
                      <div className="mt-3 pt-2 border-top small text-muted">
                        👤 <strong>{ann.createdBy.emp_name}</strong> ({ann.createdBy.emp_id})
                      </div>

                      {/* Actions */}
                      <div className="d-flex justify-content-end gap-2 mt-3">
                        {/* <Button
                          style={{ backgroundColor: "#1d3557" }}
                          size="sm"

                          className="rounded-2"
                          onClick={() => {
                            setFormData({
                              title: ann.title,
                              description: ann.description,
                              type: ann.type,
                              filePath: ann.filePath,
                              emp_id: ann.createdBy.emp_id,
                              file: null,
                            });
                            setEditingId(ann.id);
                          }}
                        >
                          Edit
                        </Button> */}
                        <Button
                          style={{ backgroundColor: "#1d3557" }}
                          size="sm"
                          className="rounded-2"
                          onClick={() => {
                            setFormData({
                              title: ann.title,
                              description: ann.description,
                              type: ann.type,
                              filePath: ann.filePath,
                              emp_id: ann.createdBy.emp_id,
                              file: null, // if you’re handling new upload
                            });
                            setEditingId(ann.id); // 👈 tells form this is EDIT mode
                          }}
                        >
                          Edit
                        </Button>


                        <Button
                          size="sm"
                          variant="danger"
                          className="rounded-2"
                          onClick={() => handleDelete(ann.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

          )}
        </Col>
      </Row>
    </Container>
  );
};

