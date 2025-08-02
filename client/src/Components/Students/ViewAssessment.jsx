import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Spinner, Alert, Button } from 'react-bootstrap';
import { GeneratePDF } from '../Pdf/PdfDownload';// <-- adjust path as needed

const GET_ASSESSMENT = gql`
  query GetAssessment($regno: BigInt!) {
    getStudentAssessment(registrationNo: $regno) {
      registrationNo
      subjectCode
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
      student {
        student_name
        registrationNo
      }
      subject {
        subjectName
      }
      teacher {
        emp_name
      }
    }
  }
`;

export const ViewAssessment = () => {
    const regno = 20230004;

    const { loading, error, data } = useQuery(GET_ASSESSMENT, {
        variables: { regno },
    });

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <Spinner animation="border" variant="primary" />
        </div>
    );
    if (error)
        return (
            <Alert variant="danger" className="mt-4">
                Error loading assessments: {error.message}
            </Alert>
        );

    const assessments = data.getStudentAssessment;
    const studentName = assessments[0]?.student?.student_name ?? 'N/A';

    return (
        <div className="mt-4">
            <h4 className="text-center">Assessment Report</h4>
            <p className="text-center text-muted">
                <strong>Student Name:</strong> {studentName}
            </p>

            <div className="text-center mb-3">
                <Button variant="primary" onClick={() => GeneratePDF(assessments)}>
                    Download PDF
                </Button>
            </div>

            <Table striped bordered hover responsive className="mt-3">
                <thead className="table-primary">
                    <tr>
                        <th>Subject Code</th>
                        <th>Subject Name</th>
                        <th>Class Test 1</th>
                        <th>Class Test 2</th>
                        <th>MTE</th>
                        <th>ETE</th>
                        <th>Attendance (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {assessments.map((assessment, idx) => (
                        <tr key={idx}>
                            <td>{assessment.subjectCode}</td>
                            <td>{assessment.subject?.subjectName ?? 'N/A'}</td>
                            <td>{assessment.Class_test_1 ?? 'N/A'}</td>
                            <td>{assessment.Class_test_2 ?? 'N/A'}</td>
                            <td>{assessment.MTE ?? 'N/A'}</td>
                            <td>{assessment.ETE ?? 'N/A'}</td>
                            <td>{assessment.attendance ?? 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
