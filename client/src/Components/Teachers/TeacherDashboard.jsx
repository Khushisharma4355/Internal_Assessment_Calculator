import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Table, 
  Form, 
  Button, 
  Spinner,
  Alert,
  Badge
} from 'react-bootstrap';
import { useQuery, useMutation, gql } from '@apollo/client';

// ==================== GraphQL Queries and Mutations ====================
const GET_TEACHER = gql`
  query GetTeacher($emp_id: ID!) {
    getTeacher(emp_id: $emp_id) {
      emp_name
      emp_email
      emp_phone
    }
  }
`;

const GET_TEACHER_CLASSES = gql`
  query GetTeacherClasses($emp_id: ID!) {
    getTeacherClasses(emp_id: $emp_id) {
      courseId
      courseName
      semester_id
      section_id
      subjectCode
      subjectName
    }
  }
`;

const GET_STUDENTS_BY_CLASS = gql`
  query GetStudentsByClass($courseId: ID!, $semester_id: ID!, $section_id: String!) {
    getStudentsByClass(courseId: $courseId, semester_id: $semester_id, section_id: $section_id) {
      registrationNo
      student_name
    }
  }
`;

const BULK_ENTER_MARKS = gql`
  mutation BulkEnterMarks($marks: [MarksInput!]!) {
    bulkEnterMarks(marks: $marks) {
      success
      message
    }
  }
`;

// ==================== Main Component ====================
export const TeacherDashboard = () => {
  const empId = "T001";
  const [selectedClass, setSelectedClass] = useState(null);
  const [marksMap, setMarksMap] = useState({});
  const [markType, setMarkType] = useState('MTE');
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });

  // Fetch teacher info
  const { loading: loadingTeacher, error: errorTeacher, data: dataTeacher } = useQuery(GET_TEACHER, {
    variables: { emp_id: empId }
  });

  // Fetch teacher's assigned classes
  const { loading: loadingClasses, error: errorClasses, data: dataClasses } = useQuery(GET_TEACHER_CLASSES, {
    variables: { emp_id: empId }
  });

  // Fetch students
  const { loading: loadingStudents, error: errorStudents, data: studentsData } = useQuery(GET_STUDENTS_BY_CLASS, {
    variables: {
      courseId: selectedClass?.courseId,
      semester_id: selectedClass?.semester_id,
      section_id: selectedClass?.section_id,
    },
    skip: !selectedClass,
  });

  // Mutation for bulk entering marks
  const [bulkEnterMarks, { loading: loadingSubmit }] = useMutation(BULK_ENTER_MARKS);

  const handleMarkChange = (registrationNo, value) => {
    setMarksMap(prev => ({
      ...prev,
      [registrationNo]: value === '' ? '' : Number(value),
    }));
  };

  const handleSubmit = async () => {
    if (!studentsData?.getStudentsByClass?.length) {
      setAlert({
        show: true,
        variant: 'warning',
        message: 'No students found to submit marks for.'
      });
      return;
    }

    const marksArray = studentsData.getStudentsByClass.map(stu => ({
      registrationNo: stu.registrationNo,
      subjectCode: selectedClass.subjectCode,
      marks: marksMap[stu.registrationNo] === '' || marksMap[stu.registrationNo] === undefined
        ? 0
        : marksMap[stu.registrationNo],
      markType,
    }));

    try {
      const res = await bulkEnterMarks({ variables: { marks: marksArray } });
      setAlert({
        show: true,
        variant: 'success',
        message: res.data.bulkEnterMarks.message
      });
      setMarksMap({});
    } catch (error) {
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Error submitting marks: ' + error.message
      });
      console.error('Submit Marks Error:', error);
    }
  };

  // Loading and error states
  if (loadingTeacher || loadingClasses) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (errorTeacher || errorClasses) {
    return (
      <Container>
        <Alert variant="danger">
          Error loading data: {errorTeacher?.message || errorClasses?.message}
        </Alert>
      </Container>
    );
  }

  if (!dataTeacher?.getTeacher) {
    return (
      <Container>
        <Alert variant="danger">Teacher data not found. Check emp_id.</Alert>
      </Container>
    );
  }

  const teacher = dataTeacher.getTeacher;
  const classes = dataClasses?.getTeacherClasses ?? [];

  return (
    <Container fluid className="py-4">
      {/* Alert Notification */}
      {alert.show && (
        <Alert 
          variant={alert.variant} 
          onClose={() => setAlert({...alert, show: false})} 
          dismissible
          className="mt-3"
        >
          {alert.message}
        </Alert>
      )}

      {/* Teacher Info */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-1">
                Welcome, <strong>{teacher.emp_name}</strong>
              </h2>
              <div className="text-muted">
                <span className="me-3">
                  <i className="bi bi-envelope me-1"></i> {teacher.emp_email}
                </span>
                <span>
                  <i className="bi bi-telephone me-1"></i> {teacher.emp_phone}
                </span>
              </div>
            </Col>
            <Col xs="auto">
              <Badge bg="primary" pill>
                Teacher
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Assigned Classes */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title className="mb-3">
            <i className="bi bi-book me-2"></i> Your Assigned Classes
          </Card.Title>
          
          {classes.length === 0 ? (
            <Alert variant="info">No classes assigned to you yet.</Alert>
          ) : (
            <Row xs={1} md={2} lg={3} className="g-3">
              {classes.map((cls, idx) => (
                <Col key={idx}>
                  <Card 
                    className={`h-100 cursor-pointer ${selectedClass?.subjectCode === cls.subjectCode && selectedClass?.section_id === cls.section_id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedClass(cls)}
                  >
                    <Card.Body>
                      <Card.Title className="text-primary">
                        {cls.subjectName}
                      </Card.Title>
                      <Card.Text>
                        <small className="text-muted d-block">
                          <strong>Course:</strong> {cls.courseName}
                        </small>
                        <small className="text-muted d-block">
                          <strong>Semester:</strong> {cls.semester_id}
                        </small>
                        <small className="text-muted d-block">
                          <strong>Section:</strong> {cls.section_id}
                        </small>
                        <small className="text-muted d-block">
                          <strong>Code:</strong> {cls.subjectCode}
                        </small>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Students List and Marks Entry */}
      {selectedClass && (
        <Card className="shadow-sm">
          <Card.Body>
            <Card.Title className="mb-3">
              <i className="bi bi-people me-2"></i> 
              Enter Marks for {selectedClass.subjectName}
            </Card.Title>

            {loadingStudents ? (
              <div className="text-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : errorStudents ? (
              <Alert variant="danger">
                Error loading students: {errorStudents.message}
              </Alert>
            ) : studentsData?.getStudentsByClass?.length > 0 ? (
              <>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Select Mark Type:</Form.Label>
                      <Form.Select 
                        value={markType}
                        onChange={(e) => setMarkType(e.target.value)}
                      >
                        <option value="MTE">MTE</option>
                        <option value="Class_test_1">Class Test 1</option>
                        <option value="Class_test_2">Class Test 2</option>
                        <option value="ETE">ETE</option>
                        <option value="attendance">Attendance</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead className="table-dark">
                      <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Marks ({markType})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentsData.getStudentsByClass.map((stu) => (
                        <tr key={stu.registrationNo}>
                          <td>{stu.registrationNo}</td>
                          <td>{stu.student_name}</td>
                          <td>
                            <Form.Control
                              type="number"
                              value={marksMap[stu.registrationNo] ?? ''}
                              onChange={(e) => handleMarkChange(stu.registrationNo, e.target.value)}
                              min="0"
                              max="100"
                              style={{ width: '80px' }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                <div className="d-flex justify-content-end mt-3">
                  <Button 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={loadingSubmit}
                  >
                    {loadingSubmit ? (
                      <>
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        <span className="ms-2">Submitting...</span>
                      </>
                    ) : (
                      'Submit Marks'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <Alert variant="info">No students found in this class.</Alert>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};