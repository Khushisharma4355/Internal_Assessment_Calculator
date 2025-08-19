import { useQuery, gql } from "@apollo/client";
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
  Dropdown,
  ListGroup,
  Stack
} from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus, FaFilter, FaBars } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { RingLoader } from "../../Components/Spinner/RingLoader";
// import { GET_ALL_TEACHERS } from "../../GraphQL/Queries";
const GET_ALL_TEACHERS = gql`
  query GetAllTeachers {
    getAllTeachers {
      emp_id
      emp_name
      emp_email
      emp_phone
      Subjects {
        section_id
        subjectCode
        subject {
          subjectName
        }
      }
    }
  }
`;

export const TeacherMgmt = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEACHERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

 if (loading) {
     return (
      <RingLoader/>
     );
   }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error loading teachers</Alert.Heading>
        <p>{error.message}</p>
        <Button variant="outline-danger" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Alert>
    );
  }

  const filteredTeachers = data.getAllTeachers.filter(teacher =>
    teacher.emp_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.emp_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.emp_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="d-flex flex-column flex-md-row">
        {/* Mobile Nav Toggle */}
        {/* <Button 
          variant="light" 
          className="d-md-none m-2 align-self-start"
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          style={{ width: 'auto' }}
        >
          <FaBars />
        </Button> */}

        {/* Sidebar - Hidden on mobile when collapsed */}
        <div
          className={`${isMobileNavOpen ? 'd-block' : 'd-none d-md-block'}`}
          style={{ width: '250px', flexShrink: 0 }}
        >
          <AdminNav />
        </div>
        {/* Main Content */}
        <div className="flex-grow-1 p-3 p-md-4">
          <Container fluid>
            <Row className="mb-4 align-items-center">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <h2 className="mb-0" style={{ color: '#1d3557', fontWeight: '600' }}>
                  Teacher Management
                </h2>
                <p className="text-muted mb-0 mt-1">
                  {filteredTeachers.length} teachers found
                </p>
              </Col>
              <Col xs={12} md={6}>
                <Stack direction="horizontal" gap={2} className="justify-content-md-end flex-wrap">
                  <InputGroup style={{ minWidth: '200px', flex: '1 1 auto' }}>
                    <InputGroup.Text>
                      <FaSearch />
                    </InputGroup.Text>
                    <Form.Control
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter" size="sm">
                      <FaFilter className="me-1" />
                      <span className="d-none d-md-inline">Filter</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item active>All Teachers</Dropdown.Item>
                      <Dropdown.Item>With Subjects</Dropdown.Item>
                      <Dropdown.Item>Without Subjects</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button variant="primary" size="sm" className="flex-shrink-0">
                    <FaPlus className="me-1" />
                    <span className="d-none d-md-inline">Add Teacher</span>
                  </Button>
                </Stack>
              </Col>
            </Row>

            {/* Desktop Table View */}
            <Card className="border-0 shadow-sm d-none d-md-block">
              <Card.Body className="p-0">
                <Table hover responsive className="mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Subjects</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher, idx) => (
                        <tr key={idx}>
                          <td>
                            <Badge bg="light" text="dark" className="fw-normal">
                              {teacher.emp_id}
                            </Badge>
                          </td>
                          <td>
                            <div className="fw-semibold">{teacher.emp_name ?? "N/A"}</div>
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
                              <Button
                                variant="outline-success"
                                size="sm"
                                title="Make Admin"
                              >
                                <FaUserShield />
                              </Button>
                              <Button variant="outline-danger" size="sm" title="Delete">
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          <div className="text-muted">No teachers found</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Mobile List View */}
            <div className="d-md-none">
              {filteredTeachers.length > 0 ? (
                <ListGroup>
                  {filteredTeachers.map((teacher, idx) => (
                    <ListGroup.Item key={idx} className="mb-3 shadow-sm">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bold">{teacher.emp_name ?? "N/A"}</div>
                        <Badge bg="light" text="dark">
                          {teacher.emp_id}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="small text-muted">{teacher.emp_email}</div>
                        <div className="small text-muted">{teacher.emp_phone ?? "N/A"}</div>
                      </div>
                      <div className="mb-2">
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
                      </div>
                      <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-primary" size="sm">
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <FaTrash />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Card className="text-center py-4">
                  <div className="text-muted">No teachers found</div>
                </Card>
              )}
            </div>

            {filteredTeachers.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing 1 to {filteredTeachers.length} of {filteredTeachers.length} entries
                </div>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline-secondary" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            )}
          </Container>
        </div>
      </div>
    </>
  );
};