import React, { useState, useMemo } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  ProgressBar,
  Modal
} from "react-bootstrap";
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa";
import { AdminNav } from "../../Components/Admin/AdminNav";
import { RingLoader } from "../../Components/Spinner/RingLoader";
const GET_ALL_STUDENTS_WITH_ASSESSMENTS = gql`
  query GetAllStudentsWithAssessments {
    getAllStudentsWithAssessments {
      registrationNo
      studentName
      parentPhone
      assessments {
        subjectCode
        Class_test_1
        Class_test_2
        MTE
        ETE
        attendance
      }
    }
  }
`;

const SEND_REPORT = gql`
  mutation SendReport($parentPhone: String!, $message: String!) {
    sendReport(parentPhone: $parentPhone, message: $message) {
      success
      sid
      error
    }
  }
`;

export const SendAllReports = () => {
  const { loading, error, data } = useQuery(GET_ALL_STUDENTS_WITH_ASSESSMENTS, { fetchPolicy: "no-cache" });
  const [sendReport] = useMutation(SEND_REPORT);

  const [sending, setSending] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  const uniqueStudents = useMemo(() => {
    if (!data?.getAllStudentsWithAssessments) return [];
    const seen = new Set();
    return data.getAllStudentsWithAssessments.filter(student => {
      if (seen.has(student.registrationNo)) return false;
      seen.add(student.registrationNo);
      return true;
    });
  }, [data]);

  const handleSendReports = async () => {
    setShowConfirmModal(false);
    setSending(true);
    setProgress(0);
    setCompleted(0);

    const totalStudents = uniqueStudents.length;
    let count = 0;

    for (const student of uniqueStudents) {
      if (!student.parentPhone) continue; // skip if no parent phone

      try {
        const reportText = `Hello ${student.studentName}, your marks:\n` +
          (student.assessments?.length > 0
            ? student.assessments.map(a =>
                `${a.subjectCode}: CT1-${a.Class_test_1 || 0}, CT2-${a.Class_test_2 || 0}, MTE-${a.MTE || 0}, ETE-${a.ETE || 0}, Attendance-${a.attendance || 0}%`
              ).join("\n")
            : "No assessments found.");

        const response = await sendReport({
          variables: { parentPhone: student.parentPhone, message: reportText }
        });

        if (!response.data.sendReport.success) {
          console.error(`Failed to send to ${student.parentPhone}: ${response.data.sendReport.error}`);
        }

        count++;
        setCompleted(count);
        setProgress(Math.round((count / totalStudents) * 100));
      } catch (err) {
        console.error(`Error sending to ${student.parentPhone}:`, err.message);
      }
    }

    setSending(false);
    alert(`Reports sent to ${count} parents!`);
  };

 if (loading) {
    return (
     <RingLoader/>
    );
  }
  if (error) {
    return <Alert variant="danger" className="m-4">Error fetching students: {error.message}</Alert>;
  }

  return (
    <div className="d-flex">
      <div style={{ width: "250px", flexShrink: 0 }}><AdminNav /></div>
      <Container fluid className="p-4">
        <h2 className="mb-3 text-center"><FaPaperPlane className="me-2" />Send Student Reports</h2>

        <div className="text-center mb-3">
          <Button
            variant="success"
            onClick={() => setShowConfirmModal(true)}
            disabled={sending || uniqueStudents.length === 0}
          >
            <FaWhatsapp className="me-2" />
            {sending ? "Sending Reports..." : "Send All Reports via WhatsApp"}
          </Button>
        </div>

        {sending && (
          <ProgressBar now={progress} label={`${progress}%`} animated striped className="mb-3" />
        )}

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Student Name</th>
              <th>Parent Phone</th>
              <th>Subject</th>
              <th>CT1</th>
              <th>CT2</th>
              <th>MTE</th>
              <th>ETE</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {uniqueStudents.map(student => (
              student.assessments?.length > 0 ? (
                student.assessments.map((a, idx) => (
                  <tr key={`${student.registrationNo}-${idx}`}>
                    {idx === 0 && (
                      <>
                        <td rowSpan={student.assessments.length}>{student.registrationNo}</td>
                        <td rowSpan={student.assessments.length}>{student.studentName}</td>
                        <td rowSpan={student.assessments.length}>{student.parentPhone}</td>
                      </>
                    )}
                    <td>{a.subjectCode}</td>
                    <td>{a.Class_test_1 || 0}</td>
                    <td>{a.Class_test_2 || 0}</td>
                    <td>{a.MTE || 0}</td>
                    <td>{a.ETE || 0}</td>
                    <td>{a.attendance || 0}%</td>
                  </tr>
                ))
              ) : (
                <tr key={student.registrationNo}>
                  <td>{student.registrationNo}</td>
                  <td>{student.studentName}</td>
                  <td>{student.parentPhone}</td>
                  <td colSpan="6" className="text-center">No assessments found</td>
                </tr>
              )
            ))}
          </tbody>
        </Table>

        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title><FaWhatsapp className="me-2 text-success" />Confirm Send Reports</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to send reports to all {uniqueStudents.length} parents via WhatsApp?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
            <Button variant="success" onClick={handleSendReports}>
              <FaWhatsapp className="me-2" />Confirm Send
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
