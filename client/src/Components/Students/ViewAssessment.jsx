import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Spinner, Alert } from 'react-bootstrap';

const GET_ASSESSMENT = gql`
  query GetAssessment($regno: String!) {
    getStudentAssessment(registrationNo: $regno) {
      registrationNo
      subjectCode
      Class_test_1
      Class_test_2
      MTE
      ETE
      attendance
      student {
        name
      }
    }
  }
`;

export const ViewAssessment = () => {
  const regno = "2023002"; // Hardcoded for now

  const { loading, error, data } = useQuery(GET_ASSESSMENT, {
    variables: { regno },
  });

  if (loading)
    return <Spinner animation="border" variant="primary" className="mt-4" />;
  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        Error loading assessments: {error.message}
      </Alert>
    );

  const studentName = data.getStudentAssessment[0]?.student?.name;
  console.log(data.getStudentAssessment[0]?.student?.name)

  return (
    <div className="mt-4">
      <h4 className="text-center">Assessment Report</h4>
      <p className="text-center text-muted">
        <strong>Student Name:</strong> {studentName || "N/A"}
      </p>

      <Table striped bordered hover responsive className="mt-3">
        <thead className="table-primary">
          <tr>
            <th>Subject Code</th>
            <th>Class Test 1</th>
            <th>Class Test 2</th>
            <th>Mid Term Exam (MTE)</th>
            <th>End Term Exam (ETE)</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {data.getStudentAssessment.map((assessment, idx) => (
            <tr key={idx}>
              <td>{assessment.subjectCode}</td>
              <td>{assessment.Class_test_1 ?? "N/A"}</td>
              <td>{assessment.Class_test_2 ?? "N/A"}</td>
              <td>{assessment.MTE ?? "N/A"}</td>
              <td>{assessment.ETE ?? "N/A"}</td>
              <td>{assessment.attendance ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
