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
import { FaSearch, FaEdit, FaTrash, FaUserShield } from "react-icons/fa";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { GET_ALL_TEACHERS } from "../../GraphQL/Queries";
import { ADD_ADMIN } from "../../GraphQL/Mutation";

export const TeacherMgmt = () => {
  const [addAdmin] = useMutation(ADD_ADMIN, {
    refetchQueries: ["GetAllTeachers"],
    awaitRefetchQueries: true,
  });

  const { loading, error, data } = useQuery(GET_ALL_TEACHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [currentAdminLoading, setCurrentAdminLoading] = useState(null); // ✅ Track per teacher

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
    setCurrentAdminLoading(emp_id); // ✅ mark which teacher is loading
    try {
      await addAdmin({
        variables: { emp_id },
      });
    } catch (err) {
      console.error("Error making admin:", err.message);
    } finally {
      setCurrentAdminLoading(null); // ✅ reset
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
                      {!teacher.isAdmin && (
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
                      )}
                      <Button variant="outline-danger" size="sm" title="Delete">
                        <FaTrash />
                      </Button>
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
    <div className="d-flex flex-column flex-md-row">
      <div
        className={`${isMobileNavOpen ? "d-block" : "d-none d-md-block"}`}
        style={{ width: "250px", flexShrink: 0 }}
      >
        <AdminNav />
      </div>

      <div className="flex-grow-1 p-3 p-md-4">
        <Container fluid>
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={6}>
              <h2 className="mb-0" style={{ color: "#1d3557", fontWeight: "600" }}>
                Teacher Management
              </h2>
            </Col>
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Tabs defaultActiveKey="teachers" className="mb-3">
            <Tab eventKey="teachers" title={`Teachers (${teachersOnly.length})`}>
              {renderTable(teachersOnly)}
            </Tab>
            <Tab eventKey="admins" title={`Admins (${admins.length})`}>
              {renderTable(admins)}
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
};
