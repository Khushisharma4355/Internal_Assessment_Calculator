import { useState } from 'react';
import {
  Container, Row, Col, Table, Form, Button, InputGroup,
  Badge, Alert, Spinner, Card
} from 'react-bootstrap';
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery } from '@apollo/client';
import { GET_STUDENTS_BY_TEACHER, GET_TEACHER_CLASSES } from '../../GraphQL/Queries';
import { FiUsers, FiMail, FiSearch, FiBook, FiEye, FiArrowLeft, FiUser, FiPhone, FiBookOpen } from 'react-icons/fi';

export const Managestu = () => {
  const empId = localStorage.getItem('emp_id') || "T001";
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch teacher's classes
  const { loading: classesLoading, error: classesError, data: classesData } = 
    useQuery(GET_TEACHER_CLASSES, { variables: { emp_id: empId } });

  // Fetch ALL students (not filtered by class initially)
  const { loading: studentsLoading, error: studentsError, data: studentsData } = 
    useQuery(GET_STUDENTS_BY_TEACHER, { variables: { emp_id: empId } });

  if (classesLoading || studentsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
      </div>
    );
  }

  if (classesError || studentsError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="shadow">
          <Alert.Heading>Error loading data</Alert.Heading>
          <p>{classesError?.message || studentsError?.message}</p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  // Process data
  const teacherClasses = classesData?.getTeacherClasses || [];
  const allStudents = studentsData?.getStudentsByTeacher || [];

  // Create class data with student counts
  const classesWithCounts = teacherClasses.map(cls => {
    const studentCount = allStudents.filter(student => 
      student.courseId === cls.courseId &&
      student.semester_id === cls.semester_id &&
      student.section_id === cls.section_id
    ).length;
    
    return {
      ...cls,
      studentCount
    };
  });

  // Filter students when a class is selected
  const filteredStudents = selectedClass 
    ? allStudents.filter(student => 
        student.courseId === selectedClass.courseId &&
        student.semester_id === selectedClass.semester_id &&
        student.section_id === selectedClass.section_id &&
        (student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         student.registrationNo.toString().includes(searchTerm) ||
         student.student_email.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  return (
    <div className="d-flex">
      {/* Sidebar Navigation */}
      <div style={{ flexShrink: 0, width: "250px", backgroundColor: '#1d3557' }}>
        <TeaNav />
      </div>

      {/* Main Content */}
      <Container fluid className="px-4 py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold mb-1" style={{ color: '#1d3557' }}>
              {selectedClass ? (
                <>
                  <FiBookOpen className="me-2" />
                  {selectedClass.courseName} - {selectedClass.subjectName}
                </>
              ) : (
                <>
                  <FiBook className="me-2" />
                  My Classes
                </>
              )}
            </h2>
            <p className="text-muted mb-0">
              {selectedClass 
                ? `Semester ${selectedClass.semester_id} • Section ${selectedClass.section_id} • ${selectedClass.studentCount || 0} students`
                : `${teacherClasses.length} classes assigned`}
            </p>
          </div>
          
          {selectedClass && (
            <Button 
              variant="outline-primary" 
              onClick={() => setSelectedClass(null)}
              style={{ borderColor: '#1d3557', color: '#1d3557' }}
            >
              <FiArrowLeft className="me-1" /> All Classes
            </Button>
          )}
        </div>

        {selectedClass ? (
          <>
            {/* Students View */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <InputGroup style={{ maxWidth: '400px' }}>
                  <InputGroup.Text style={{ backgroundColor: 'white' }}>
                    <FiSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder={`Search ${selectedClass.studentCount} students...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ borderLeft: 'none' }}
                  />
                  {searchTerm && (
                    <Button 
                      variant="light" 
                      onClick={() => setSearchTerm('')}
                      style={{ border: '1px solid #dee2e6', borderLeft: 'none' }}
                    >
                      Clear
                    </Button>
                  )}
                </InputGroup>
              </Card.Body>
            </Card>

            {/* Students Table */}
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead style={{ backgroundColor: '#f1f3f5' }}>
                      <tr>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Student</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Contact</th>
                        <th style={{ padding: '1rem', borderTop: 'none', textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map(student => (
                          <tr key={student.registrationNo} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '1rem' }}>
                              <div className="d-flex align-items-center">
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  borderRadius: '50%',
                                  backgroundColor: '#e9ecef',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  marginRight: '12px',
                                  color: '#1d3557'
                                }}>
                                  <FiUser size={18} />
                                </div>
                                <div>
                                  <h6 className="mb-0" style={{ color: '#1d3557' }}>{student.student_name}</h6>
                                  <small className="text-muted">ID: {student.registrationNo}</small>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                              <div className="d-flex align-items-center">
                                <FiMail className="me-2" style={{ color: '#6c757d' }} />
                                <a 
                                  href={`mailto:${student.student_email}`} 
                                  style={{ color: '#1d3557', textDecoration: 'none' }}
                                  onMouseOver={e => e.target.style.textDecoration = 'underline'}
                                  onMouseOut={e => e.target.style.textDecoration = 'none'}
                                >
                                  {student.student_email}
                                </a>
                              </div>
                              {student.phone && (
                                <div className="d-flex align-items-center mt-1">
                                  <FiPhone className="me-2" style={{ color: '#6c757d' }} />
                                  <span style={{ color: '#495057' }}>{student.phone}</span>
                                </div>
                              )}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                style={{ 
                                  borderColor: '#1d3557', 
                                  color: '#1d3557',
                                  padding: '0.375rem 0.75rem'
                                }}
                              >
                                <FiEye className="me-1" /> View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="text-center py-5">
                            <FiUsers size={48} className="text-muted mb-3" />
                            <h5 className="text-muted">
                              {searchTerm 
                                ? 'No matching students found' 
                                : 'No students enrolled in this class'}
                            </h5>
                            {searchTerm && (
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                className="mt-3"
                                onClick={() => setSearchTerm('')}
                              >
                                Clear search
                              </Button>
                            )}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </>
        ) : (
          <>
            {/* Classes View */}
            <Row className="g-4">
              {classesWithCounts.map((cls, index) => (
                <Col key={index} xs={12} md={6} lg={4}>
                  <Card 
                    className="shadow-sm border-0 h-100" 
                    style={{ 
                      cursor: 'pointer',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      borderLeft: '4px solid #1d3557'
                    }}
                    onClick={() => setSelectedClass(cls)}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = ''}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 style={{ color: '#1d3557' }}>{cls.courseName}</h5>
                          <Badge 
                            bg="light" 
                            text="dark"
                            style={{ 
                              backgroundColor: '#e9ecef',
                              fontWeight: 'normal',
                              padding: '0.35em 0.65em'
                            }}
                          >
                            {cls.subjectCode}
                          </Badge>
                        </div>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: '#1d3557',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <FiBookOpen />
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          <span className="text-muted me-2" style={{ width: '80px' }}>Subject:</span>
                          <strong>{cls.subjectName}</strong>
                        </div>
                        <div className="d-flex align-items-center mb-1">
                          <span className="text-muted me-2" style={{ width: '80px' }}>Semester:</span>
                          <strong>{cls.semester_id}</strong>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-muted me-2" style={{ width: '80px' }}>Section:</span>
                          <strong>{cls.section_id}</strong>
                        </div>
                      </div>
                      
                      <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          style={{ borderColor: '#1d3557', color: '#1d3557' }}
                        >
                          View Students
                        </Button>
                        <span className="text-muted">
                          {cls.studentCount} student{cls.studentCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};