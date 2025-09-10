import { useQuery } from "@apollo/client";
import {
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
  Spinner,
} from "react-bootstrap";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { useState, useEffect } from "react";
import { FaSearch, FaEdit, FaTrash, FaBars, FaTimes, FaPlus } from "react-icons/fa";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { GET_ALL_STUDENTS } from "../../GraphQL/Queries";

export const StudentMgmt = () => {
  const { loading, error, data } = useQuery(GET_ALL_STUDENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  if (loading) return <RingLoader />;
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

  // ✅ Safely handle data
  const studentsList = data?.students || [];

  // ✅ Filter students safely

const filteredStudents = studentsList.filter((student) => {
  const name = student.student_name?.toLowerCase() || "";
  const email = student.student_email?.toLowerCase() || "";
  const regNo = student.registrationNo ? String(student.registrationNo).toLowerCase() : "";

  return (
    name.includes(searchTerm.toLowerCase()) ||
    email.includes(searchTerm.toLowerCase()) ||
    regNo.includes(searchTerm.toLowerCase())
  );
});


  // console.log(filteredStudents)
  // Categorize students by course - only include courses with students
  const studentsByCourse = filteredStudents.reduce((acc, student) => {
    const courseName = student.course?.courseName || "Not Assigned";
    if (!acc[courseName]) {
      acc[courseName] = [];
    }
    acc[courseName].push(student);
    return acc;
  }, {});

  // Filter out empty course tabs when searching
  const nonEmptyCourses = Object.entries(studentsByCourse).filter(
    ([courseName, students]) => students.length > 0
  );

  const toggleSelectAll = (list) => {
    if (selectedStudents.length === list.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(list.map((s) => s.id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id)
        ? prev.filter((studentId) => studentId !== id)
        : [...prev, id]
    );
  };

  const renderMobileCards = (list) => (
    <div className="d-md-none">
      {list.length ? (
        list.map((student, idx) => (
          <Card key={idx} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleSelectOne(student.id)}
                />
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm">
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm">
                    <FaTrash />
                  </Button>
                </div>
              </div>

              <div className="mb-2">
                <Badge bg="light" text="dark" className="fw-normal me-2">
                  {student.registrationNo || "N/A"}
                </Badge>
              </div>

              <h6 className="fw-semibold mb-2">{student.student_name || "N/A"}</h6>

              <div className="mb-2">
                <div className="text-muted small">{student.student_email || "N/A"}</div>
                <div className="text-muted small">{student.student_phone || "N/A"}</div>
              </div>

              <div className="mb-2">
                {student.course?.courseName ? (
                  <Badge bg="primary">{student.course.courseName}</Badge>
                ) : (
                  <Badge bg="secondary">Not assigned</Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className="text-center py-4 text-muted">No students found</div>
      )}
    </div>
  );

  const renderTable = (list) => (
    <Card className="border-0 shadow-sm d-none d-md-block">
      <Card.Body className="p-0">
        <Table hover responsive className="mb-0">
          <thead className="table-light">
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.length === list.length && list.length > 0}
                  onChange={() => toggleSelectAll(list)}
                />
              </th>
              <th>Reg. No.</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Course</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.length ? (
              list.map((student, idx) => (
                <tr key={idx}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => toggleSelectOne(student.id)}
                    />
                  </td>
                  <td>
                    <Badge bg="light" text="dark" className="fw-normal">
                      {student.registrationNo || "N/A"}
                    </Badge>
                  </td>
                  <td className="fw-semibold">{student.student_name || "N/A"}</td>
                  <td>
                    <div className="text-muted small">{student.student_email || "N/A"}</div>
                    <div className="text-muted small">{student.student_phone || "N/A"}</div>
                  </td>
                  <td>
                    {student.course?.courseName ? (
                      <Badge bg="primary">{student.course.courseName}</Badge>
                    ) : (
                      <Badge bg="secondary">Not assigned</Badge>
                    )}
                  </td>
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
                <td colSpan="6" className="text-center py-4 text-muted">
                  No students found
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
      {/* Sidebar */}
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ width: "250px", background: "#fff", borderRight: "1px solid #dee2e6" }}
      >
        <AdminNav />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3 p-md-4"
        style={
          isMobile
            ? { width: "100%" }
            : { marginLeft: "250px", width: "calc(100% - 250px)" }
        }
      >
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
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
              <h2 className="mb-2" style={{ color: "#1d3557", fontWeight: "600" }}>
                Student Management
              </h2>
              <p className="text-muted small">{filteredStudents.length} students found</p>
            </Col>
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by name, Reg. No, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary">
                  <FaPlus className="me-1" /> Add Student
                </Button>
              </InputGroup>
            </Col>
          </Row>

          <Tabs defaultActiveKey="all" className="mb-3">
            <Tab eventKey="all" title={`All Students (${filteredStudents.length})`}>
              {renderMobileCards(filteredStudents)}
              {renderTable(filteredStudents)}
            </Tab>
            {nonEmptyCourses.map(([courseName, students]) => (
              <Tab key={courseName} eventKey={courseName} title={`${courseName} (${students.length})`}>
                {renderMobileCards(students)}
                {renderTable(students)}
              </Tab>
            ))}
          </Tabs>
        </Container>
      </div>
    </div>
  );
};