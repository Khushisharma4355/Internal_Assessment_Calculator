import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Spinner,
  Table,
  Alert,
  Container,
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  Form,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaUserShield, FaBars, FaTimes } from "react-icons/fa";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { GET_ALL_TEACHERS } from "../../GraphQL/Queries";
import { ADD_ADMIN, REMOVE_ADMIN } from "../../GraphQL/Mutation";
import { useEffect } from "react";
export const TeacherMgmt = () => {
 
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992); // lg breakpoint

      useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [addAdmin] = useMutation(ADD_ADMIN, {
    refetchQueries: ["GetAllTeachers"],
    awaitRefetchQueries: true,
  });

  const [removeAdmin] = useMutation(REMOVE_ADMIN, {
    refetchQueries: ["GetAllTeachers"], // refresh teacher list after removal
    awaitRefetchQueries: true,
  });

  const { loading, error, data } = useQuery(GET_ALL_TEACHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [currentAdminLoading, setCurrentAdminLoading] = useState(null);
  const [deletingAdmin, setDeletingAdmin] = useState(null);

  if (loading) return <RingLoader />;
  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error loading teachers</Alert.Heading>
        <p>{error.message}</p>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Alert>
    );
  }

  const handleMakeAdmin = async (emp_id) => {
    setCurrentAdminLoading(emp_id);
    try {
      await addAdmin({
        variables: { emp_id },
      });
    } catch (err) {
      console.error("Error making admin:", err.message);
    } finally {
      setCurrentAdminLoading(null);
    }
  };

  const handleRemoveAdmin = async (emp_id) => {
    if (!window.confirm("Are you sure you want to remove this admin?")) return;
    setDeletingAdmin(emp_id);
    try {
      await removeAdmin({
        variables: { emp_id },
      });
    } catch (err) {
      console.error("Error removing admin:", err.message);
    } finally {
      setDeletingAdmin(null);
    }
  };

  const filteredTeachers = data.getAllTeachers.filter(
    (teacher) =>
      teacher.emp_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.emp_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.emp_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const teachersOnly = filteredTeachers.filter((t) => !t.isAdmin);
  const admins = filteredTeachers.filter((t) => t.isAdmin);

  const toggleSelectAll = (list) => {
    if (selectedTeachers.length === list.length) {
      setSelectedTeachers([]);
    } else {
      setSelectedTeachers(list.map((t) => t.emp_id));
    }
  };

  const toggleSelectOne = (emp_id) => {
    setSelectedTeachers((prev) =>
      prev.includes(emp_id)
        ? prev.filter((id) => id !== emp_id)
        : [...prev, emp_id]
    );
  };

  // Mobile card view for teachers
  const renderMobileCards = (list) => (
    <div className="d-md-none">
      {list.length > 0 ? (
        list.map((teacher, idx) => (
          <Card key={idx} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Form.Check
                  type="checkbox"
                  checked={selectedTeachers.includes(teacher.emp_id)}
                  onChange={() => toggleSelectOne(teacher.emp_id)}
                />
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" title="Edit">
                    <FaEdit />
                  </Button>
                  {!teacher.isAdmin ? (
                    <Button
                      variant="outline-success"
                      size="sm"
                      title="Make Admin"
                      disabled={currentAdminLoading === teacher.emp_id}
                      onClick={() => handleMakeAdmin(teacher.emp_id)}
                    >
                      {currentAdminLoading === teacher.emp_id ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <FaUserShield />
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      title="Remove Admin"
                      disabled={deletingAdmin === teacher.emp_id}
                      onClick={() => handleRemoveAdmin(teacher.emp_id)}
                    >
                      {deletingAdmin === teacher.emp_id ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <FaTrash />
                      )}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <Badge bg="light" text="dark" className="fw-normal me-2">
                  {teacher.emp_id}
                </Badge>
                {teacher.isAdmin && (
                  <Badge bg="success" className="ms-1">
                    <FaUserShield className="me-1" /> Admin
                  </Badge>
                )}
              </div>
              
              <h6 className="fw-semibold mb-2">{teacher.emp_name}</h6>
              
              <div className="mb-2">
                <div className="text-muted small">{teacher.emp_email ?? "N/A"}</div>
                <div className="text-muted small">{teacher.emp_phone ?? "N/A"}</div>
              </div>
              
              <div className="mb-2">
                <small className="text-muted">Subjects:</small>
                {teacher.Subjects && teacher.Subjects.length > 0 ? (
                  <div className="d-flex flex-wrap gap-1 mt-1">
                    {teacher.Subjects.slice(0, 3).map((sub, i) => (
                      <Badge key={i} bg="info" className="me-1 mb-1">
                        {sub.subjectCode}
                      </Badge>
                    ))}
                    {teacher.Subjects.length > 3 && (
                      <Badge bg="secondary" className="mb-1">
                        +{teacher.Subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                ) : (
                  <Badge bg="secondary" className="ms-1">None</Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center py-4">
          <div className="text-muted">No teachers found</div>
        </div>
      )}
    </div>
  );

  // Desktop table view for teachers
  const renderTable = (list) => (
    <Card className="border-0 shadow-sm d-none d-md-block">
      <Card.Body className="p-0">
        <Table hover responsive className="mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectedTeachers.length === list.length && list.length > 0}
                  onChange={() => toggleSelectAll(list)}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Subjects</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length > 0 ? (
              list.map((teacher, idx) => (
                <tr key={idx}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedTeachers.includes(teacher.emp_id)}
                      onChange={() => toggleSelectOne(teacher.emp_id)}
                    />
                  </td>
                  <td>
                    <Badge bg="light" text="dark" className="fw-normal">
                      {teacher.emp_id}
                    </Badge>
                  </td>
                  <td>
                    <div className="fw-semibold">
                      {teacher.emp_name}{" "}
                      {teacher.isAdmin && (
                        <FaUserShield className="text-success ms-1" title="Admin" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="text-muted small">{teacher.emp_email ?? "N/A"}</div>
                    <div className="text-muted small">{teacher.emp_phone ?? "N/A"}</div>
                  </td>
                  <td>
                    {teacher.Subjects && teacher.Subjects.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {teacher.Subjects.map((sub, i) => (
                          <Badge key={i} bg="info" className="me-1 mb-1">
                            {sub.subjectCode}: {sub.subject?.subjectName ?? "N/A"}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <Badge bg="secondary">No subjects</Badge>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button variant="outline-primary" size="sm" title="Edit">
                        <FaEdit />
                      </Button>
                      {!teacher.isAdmin ? (
                        <Button
                          variant="outline-success"
                          size="sm"
                          title="Make Admin"
                          disabled={currentAdminLoading === teacher.emp_id}
                          onClick={() => handleMakeAdmin(teacher.emp_id)}
                        >
                          {currentAdminLoading === teacher.emp_id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <FaUserShield />
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          title="Remove Admin"
                          disabled={deletingAdmin === teacher.emp_id}
                          onClick={() => handleRemoveAdmin(teacher.emp_id)}
                        >
                          {deletingAdmin === teacher.emp_id ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            <FaTrash />
                          )}
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  <div className="text-muted">No teachers found</div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );

  return (
    <div className="d-flex">
      {/* Sidebar Navigation - Fixed for desktop, offcanvas for mobile */}
      <div 
      className="d-none d-lg-block position-fixed h-100"
      style={{ width: "250px", left: 0, top: 0, background: "#fff", borderRight: "1px solid #dee2e6" }}
    >
        <AdminNav />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3 p-md-4" style={
          isMobile
            ? { width: "100%" } // ✅ No margin for mobile
            : { marginLeft: "250px", width: "calc(100% - 250px)" } // ✅ With margin for desktop
        }>
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="d-flex align-items-center"
          >
            {isMobileNavOpen ? <FaTimes className="me-1" /> : <FaBars className="me-1" />}
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
              className="h-100"
              style={{ width: "75%", maxWidth: "280px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AdminNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        <Container fluid>
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={6}>
              <h2 className="mb-2 mb-md-0" style={{ color: "#1d3557", fontWeight: "600" }}>
                Teacher Management
              </h2>
            </Col>
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Tabs defaultActiveKey="teachers" className="mb-3">
            <Tab eventKey="teachers" title={`Teachers (${teachersOnly.length})`}>
              {renderMobileCards(teachersOnly)}
              {renderTable(teachersOnly)}
            </Tab>
            <Tab eventKey="admins" title={`Admins (${admins.length})`}>
              {renderMobileCards(admins)}
              {renderTable(admins)}
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};
