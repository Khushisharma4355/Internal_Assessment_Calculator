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
import { RingLoader } from "../../Components/Spinner/RingLoader";
const GET_ALL_STUDENTS = gql`
  query GetAllStudents {
     students {
    student_name
    student_email
    rollno
    courseId
    registrationNo
    course {
      courseName
    }
  } 
  }
`;

export const StudentMgmt = () => {
  const { loading, error, data } = useQuery(GET_ALL_STUDENTS);
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
        <Alert.Heading>Error loading students</Alert.Heading>
        <p>{error.message}</p>
        <Button variant="outline-danger" size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Alert>
    );
  }

  const filteredStudents = data.students.filter(student =>
    student.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    // student.registrationNo?.includes(searchTerm.toLowerCase()) ||
    student.student_email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="d-flex flex-column flex-md-row">
        {/* Sidebar */}
        <div style={{ width: '250px', flexShrink: 0 }} className="d-none d-md-block">
          <AdminNav />
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-3 p-md-4">
          <Container fluid>
            <Row className="mb-4 align-items-center">
              <Col xs={12} md={6} className="mb-3 mb-md-0">
                <h2 className="mb-0" style={{ color: '#1d3557', fontWeight: '600' }}>
                  Student Management
                </h2>
                <p className="text-muted mb-0 mt-1">
                  {filteredStudents.length} students found
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
                      <Dropdown.Item active>All Students</Dropdown.Item>
                      <Dropdown.Item>By Course</Dropdown.Item>
                      <Dropdown.Item>With Subjects</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button variant="primary" size="sm" className="flex-shrink-0">
                    <FaPlus className="me-1" />
                    <span className="d-none d-md-inline">Add Student</span>
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
                      <th>Reg. No.</th>
                      <th>Name</th>
                      <th>Contact</th>
                      <th>Course</th>
                      {/* <th>Subjects</th> */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student, idx) => (
                        <tr key={idx}>
                          <td>
                            <Badge bg="light" text="dark" className="fw-normal">
                              {student.registrationNo}
                            </Badge>
                          </td>
                          <td>
                            <div className="fw-semibold">{student.student_name ?? "N/A"}</div>
                          </td>
                          <td>
                            <div className="text-muted small">{student.student_email ?? "N/A"}</div>
                            <div className="text-muted small">{student.student_phone ?? "N/A"}</div>
                          </td>
                          <td>
                            {student.course?.courseName ? (
                              <Badge bg="primary">
                                {student.course.courseName}
                              </Badge>
                            ) : (
                              <Badge bg="secondary">Not assigned</Badge>
                            )}
                          </td>
                          {/* <td>
                            {student.Subjects && student.Subjects.length > 0 ? (
                              <div className="d-flex flex-wrap gap-1">
                                {student.Subjects.map((sub, i) => (
                                  <Badge key={i} bg="info" className="me-1 mb-1">
                                    {sub.subject?.subjectName ?? "N/A"}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <Badge bg="secondary">No subjects</Badge>
                            )}
                          </td> */}
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm">
                                <FaEdit />
                              </Button>
                              <Button variant="outline-danger" size="sm">
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          <div className="text-muted">No students found</div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Mobile List View */}
            <div className="d-md-none">
              {filteredStudents.length > 0 ? (
                <ListGroup>
                  {filteredStudents.map((student, idx) => (
                    <ListGroup.Item key={idx} className="mb-3 shadow-sm">
                      <div className="d-flex justify-content-between mb-2">
                        <div className="fw-bold">{student.student_name ?? "N/A"}</div>
                        <Badge bg="light" text="dark">
                          {student.registrationNo}
                        </Badge>
                      </div>
                      <div className="mb-2">
                        <div className="small text-muted">{student.student_email}</div>
                        <div className="small text-muted">{student.student_phone ?? "N/A"}</div>
                      </div>
                      <div className="mb-2">
                        {student.course?.courseName ? (
                          <Badge bg="primary" className="me-1">
                            {student.course.courseName}
                          </Badge>
                        ) : (
                          <Badge bg="secondary">No course</Badge>
                        )}
                      </div>
                      {/* <div className="mb-2">
                        {student.Subjects && student.Subjects.length > 0 ? (
                          <div className="d-flex flex-wrap gap-1">
                            {student.Subjects.map((sub, i) => (
                              <Badge key={i} bg="info" className="me-1 mb-1">
                                {sub.subject?.subjectName ?? "N/A"}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <Badge bg="secondary">No subjects</Badge>
                        )}
                      </div> */}
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
                  <div className="text-muted">No students found</div>
                </Card>
              )}
            </div>

            {filteredStudents.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted small">
                  Showing 1 to {filteredStudents.length} of {filteredStudents.length} entries
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