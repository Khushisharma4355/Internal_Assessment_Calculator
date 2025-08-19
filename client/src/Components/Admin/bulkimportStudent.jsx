import React, { useState } from 'react';
import {
  Container,
  Card,
  Button,
  Form,
  Alert,
  Spinner,
  ProgressBar,
  Row,
  Col,
  ListGroup,
  Badge,
  Tabs,
  Tab,
  Modal
} from 'react-bootstrap';
import { FiUpload, FiDownload, FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle, FiX, FiFile, FiUserCheck } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useMutation } from '@apollo/client';
import { BULK_IMPORT_STUDENTS } from '../../GraphQL/Mutation';

export const BulkStudentImport = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [previewData, setPreviewData] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [bulkImportStudents] = useMutation(BULK_IMPORT_STUDENTS);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      
      // Read and preview the file
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);
          
          const transformedData = jsonData.map(row => ({
            registrationNo: row.registrationNo || row['Registration No'] || row['Reg No'],
            student_name: row.student_name || row['Student Name'] || row['Name'],
            student_email: row.student_email || row['Email'] || row['Email Address'],
            courseId: row.courseId || row['Course Code'] || row['Course'],
            rollno: row.rollno || row['Roll No'] || row['Roll Number'],
            semester_id: row.semester_id || row.Semester || row['Semester No'],
            section_id: row.section_id || row.Section || row['Section Name'],
            dep_id: row.dep_id || row.Department || row['Department Code'],
            parent_Detail: row.parent_Detail || row['Parent Contact'] || row['Parent Phone']
          }));
          
          setPreviewData(transformedData.slice(0, 5)); // Show first 5 rows for preview
        } catch (error) {
          console.error('Preview error:', error);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setResult({
        success: false,
        message: 'Please select a file first',
        details: {
          created: 0,
          updated: 0,
          skipped: 0,
          errors: [{ row: 0, error: 'No file selected' }]
        }
      });
      setShowResultModal(true);
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];

      if (!validTypes.includes(file.type) &&
        !['.xlsx', '.xls', '.csv'].some(ext => file.name.endsWith(ext))) {
        throw new Error('Please upload an Excel or CSV file only');
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File is too large. Maximum size is 5MB');
      }

      const data = await readExcel(file);
      
      // Validate data structure
      if (!data || data.length === 0) {
        throw new Error('The file appears to be empty. Please check and try again.');
      }

      const requiredFields = ['registrationNo', 'student_name', 'student_email'];
      const missingFields = requiredFields.filter(field => !(field in data[0]));

      if (missingFields.length > 0) {
        throw new Error(`Your file is missing these required columns: ${missingFields.join(', ')}. Please use our template.`);
      }

      // Format data for backend with proper type conversion
      const formattedData = data.map((row, index) => {
        // Convert parent_Detail to string if it exists
        const parentDetail = row.parent_Detail ? String(row.parent_Detail) : null;
        
        // Validate registrationNo is numeric
        const registrationNo = Number(row.registrationNo);
        if (isNaN(registrationNo)) {
          throw new Error(`Row ${index + 2}: Registration number must be a valid number`);
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(row.student_email))) {
          throw new Error(`Row ${index + 2}: Please enter a valid email address`);
        }

        return {
          student_name: String(row.student_name),
          courseId: String(row.courseId || ''),
          rollno: Number(row.rollno) || 0,
          registrationNo: registrationNo,
          student_email: String(row.student_email),
          parent_Detail: parentDetail,
          section_id: row.section_id ? String(row.section_id) : null,
          semester_id: Number(row.semester_id) || 1,
          dep_id: row.dep_id ? String(row.dep_id) : null
        };
      });

      const response = await bulkImportStudents({ 
        variables: { data: formattedData }
      });

      if (response.errors) {
        throw new Error('We encountered a problem while processing your file. Please try again.');
      }

      if (!response.data?.bulkImportStudents) {
        throw new Error('We did not receive a response from the server. Please try again.');
      }

      setResult(response.data.bulkImportStudents);
      setProgress(100);
    } catch (err) {
      console.error('Import error:', err);
      setResult({
        success: false,
        message: err.message,
        details: {
          created: 0,
          updated: 0,
          skipped: file ? 1 : 0,
          errors: [{ row: 0, error: err.message }]
        }
      });
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
      setShowResultModal(true);
    }
  };

  const readExcel = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet);

          const transformedData = jsonData.map(row => ({
            registrationNo: row.registrationNo || row['Registration No'] || row['Reg No'],
            student_name: row.student_name || row['Student Name'] || row['Name'],
            student_email: row.student_email || row['Email'] || row['Email Address'],
            courseId: row.courseId || row['Course Code'] || row['Course'],
            rollno: row.rollno || row['Roll No'] || row['Roll Number'],
            semester_id: row.semester_id || row.Semester || row['Semester No'],
            section_id: row.section_id || row.Section || row['Section Name'],
            dep_id: row.dep_id || row.Department || row['Department Code'],
            parent_Detail: row.parent_Detail || row['Parent Contact'] || row['Parent Phone']
          }));

          resolve(transformedData);
        } catch (error) {
          reject(new Error('We couldn\'t read your file. Please make sure it\'s a valid Excel or CSV file.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('There was an error reading your file. Please try again.'));
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const downloadTemplate = () => {
    const templateData = [
      {
        registrationNo: '1001',
        student_name: 'John Doe',
        student_email: 'john@example.com',
        rollno: '1',
        courseId: '1',
        semester_id: '1',
        section_id: 'S001',
        dep_id: 'DEP001',
        parent_Detail: "'9876543210" // Note the single quote to force text format
      }
    ];
    
    const ws = XLSX.utils.json_to_sheet(templateData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'student_import_template.xlsx');
  };

  const ResultModal = ({ show, onHide, result }) => {
    return (
      <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="import-result-modal shadow-lg"
    >
      {/* ✅ Proper Header */}
      <Modal.Header
        closeButton
        className={result?.success ? "bg-success text-white" : "bg-light"}
      >
        <Modal.Title className="d-flex align-items-center">
          {result?.success ? (
            <>
              <div className="bg-white p-2 rounded-circle me-3 shadow-sm">
                <FiCheckCircle size={28} className="text-success" />
              </div>
              <div>
                <h4 className="mb-0 fw-semibold">Import Successful!</h4>
                <p className="mb-0 small opacity-85">{result?.message}</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white p-2 rounded-circle me-3 shadow-sm">
                <FiAlertCircle size={28} className="text-danger" />
              </div>
              <div>
                <h4 className="mb-0 fw-semibold">Import Completed with Issues</h4>
                <p className="mb-0 small opacity-85">{result?.message}</p>
              </div>
            </>
          )}
        </Modal.Title>
      </Modal.Header>

      {/* ✅ Body */}
      <Modal.Body className="p-4">
        {result?.details && (
          <>
            {/* Summary */}
            <div className="mb-4 p-3 bg-light rounded shadow-sm">
              <h6 className="mb-3 fw-semibold">Import Summary</h6>
              <Row className="g-3">
                <Col md={4}>
                  <div className="text-center p-3 bg-success bg-opacity-10 rounded border border-success border-opacity-25 shadow-sm">
                    <FiUserCheck size={24} className="text-success mb-2" />
                    <h3 className="text-success mb-1">{result.details.created}</h3>
                    <p className="mb-0 text-muted small">Successfully Added</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-primary bg-opacity-10 rounded border border-primary border-opacity-25 shadow-sm">
                    <FiInfo size={24} className="text-primary mb-2" />
                    <h3 className="text-primary mb-1">{result.details.updated}</h3>
                    <p className="mb-0 text-muted small">Updated</p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="text-center p-3 bg-warning bg-opacity-10 rounded border border-warning border-opacity-25 shadow-sm">
                    <FiAlertCircle size={24} className="text-warning mb-2" />
                    <h3 className="text-warning mb-1">{result.details.skipped}</h3>
                    <p className="mb-0 text-muted small">Skipped</p>
                  </div>
                </Col>
              </Row>
            </div>

            {/* Issues */}
            {result.details.errors?.length > 0 && (
              <div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-semibold">Issues Found</h5>
                  <Badge bg="danger" pill>
                    {result.details.errors.length}{" "}
                    {result.details.errors.length === 1 ? "Issue" : "Issues"}
                  </Badge>
                </div>

                <div className="alert alert-warning shadow-sm">
                  <FiInfo className="me-2" />
                  Some records couldn't be processed. Please review the issues
                  below and try again.
                </div>

                <div className="border rounded overflow-hidden shadow-sm">
                  <div className="bg-light p-3 fw-semibold d-flex small border-bottom">
                    <div style={{ width: "70px" }} className="text-muted">
                      Row #
                    </div>
                    <div style={{ width: "140px" }} className="text-muted">
                      Student ID
                    </div>
                    <div className="text-muted">Issue Description</div>
                  </div>
                  <div
                    style={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      scrollBehavior: "smooth",
                    }}
                  >
                    {result.details.errors.slice(0, 20).map((err, i) => (
                      <div
                        key={i}
                        className="p-3 border-bottom d-flex align-items-start small"
                      >
                        <div
                          style={{ width: "70px" }}
                          className="fw-medium text-muted"
                        >
                          {err.row || "-"}
                        </div>
                        <div style={{ width: "140px" }} className="fw-medium">
                          {err.registrationNo || "N/A"}
                        </div>
                        <div className="text-danger">{err.error}</div>
                      </div>
                    ))}
                    {result.details.errors.length > 20 && (
                      <div className="p-3 text-center text-muted bg-light small">
                        <FiInfo className="me-1" />
                        {result.details.errors.length - 20} more issues not
                        shown. Please correct these issues and try again.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-3 p-3 bg-light rounded small shadow-sm">
                  <h6 className="mb-2 fw-semibold">Next Steps:</h6>
                  <ul className="mb-0 ps-3">
                    <li>Correct the issues listed above in your file</li>
                    <li>Save your changes and try importing again</li>
                    <li>Contact support if you need help with any errors</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Success with No Errors */}
            {result?.success && result.details.errors?.length === 0 && (
              <div className="text-center py-4">
                <FiCheckCircle size={48} className="text-success mb-3" />
                <h5 className="text-success fw-semibold">
                  All records processed successfully!
                </h5>
                <p className="text-muted">
                  Your student data has been imported without any issues.
                </p>
              </div>
            )}
          </>
        )}
      </Modal.Body>

      {/* ✅ Footer */}
      <Modal.Footer className="justify-content-between">
        <Button variant="outline-secondary" onClick={onHide}>
          Close
        </Button>
        <div>
          {/* {result?.details?.errors?.length > 0 && (
            // <Button variant="outline-primary" className="me-2">
            //   <FiDownload className="me-2" />
            //   Download Error Report
            // </Button>
          )} */}
          <Button
            variant={result?.success ? "outline-success" : "primary"}
            onClick={onHide}
          >
            {result?.success ? "Done" : "Try Again"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
    );
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Bulk Student Import</h2>
          <p className="text-muted mb-0">Import multiple students using an Excel or CSV file</p>
        </div>
        <Button 
          variant="outline-primary" 
          onClick={downloadTemplate}
          className="d-flex align-items-center"
        >
          <FiDownload className="me-2" />
          Download Template
        </Button>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-white border-0 pt-4">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
            fill
          >
            <Tab eventKey="upload" title="Upload File" />
            <Tab eventKey="instructions" title="Instructions" />
          </Tabs>
        </Card.Header>
        
        <Card.Body className="pb-4">
          {activeTab === 'upload' && (
            <>
              <Row className="mb-4">
                <Col lg={8}>
                  <div className="border rounded p-4 bg-light">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary p-2 rounded-circle me-3">
                        <FiUpload size={20} className="text-white" />
                      </div>
                      <div>
                        <h5 className="mb-0">Upload Student Data</h5>
                        <p className="text-muted small mb-0">Select your Excel or CSV file</p>
                      </div>
                    </div>
                    
                    <Form.Group>
                      <Form.Label className="fw-semibold">Select File</Form.Label>
                      <div className="d-flex">
                        <div className="flex-grow-1 me-2">
                          <Form.Control
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileChange}
                          />
                        </div>
                        <Button 
                          variant="primary" 
                          onClick={handleImport}
                          disabled={!file || loading}
                          className="px-4"
                        >
                          {loading ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              Importing...
                            </>
                          ) : 'Import'}
                        </Button>
                      </div>
                      {fileName && (
                        <div className="mt-2 d-flex align-items-center">
                          <FiFile className="text-primary me-2" />
                          <small className="text-muted">
                            Selected: <span className="fw-semibold">{fileName}</span>
                          </small>
                        </div>
                      )}
                    </Form.Group>
                  </div>
                </Col>
                
                <Col lg={4}>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-2">
                        <FiInfo size={20} className="text-primary me-2" />
                        <h6 className="mb-0">Quick Tips</h6>
                      </div>
                      <ul className="small ps-3 mb-0">
                        <li>File size should not exceed 5MB</li>
                        <li>Supported formats: XLSX, XLS, CSV</li>
                        <li>Download our template for correct formatting</li>
                        <li>Ensure all required columns are present</li>
                      </ul>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {previewData.length > 0 && (
                <div className="mb-4">
                  <h6 className="mb-3 d-flex align-items-center">
                    <FiInfo className="me-2 text-primary" />
                    Data Preview (First 5 Rows)
                  </h6>
                  <div className="table-responsive">
                    <table className="table table-bordered table-sm">
                      <thead className="table-light">
                        <tr>
                          {Object.keys(previewData[0]).map((key) => (
                            <th key={key} className="text-capitalize">
                              {key.replace(/_/g, ' ')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {previewData.map((row, idx) => (
                          <tr key={idx}>
                            {Object.values(row).map((value, i) => (
                              <td key={i} className="text-truncate" style={{maxWidth: '150px'}}>
                                {value || <span className="text-muted">N/A</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="text-muted small">
                    <FiInfo className="me-1" />
                    This is a preview of your data. The system will process {previewData.length * 2} rows in total.
                  </div>
                </div>
              )}

              {loading && (
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="fw-medium">Processing your file...</span>
                    <span className="fw-semibold">{progress}%</span>
                  </div>
                  <ProgressBar 
                    now={progress} 
                    animated 
                    variant={progress < 100 ? "primary" : "success"}
                    style={{ height: '8px' }}
                  />
                  <div className="text-muted small mt-2">
                    Please don't close this window while we process your file.
                  </div>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'instructions' && (
            <div>
              <h5 className="mb-4">File Format Instructions</h5>
              
              <Row>
                <Col md={6}>
                  <Card className="border-0 bg-light mb-4">
                    <Card.Header className="bg-transparent border-0 fw-semibold d-flex align-items-center">
                      <FiAlertCircle className="text-danger me-2" />
                      Required Fields
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="px-0 bg-transparent">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium">registrationNo</span>
                            <Badge bg="danger">Required</Badge>
                          </div>
                          <small className="text-muted">Unique student registration number (numbers only)</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium">student_name</span>
                            <Badge bg="danger">Required</Badge>
                          </div>
                          <small className="text-muted">Full name of the student</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium">student_email</span>
                            <Badge bg="danger">Required</Badge>
                          </div>
                          <small className="text-muted">Valid email address (e.g., student@example.com)</small>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
                
                <Col md={6}>
                  <Card className="border-0 bg-light mb-4">
                    <Card.Header className="bg-transparent border-0 fw-semibold d-flex align-items-center">
                      <FiInfo className="text-primary me-2" />
                      Optional Fields
                    </Card.Header>
                    <Card.Body>
                      <ListGroup variant="flush">
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">courseId</span>
                          <small className="text-muted d-block">Course identifier code</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">rollno</span>
                          <small className="text-muted d-block">Roll number (numbers only)</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">semester_id</span>
                          <small className="text-muted d-block">Semester number (e.g., 1, 2, 3...)</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">section_id</span>
                          <small className="text-muted d-block">Section identifier (e.g., A, B, C)</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">dep_id</span>
                          <small className="text-muted d-block">Department identifier code</small>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 bg-transparent">
                          <span className="fw-medium">parent_Detail</span>
                          <small className="text-muted d-block">Parent contact information</small>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              
              <Alert variant="info" className="border-0">
                <div className="d-flex">
                  <FiInfo className="me-2 mt-1 flex-shrink-0" />
                  <div>
                    <h6>Important Notes</h6>
                    <ul className="mb-0 ps-3">
                      <li>Ensure all required fields are present in your file</li>
                      <li>Registration numbers must be unique for each student</li>
                      <li>Email addresses should be valid and properly formatted</li>
                      <li>Numeric fields should contain only numbers</li>
                      <li>For large files, processing may take several minutes</li>
                      <li>Save your file as Excel (.xlsx) for best results</li>
                    </ul>
                  </div>
                </div>
              </Alert>
            </div>
          )}
        </Card.Body>
      </Card>

      <ResultModal show={showResultModal} onHide={() => setShowResultModal(false)} result={result} />
    </Container>
  );
};