import { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Table, 
  Form, 
  Button, 
  InputGroup,
  Badge,
  Alert,
  Spinner
} from 'react-bootstrap';
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery, gql } from '@apollo/client';

// GraphQL query to fetch students assigned to teacher
const GET_STUDENTS_BY_TEACHER = gql`
  query GetStudentsByTeacher($emp_id: ID!) {
    getStudentsByTeacher(emp_id: $emp_id) {
      registrationNo
      student_name
      student_email
      courseId
      courseName
      semester_id
      section_id
      subjectCode
      subjectName
    }
  }
`;

export const Managestu = () => {
  const empId = "T001"; // Replace with actual teacher ID from auth
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch students assigned to this teacher
  const { loading, error, data } = useQuery(GET_STUDENTS_BY_TEACHER, {
    variables: { emp_id: empId }
  });

  // Filter students based on search term
  const filteredStudents = data?.getStudentsByTeacher?.filter(student => 
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.registrationNo.toString().includes(searchTerm) ||
    student.student_email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const toggleStudentSelection = (regNo) => {
    setSelectedStudents(prev => 
      prev.includes(regNo) 
        ? prev.filter(id => id !== regNo) 
        : [...prev, regNo]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`${action} selected students:`, selectedStudents);
    // Implement bulk actions here
    alert(`${action} action performed on ${selectedStudents.length} students`);
    setSelectedStudents([]);
  };

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="mt-3">
      Error loading students: {error.message}
    </Alert>
  );

  return (
    <>
      <TeaNav />
      
      <Container fluid className="mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="text-primary">
              <i className="bi bi-people-fill me-2"></i>
              Manage Students
            </h2>
            <p className="text-muted">View and manage all students assigned to your classes</p>
          </Col>
        </Row>

        {/* Search and Bulk Actions */}
        <Row className="mb-3">
          <Col md={6}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by name, email, or registration number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary">
                <i className="bi bi-search"></i>
              </Button>
            </InputGroup>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            {selectedStudents.length > 0 && (
              <Button.Group>
                <Button 
                  variant="outline-primary" 
                  onClick={() => handleBulkAction('Message')}
                  className="me-2"
                >
                  <i className="bi bi-envelope me-1"></i> Message
                </Button>
                <Button 
                  variant="outline-success" 
                  onClick={() => handleBulkAction('Export')}
                >
                  <i className="bi bi-download me-1"></i> Export
                </Button>
              </Button.Group>
            )}
          </Col>
        </Row>

        {/* Students Table */}
        <Row>
          <Col>
            <div className="table-responsive">
              <Table striped bordered hover className="mt-3">
                <thead className="bg-light">
                  <tr>
                    <th width="50px"></th>
                    <th>Registration No</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map(student => (
                      <tr key={student.registrationNo}>
                        <td>
                          <Form.Check 
                            type="checkbox"
                            checked={selectedStudents.includes(student.registrationNo)}
                            onChange={() => toggleStudentSelection(student.registrationNo)}
                          />
                        </td>
                        <td>{student.registrationNo}</td>
                        <td>{student.student_name}</td>
                        <td>{student.student_email}</td>
                        <td>
                          <Badge bg="info">{student.courseName}</Badge>
                        </td>
                        <td>
                          Sem {student.semester_id} - Sec {student.section_id}
                        </td>
                        <td>{student.subjectName}</td>
                        <td>
                          <Button 
                            variant="outline-primary" 
                            size="sm" 
                            className="me-1"
                            onClick={() => console.log('View', student.registrationNo)}
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button 
                            variant="outline-success" 
                            size="sm"
                            onClick={() => console.log('Message', student.registrationNo)}
                          >
                            <i className="bi bi-envelope"></i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted py-4">
                        {searchTerm ? 'No matching students found' : 'No students assigned'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        {/* Statistics */}
        <Row className="mt-4">
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Total Students</Card.Title>
                <h3 className="text-primary">
                  {data?.getStudentsByTeacher?.length || 0}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Active Classes</Card.Title>
                <h3 className="text-success">
                  {new Set(data?.getStudentsByTeacher?.map(s => `${s.subjectCode}-${s.section_id}`)).size || 0}
                </h3>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Selected</Card.Title>
                <h3 className="text-warning">
                  {selectedStudents.length}
                </h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};