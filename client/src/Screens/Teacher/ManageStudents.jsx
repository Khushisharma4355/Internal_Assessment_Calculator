import { useState } from 'react';
import {
  Container, Row, Col, Table, Form, Button, InputGroup,
  Badge, Alert, Spinner, Card, Dropdown
} from 'react-bootstrap';
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery, gql } from '@apollo/client';

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
  const empId = localStorage.getItem('emp_id') || "T001";
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterOption, setFilterOption] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  const { loading, error, data } = useQuery(GET_STUDENTS_BY_TEACHER, {
    variables: { emp_id: empId }
  });

  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(
    data?.getStudentsByTeacher?.map(s => `Sem ${s.semester_id} - Sec ${s.section_id}`) || []
  )].sort();

  const filteredStudents = data?.getStudentsByTeacher?.filter(student => {
    // Search filter
    const matchesSearch = 
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registrationNo.toString().includes(searchTerm) ||
      student.student_email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Semester filter
    const semesterMatch = 
      filterOption === 'all' || 
      (filterOption === 'sem1' && student.semester_id === 1) ||
      (filterOption === 'sem2' && student.semester_id === 2);
    
    // Class filter
    const classMatch = 
      classFilter === 'all' || 
      classFilter === `Sem ${student.semester_id} - Sec ${student.section_id}`;
    
    return matchesSearch && semesterMatch && classMatch;
  }) || [];

  const toggleStudentSelection = (regNo) => {
    setSelectedStudents(prev =>
      prev.includes(regNo)
        ? prev.filter(id => id !== regNo)
        : [...prev, regNo]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(filteredStudents.map(student => student.registrationNo));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleBulkAction = (action) => {
    alert(`${action} action performed on ${selectedStudents.length} students`);
    setSelectedStudents([]);
  };

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
    </div>
  );

  if (error) return (
    <Container className="mt-5">
      <Alert variant="danger" className="shadow">
        <Alert.Heading>Error loading students</Alert.Heading>
        <p>{error.message}</p>
        <Button variant="outline-danger" onClick={() => window.location.reload()}>
          <i className="bi bi-arrow-clockwise me-2"></i>Try Again
        </Button>
      </Alert>
    </Container>
  );

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <TeaNav />
      </div>

      <Container fluid className="px-4 py-3">
        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold text-primary mb-1">
              <i className="bi bi-people-fill me-2"></i>
              Student Management
            </h2>
            <p className="text-muted mb-0">
              Manage students from your assigned classes ({filteredStudents.length} students found)
            </p>
          </Col>
        </Row>

        {/* Filters and Search Section */}
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <Row className="g-3">
              <Col md={6}>
                <InputGroup>
                  <InputGroup.Text className="bg-light">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Search students by name, email, or registration number"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-start-0"
                  />
                  {searchTerm && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setSearchTerm('')}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Col>
              <Col md={3}>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-semester" className="w-100">
                    <i className="bi bi-funnel me-2"></i>
                    {filterOption === 'all' ? 'All Semesters' : 
                     filterOption === 'sem1' ? 'Semester 1' : 'Semester 2'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item active={filterOption === 'all'} onClick={() => setFilterOption('all')}>
                      All Semesters
                    </Dropdown.Item>
                    <Dropdown.Item active={filterOption === 'sem1'} onClick={() => setFilterOption('sem1')}>
                      Semester 1
                    </Dropdown.Item>
                    <Dropdown.Item active={filterOption === 'sem2'} onClick={() => setFilterOption('sem2')}>
                      Semester 2
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md={3}>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-class" className="w-100">
                    <i className="bi bi-collection me-2"></i>
                    {classFilter === 'all' ? 'All Classes' : classFilter}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="w-100">
                    <Dropdown.Item active={classFilter === 'all'} onClick={() => setClassFilter('all')}>
                      All Classes
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {uniqueClasses.map(cls => (
                      <Dropdown.Item 
                        key={cls}
                        active={classFilter === cls}
                        onClick={() => setClassFilter(cls)}
                      >
                        {cls}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Bulk Actions */}
        {selectedStudents.length > 0 && (
          <Card className="mb-4 shadow-sm bg-light">
            <Card.Body className="py-2">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                    onChange={handleSelectAll}
                    className="me-3"
                  />
                  <span className="fw-medium">
                    {selectedStudents.length} student{selectedStudents.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                <div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleBulkAction('Message')}
                  >
                    <i className="bi bi-envelope me-1"></i> Message
                  </Button>
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="me-2"
                    onClick={() => handleBulkAction('Export')}
                  >
                    <i className="bi bi-download me-1"></i> Export
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleBulkAction('Remove')}
                  >
                    <i className="bi bi-trash me-1"></i> Remove
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}

        {/* Main Content */}
        <Row>
          <Col>
            {/* Summary Cards */}
            <Row className="mb-4 g-4">
              <Col md={4}>
                <Card className="shadow-sm border-primary border-top-0 border-end-0 border-bottom-0 border-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title className="text-muted mb-2">Total Students</Card.Title>
                        <h2 className="mb-0 fw-bold text-primary">
                          {data?.getStudentsByTeacher?.length || 0}
                        </h2>
                      </div>
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <i className="bi bi-people-fill text-primary fs-3"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-success border-top-0 border-end-0 border-bottom-0 border-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title className="text-muted mb-2">Active Classes</Card.Title>
                        <h2 className="mb-0 fw-bold text-success">
                          {uniqueClasses.length}
                        </h2>
                      </div>
                      <div className="bg-success bg-opacity-10 p-3 rounded">
                        <i className="bi bi-collection-play-fill text-success fs-3"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="shadow-sm border-warning border-top-0 border-end-0 border-bottom-0 border-3">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title className="text-muted mb-2">Selected Students</Card.Title>
                        <h2 className="mb-0 fw-bold text-warning">
                          {selectedStudents.length}
                        </h2>
                      </div>
                      <div className="bg-warning bg-opacity-10 p-3 rounded">
                        <i className="bi bi-check-circle-fill text-warning fs-3"></i>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Students Table */}
            <Card className="shadow-sm">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '40px' }}>
                          <Form.Check
                            type="checkbox"
                            checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th>Registration No</th>
                        <th>Student</th>
                        <th>Contact</th>
                        <th>Course</th>
                        <th>Class</th>
                        <th>Subject</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                          <tr key={student.registrationNo} className={selectedStudents.includes(student.registrationNo) ? 'table-active' : ''}>
                            <td>
                              <Form.Check
                                type="checkbox"
                                checked={selectedStudents.includes(student.registrationNo)}
                                onChange={() => toggleStudentSelection(student.registrationNo)}
                              />
                            </td>
                            <td className="fw-semibold">
                              {student.registrationNo}
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="avatar-sm bg-primary bg-opacity-10 rounded me-2 p-2">
                                  <i className="bi bi-person-fill text-primary"></i>
                                </div>
                                <div>
                                  <h6 className="mb-0">{student.student_name}</h6>
                                  <small className="text-muted">{student.courseName}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <a href={`mailto:${student.student_email}`} className="text-decoration-none">
                                {student.student_email}
                              </a>
                            </td>
                            <td>
                              <Badge bg="info" className="fw-normal">
                                {student.courseName}
                              </Badge>
                            </td>
                            <td>
                              <Badge bg="light" text="dark" className="fw-normal">
                                Sem {student.semester_id} - Sec {student.section_id}
                              </Badge>
                            </td>
                            <td>
                              <small className="text-muted">{student.subjectCode}</small>
                              <div className="fw-medium">{student.subjectName}</div>
                            </td>
                            <td className="text-end">
                              <Button variant="outline-primary" size="sm" className="me-1" title="View Profile">
                                <i className="bi bi-eye"></i>
                              </Button>
                              <Button variant="outline-success" size="sm" className="me-1" title="Send Message">
                                <i className="bi bi-envelope"></i>
                              </Button>
                              <Button variant="outline-secondary" size="sm" title="More Options">
                                <i className="bi bi-three-dots-vertical"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            <div className="py-4">
                              <i className="bi bi-people display-5 text-muted"></i>
                              <h5 className="mt-3 text-muted">
                                {searchTerm ? 'No matching students found' : 'No students assigned to your classes'}
                              </h5>
                              {searchTerm && (
                                <Button 
                                  variant="outline-primary" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => setSearchTerm('')}
                                >
                                  Clear search
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="text-muted">
                  Showing <span className="fw-bold">1</span> to <span className="fw-bold">10</span> of{' '}
                  <span className="fw-bold">{filteredStudents.length}</span> entries
                </div>
                <div>
                  <nav aria-label="Page navigation">
                    <ul className="pagination pagination-sm mb-0">
                      <li className="page-item disabled">
                        <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active"><a className="page-link" href="#">1</a></li>
                      <li className="page-item"><a className="page-link" href="#">2</a></li>
                      <li className="page-item"><a className="page-link" href="#">3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};