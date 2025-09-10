import React, { useState, useEffect } from 'react';
import { TeaNav } from '../../Components/Teachers/TeaNav';
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
  Badge,
  InputGroup
} from 'react-bootstrap';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_TEACHER, GET_TEACHER_CLASSES, GET_STUDENTS_BY_CLASS } from '../../GraphQL/Queries';
import { FiBook, FiUsers, FiMail, FiPhone, FiUpload, FiArrowLeft, FiUser } from 'react-icons/fi';
import { RingLoader } from '../../Components/Spinner/RingLoader';
import { FaBars, FaTimes } from "react-icons/fa";
import * as XLSX from 'xlsx';

const BULK_ENTER_MARKS = gql`
  mutation BulkEnterMarks($marks: [MarksInput!]!) {
    bulkEnterMarks(marks: $marks) {
      success
      message
    }
  }
`;

export const UploadMarks = () => {
  const empId = "T001";
  const [selectedClass, setSelectedClass] = useState(null);
  const [marksMap, setMarksMap] = useState({});
  const [markType, setMarkType] = useState('MTE');
  const [totalMarks, setTotalMarks] = useState(100);
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });
  const [file, setFile] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Add this near your other useEffects
  // useEffect(() => {
  //   if (errorStudents) {
  //     console.error('Students query error:', errorStudents);
  //   }
  // }, [errorStudents]);
  const { loading: loadingTeacher, error: errorTeacher, data: dataTeacher } = useQuery(GET_TEACHER, { variables: { emp_id: empId } });
  const { loading: loadingClasses, error: errorClasses, data: dataClasses } = useQuery(GET_TEACHER_CLASSES, { variables: { emp_id: empId } });
  const { loading: loadingStudents, error: errorStudents, data: studentsData } = useQuery(GET_STUDENTS_BY_CLASS, {
    variables: {
      emp_id: empId,
      courseId: selectedClass?.courseId,
      semester_id: selectedClass?.semester_id,
      section_id: selectedClass?.section_id,
    },
    skip: !selectedClass,
  });

  const [bulkEnterMarks, { loading: loadingSubmit }] = useMutation(BULK_ENTER_MARKS);

  const handleMarkChange = (registrationNo, value) => {
    const regNo = registrationNo.toString(); // normalize
    if (value === '') {
      setMarksMap(prev => ({ ...prev, [regNo]: '' }));
      return;
    }
    let val = Number(value);
    if (val < 0) val = 0;
    if (val > totalMarks) val = totalMarks;
    setMarksMap(prev => ({ ...prev, [regNo]: val }));
  };


  const downloadSampleFile = () => {
    if (!selectedClass || !studentsData?.getStudentsByClass?.length) {
      setAlert({ show: true, variant: 'warning', message: 'Please select a class with students first' });
      return;
    }

    // Prepare sample data with studentName (but no markType in sheet)
    const sampleData = studentsData.getStudentsByClass.map(student => ({
      registrationNo: parseInt(student.registrationNo), // Read-only (informational)
      studentName: student.student_name,               // Informational
      subjectCode: selectedClass.subjectCode,          // Informational
      marks: ""                                        // Teacher enters here
    }));

    const worksheet = XLSX.utils.json_to_sheet(sampleData);

    // Freeze header row
    worksheet['!freeze'] = { xSplit: 0, ySplit: 1 };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "MarksSample");

    XLSX.writeFile(workbook, `Marks_Sample_${selectedClass.subjectCode}.xlsx`);
  };



  const handleSubmit = async () => {
    if (!studentsData?.getStudentsByClass?.length) {
      setAlert({ show: true, variant: 'warning', message: 'No students found to submit marks.' });
      return;
    }
    console.log("handle submit")
    const marksArray = studentsData.getStudentsByClass.map(stu => {
      const regNo = stu.registrationNo.toString();
      let enteredMarks = marksMap[regNo];
      enteredMarks = enteredMarks === '' || enteredMarks === undefined ? 0 : Number(enteredMarks);
      if (enteredMarks > totalMarks) enteredMarks = totalMarks;

      return {
        registrationNo: regNo,
        subjectCode: selectedClass.subjectCode,
        marks: enteredMarks,
        markType,
      };
    });


    console.log("Payload to submit:", marksArray);

    try {
      const res = await bulkEnterMarks({ variables: { marks: marksArray } });
      if (res.data.bulkEnterMarks.success) {
        setAlert({ show: true, variant: 'success', message: res.data.bulkEnterMarks.message });
        setMarksMap({});
        setFile(null);
      } else {
        setAlert({ show: true, variant: 'danger', message: res.data.bulkEnterMarks.message });
      }
    } catch (err) {
      console.error("Error submitting marks:", err);
      setAlert({ show: true, variant: 'danger', message: "Error submitting marks: " + err.message });
    }
  };


  const handleFileChange = (e) => {
    if (e.target.files.length > 0) setFile(e.target.files[0]);
  };

  const handleBulkImport = () => {
    if (!file) {
      setAlert({ show: true, variant: 'warning', message: 'Please select a file first' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = evt.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const newMarksMap = {};
        let importedCount = 0;

        jsonData.forEach(row => {
          // Handle both string and number registration numbers
          const regNo = row.registrationNo ? row.registrationNo.toString() : null;
          if (regNo && row.marks !== undefined) {
            let marks = Number(row.marks);
            if (isNaN(marks)) marks = 0;
            if (marks < 0) marks = 0;
            if (marks > totalMarks) marks = totalMarks;
            newMarksMap[regNo] = marks;
            importedCount++;
          }
        });

        setMarksMap(prev => ({ ...prev, ...newMarksMap }));
        setAlert({
          show: true,
          variant: 'success',
          message: `Marks imported successfully for ${importedCount} students`
        });
      } catch (error) {
        setAlert({
          show: true,
          variant: 'danger',
          message: 'Error reading Excel file: ' + error.message
        });
      }
    };
    reader.onerror = () => {
      setAlert({
        show: true,
        variant: 'danger',
        message: 'Error reading file'
      });
    };
    reader.readAsBinaryString(file);
  };


  if (loadingTeacher || loadingClasses) return <RingLoader />;

  if (errorTeacher || errorClasses) return (
    <Container className="mt-5">
      <Alert variant="danger" className="shadow">
        <Alert.Heading>Error loading data</Alert.Heading>
        <p>{errorTeacher?.message || errorClasses?.message}</p>
        <Button variant="outline-danger" onClick={() => window.location.reload()}>Try Again</Button>
      </Alert>
    </Container>
  );

  if (!dataTeacher?.getTeacher) return (
    <Container className="mt-5">
      <Alert variant="danger" className="shadow">
        <Alert.Heading>Teacher data not found</Alert.Heading>
        <p>Please check your employee ID</p>
      </Alert>
    </Container>
  );

  const teacher = dataTeacher.getTeacher;
  const classes = dataClasses?.getTeacherClasses ?? [];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-none d-lg-block position-fixed h-100" style={{ width: "250px", background: "#fff", borderRight: "1px solid #dee2e6", zIndex: 1000 }}>
        <TeaNav />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3 p-md-4" style={isMobile ? { width: "100%" } : { marginLeft: "250px", width: "calc(100% - 250px)" }}>
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button variant="outline-secondary" onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
            {isMobileNavOpen ? <FaTimes className="me-1" /> : <FaBars className="me-1" />} Menu
          </Button>
        </div>

        {isMobileNavOpen && (
          <div className="d-lg-none position-fixed top-0 start-0 h-100 w-100" style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setIsMobileNavOpen(false)}>
            <div className="h-100" style={{ width: "75%", maxWidth: "280px", background: "#fff" }} onClick={(e) => e.stopPropagation()}>
              <TeaNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Content */}
        <Container fluid className="p-0">
          <Row className="mb-4">
            <Col>
              <h2 style={{ color: '#1d3557' }} className="fw-bold mb-1">
                <FiUpload className="me-2" /> Upload Marks
              </h2>
              <p className="text-muted mb-0">
                {selectedClass ? `Entering marks for ${selectedClass.subjectName} (${selectedClass.subjectCode})` : 'Select a class to begin entering marks'}
              </p>
            </Col>
          </Row>

          {alert.show && (
            <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible className="shadow-sm mb-4">
              {alert.message}
            </Alert>
          )}

          {/* Teacher Info */}
          <Card className="mb-4 shadow-sm border-0">
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-1" style={{ color: '#1d3557' }}>{teacher.emp_name}</h5>
                  <div className="text-muted">
                    <div className="d-flex align-items-center mb-1"><FiMail className="me-2" /><span>{teacher.emp_email}</span></div>
                    <div className="d-flex align-items-center"><FiPhone className="me-2" /><span>{teacher.emp_phone}</span></div>
                  </div>
                </Col>
                <Col xs="auto"><Badge bg="primary" pill>Teacher</Badge></Col>
              </Row>
            </Card.Body>
          </Card>

          {!selectedClass ? (
            <>
              <Card className="mb-4 shadow-sm border-0">
                <Card.Body>
                  <h5 className="mb-3" style={{ color: '#1d3557' }}><FiBook className="me-2" />Your Assigned Classes</h5>
                  {classes.length === 0 ? (
                    <Alert variant="info" className="shadow-sm">No classes assigned to you yet</Alert>
                  ) : (
                    <Row className="g-4">
                      {classes.map((cls, idx) => (
                        <Col key={idx} xs={12} md={6} lg={4}>
                          <Card
                            className="shadow-sm h-100 border-0"
                            style={{ cursor: 'pointer', borderLeft: '4px solid #1d3557', transition: 'transform 0.2s' }}
                            onClick={() => { setSelectedClass(cls); setMarksMap({}); setTotalMarks(100); }}
                            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={e => e.currentTarget.style.transform = ''}
                          >
                            <Card.Body>
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <div>
                                  <h6 style={{ color: '#1d3557' }}>{cls.subjectName}</h6>
                                  <Badge bg="light" text="dark" className="fw-normal">{cls.subjectCode}</Badge>
                                </div>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1d3557', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                  <FiBook size={18} />
                                </div>
                              </div>
                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-1"><span className="text-muted me-2">Course:</span><strong>{cls.courseName}</strong></div>
                                <div className="d-flex align-items-center mb-1"><span className="text-muted me-2">Semester:</span><strong>{cls.semester_id}</strong></div>
                                <div className="d-flex align-items-center"><span className="text-muted me-2">Section:</span><strong>{cls.section_id}</strong></div>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  )}
                </Card.Body>
              </Card>
            </>
          ) : (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ color: '#1d3557' }}><FiUsers className="me-2" />{selectedClass.subjectName} - Marks Entry</h5>
                <Button
                  variant="outline-primary"
                  onClick={() => { setSelectedClass(null); setMarksMap({}); }}
                  style={{ borderColor: '#1d3557', color: '#1d3557' }}
                >
                  <FiArrowLeft className="me-1" /> Back to Classes
                </Button>
              </div>

              <Card className="shadow-sm border-0 mb-4">
                <Card.Body>
                  <Row className="mb-4 g-3">
                    {/* Mark Type */}
                    <Col md={3} sm={6}>
                      <Form.Group>
                        <Form.Label>Mark Type</Form.Label>
                        <Form.Select
                          value={markType}
                          onChange={(e) => setMarkType(e.target.value)}
                          style={{ borderColor: '#1d3557' }}
                        >
                          <option value="MTE">Mid-Term Exam</option>
                          <option value="Class_test_1">Class Test 1</option>
                          <option value="Class_test_2">Class Test 2</option>
                          <option value="ETE">End-Term Exam</option>
                          <option value="attendance">Attendance</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    {/* Total Marks */}
                    <Col md={2} sm={6}>
                      <Form.Group>
                        <Form.Label>Total Marks</Form.Label>
                        <Form.Control
                          type="number"
                          min="1"
                          max="1000"
                          value={totalMarks}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) setTotalMarks(val);
                          }}
                          style={{ borderColor: '#1d3557' }}
                        />
                      </Form.Group>
                    </Col>

                    {/* File Upload & Buttons */}
                    <Col md={7} sm={12}>
                      <Form.Group>
                        <Form.Label>Upload & Sample</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                          <Form.Control
                            type="file"
                            accept=".xlsx, .xls, .csv"
                            onChange={handleFileChange}
                            style={{ borderColor: '#1d3557', maxWidth: '250px' }}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={handleBulkImport}
                            style={{ borderColor: '#1d3557' }}
                          >
                            Import
                          </Button>
                          <Button
                            variant="outline-primary"
                            onClick={downloadSampleFile}
                            style={{ borderColor: '#1d3557' }}
                          >
                            Sample
                          </Button>
                        </div>
                        <Form.Text className="text-muted">
                          Excel must have columns: <b>registrationNo</b> and <b>marks</b>
                        </Form.Text>
                      </Form.Group>
                    </Col>
                  </Row>


                  {loadingStudents ? (
                    <div className="text-center py-5"><Spinner animation="border" variant="primary" /><p className="mt-3">Loading students...</p></div>
                  ) : errorStudents ? (
                    <Alert variant="danger" className="shadow-sm"><Alert.Heading>Error loading students</Alert.Heading><p>{errorStudents.message}</p></Alert>
                  ) : studentsData?.getStudentsByClass?.length > 0 ? (
                    <>
                      <div className="table-responsive">
                        <Table hover className="mb-0">
                          <thead style={{ backgroundColor: '#f1f3f5' }}>
                            <tr>
                              <th style={{ padding: '1rem', borderTop: 'none' }}>Registration No</th>
                              <th style={{ padding: '1rem', borderTop: 'none' }}>Student Name</th>
                              <th style={{ padding: '1rem', borderTop: 'none', width: '150px' }}>Marks (out of {totalMarks})</th>
                            </tr>
                          </thead>
                          <tbody>
                            {studentsData.getStudentsByClass.map(stu => (
                              <tr key={stu.registrationNo}>
                                <td style={{ padding: '1rem' }}><div className="fw-semibold">{stu.registrationNo}</div></td>
                                <td style={{ padding: '1rem' }}>
                                  <div className="d-flex align-items-center">
                                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px', color: '#1d3557' }}>
                                      <FiUser size={16} />
                                    </div>
                                    <div><div className="fw-medium">{stu.student_name}</div></div>
                                  </div>
                                </td>
                                <td style={{ padding: '1rem' }}>
                                  <Form.Control
                                    type="number"
                                    value={marksMap[stu.registrationNo.toString()] ?? ''}
                                    onChange={(e) => handleMarkChange(stu.registrationNo, e.target.value)}
                                    min="0"
                                    max={totalMarks}
                                    style={{ width: '100px' }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>

                      <div className="d-flex justify-content-end mt-4">
                        <Button
                          variant="primary"
                          onClick={handleSubmit}
                          // disabled={loadingSubmit || Object.keys(marksMap).length === 0}
                          style={{ backgroundColor: '#1d3557', border: 'none', minWidth: '150px' }}
                        >
                          {loadingSubmit ? (
                            <>
                              <Spinner as="span" animation="border" size="sm" className="me-2" />
                              Submitting...
                            </>
                          ) : (
                            `Submit Marks (${Object.keys(marksMap).length})`
                          )}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Alert variant="info" className="shadow-sm">No students found in this class</Alert>
                  )}
                </Card.Body>
              </Card>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};
