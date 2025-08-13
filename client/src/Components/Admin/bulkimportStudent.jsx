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
  ListGroup
} from 'react-bootstrap';
import { FiUpload, FiDownload, FiAlertCircle } from 'react-icons/fi';
import * as XLSX from 'xlsx';
import { useMutation } from '@apollo/client';
import { BULK_IMPORT_STUDENTS } from '../../GraphQL/Mutation';

export const BulkStudentImport = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [bulkImportStudents] = useMutation(BULK_IMPORT_STUDENTS);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
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
      return;
    }

    setLoading(true);
    setProgress(0);
    setResult(null);

    try {
      // Validate file type
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ];

      if (!validTypes.includes(file.type) &&
        !['.xlsx', '.xls', '.csv'].some(ext => file.name.endsWith(ext))) {
        throw new Error('Invalid file type. Please upload Excel or CSV');
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size exceeds 5MB limit');
      }

      const data = await readExcel(file);
      
      // Validate data structure
      if (!data || data.length === 0) {
        throw new Error('File contains no data');
      }

      const requiredFields = ['registrationNo', 'student_name', 'student_email'];
      const missingFields = requiredFields.filter(field => !(field in data[0]));

      if (missingFields.length > 0) {
        throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
      }

      // Format data for backend with proper type conversion
      const formattedData = data.map((row, index) => {
        // Convert parent_Detail to string if it exists
        const parentDetail = row.parent_Detail ? String(row.parent_Detail) : null;
        
        // Validate registrationNo is numeric
        const registrationNo = Number(row.registrationNo);
        if (isNaN(registrationNo)) {
          throw new Error(`Row ${index + 1}: Invalid registration number format`);
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

      console.log("Formatted data for API:", formattedData);

      const response = await bulkImportStudents({ 
        variables: { data: formattedData }
      });

      if (response.errors) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.bulkImportStudents) {
        throw new Error('No data returned from server');
      }

      setResult(response.data.bulkImportStudents);
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
      setLoading(false);
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

          console.log('Transformed Data:', transformedData);
          resolve(transformedData);
        } catch (error) {
          reject(new Error('Error processing Excel file: ' + error.message));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error reading file'));
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

  return (
    <Container className="mt-4">
      <Card className="shadow-sm">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h5>Bulk Student Import</h5>
          <FiUpload size={20} />
        </Card.Header>
        <Card.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Select Excel/CSV File</Form.Label>
                <div className="d-flex">
                  <Form.Control
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileChange}
                    className="me-2"
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={downloadTemplate}
                  >
                    <FiDownload className="me-2" />
                    Template
                  </Button>
                </div>
                {fileName && (
                  <small className="text-muted mt-1 d-block">
                    Selected: {fileName}
                  </small>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex gap-2 mb-4">
            <Button 
              variant="primary" 
              onClick={handleImport}
              disabled={!file || loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Importing...
                </>
              ) : 'Import Students'}
            </Button>
          </div>

          {loading && (
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-1">
                <span>Importing students...</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar now={progress} animated label={`${progress}%`} />
            </div>
          )}

          {result && (
            <Alert variant={result.success ? 'success' : 'danger'}>
              <div className="d-flex align-items-center">
                {!result.success && <FiAlertCircle className="me-2" size={20} />}
                <h5 className="mb-1">{result.message}</h5>
              </div>
              
              {result.details && (
                <>
                  <Row className="mt-3">
                    <Col md={4}>
                      <Card className="border-0 bg-light">
                        <Card.Body className="py-2">
                          <small className="text-muted">Created</small>
                          <h4 className="text-success mb-0">
                            {result.details.created}
                          </h4>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="border-0 bg-light">
                        <Card.Body className="py-2">
                          <small className="text-muted">Updated</small>
                          <h4 className="text-primary mb-0">
                            {result.details.updated}
                          </h4>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={4}>
                      <Card className="border-0 bg-light">
                        <Card.Body className="py-2">
                          <small className="text-muted">Skipped</small>
                          <h4 className="text-warning mb-0">
                            {result.details.skipped}
                          </h4>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>

                  {result.details.errors?.length > 0 && (
                    <div className="mt-3">
                      <h6>Error Details:</h6>
                      <ListGroup variant="flush" className="small">
                        {result.details.errors.slice(0, 10).map((err, i) => (
                          <ListGroup.Item key={i} className="py-2">
                            <strong>Row {err.row}:</strong> {err.registrationNo} - {err.error}
                          </ListGroup.Item>
                        ))}
                        {result.details.errors.length > 10 && (
                          <ListGroup.Item className="py-2 text-muted">
                            + {result.details.errors.length - 10} more errors...
                          </ListGroup.Item>
                        )}
                      </ListGroup>
                    </div>
                  )}
                </>
              )}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};