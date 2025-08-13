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
import { BULK_IMPORT_TEACHERS } from '../../GraphQL/Mutation';

export const BulkTeacherImport = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);
    const [bulkImportTeachers] = useMutation(BULK_IMPORT_TEACHERS);

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

            const requiredFields = ['emp_id', 'emp_name', 'emp_email', 'emp_phone', 'dep_id'];
            const missingFields = requiredFields.filter(field => !(field in data[0]));

            if (missingFields.length > 0) {
                throw new Error(`Missing required columns: ${missingFields.join(', ')}`);
            }

            // Format data for backend with proper type conversion
            const formattedData = data.map((row, index) => {
                // Validate phone number format
                const phoneRegex = /^[0-9]{10,15}$/;
                if (!phoneRegex.test(row.emp_phone)) {
                    throw new Error(`Row ${index + 1}: Invalid phone number format`);
                }

                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(row.emp_email)) {
                    throw new Error(`Row ${index + 1}: Invalid email format`);
                }

                return {
                    emp_id: String(row.emp_id),
                    emp_name: String(row.emp_name),
                    emp_email: String(row.emp_email),
                    emp_phone: String(row.emp_phone),
                    dep_id: String(row.dep_id)
                };
            });

            console.log("Formatted data for API:", formattedData);

            // Simulate progress for better UX
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    const newProgress = prev + Math.floor(Math.random() * 10);
                    return newProgress > 90 ? 90 : newProgress;
                });
            }, 300);

            const response = await bulkImportTeachers({
                variables: {
                    input: {
                        teachers: formattedData,
                        overwrite: true // behave like students: always update if exists
                    }
                }
            });

            clearInterval(progressInterval);
            setProgress(100);

            if (response.errors) {
                throw new Error(response.errors[0].message);
            }

            if (!response.data?.bulkImportTeachers) {
                throw new Error('No data returned from server');
            }

            setResult(response.data.bulkImportTeachers);
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
                        emp_id: row.emp_id || row['Employee ID'] || row['ID'],
                        emp_name: row.emp_name || row['Name'] || row['Teacher Name'],
                        emp_email: row.emp_email || row['Email'] || row['Email Address'],
                        emp_phone: row.emp_phone || row['Phone'] || row['Phone Number'],
                        dep_id: row.dep_id || row['Department'] || row['Department ID']
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
                emp_id: 'T001',
                emp_name: 'John Doe',
                emp_email: 'john@example.com',
                emp_phone: '9876543210',
                dep_id: 'D001'
            },
            {
                emp_id: 'T002',
                emp_name: 'Jane Smith',
                emp_email: 'jane@example.com',
                emp_phone: '9876543211',
                dep_id: 'D002'
            }
        ];

        const ws = XLSX.utils.json_to_sheet(templateData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
        XLSX.writeFile(wb, 'teacher_import_template.xlsx');
    };

    return (
        <Container className="mt-4">
            <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <h5>Bulk Teacher Import</h5>
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
                            ) : 'Import Teachers'}
                        </Button>
                    </div>

                    {loading && (
                        <div className="mb-3">
                            <div className="d-flex justify-content-between mb-1">
                                <span>Importing teachers...</span>
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
                                                        <strong>Row {err.row}:</strong> {err.emp_id} - {err.error}
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