import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery, gql } from "@apollo/client";
import { RingLoader } from "../../Components/Spinner/RingLoader";
// ================= GraphQL Query =================
const GET_STUDENT_REPORTS = gql`
  query GetStudentReports($courseId: ID!, $semester_id: ID!, $section_id: String!) {
    getStudentReports(courseId: $courseId, semester_id: $semester_id, section_id: $section_id) {
      registrationNo
      student_name
      parentPhone
      marks {
        subjectName
        marksObtained
        maxMarks
      }
      total
      percentage
      result
    }
  }
`;

export const Reports = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { data, loading, error } = useQuery(GET_STUDENT_REPORTS, {
    variables: { courseId, semester_id: semesterId, section_id: sectionId },
    skip: !courseId || !semesterId || !sectionId,
  });

  // ===== WhatsApp message for a single student =====
  const sendWhatsappMessage = (student) => {
    if (!student.parentPhone) return;
    const phone = student.parentPhone.replace(/\D/g, "");
    const marksText = student.marks
      .map((m) => `${m.subjectName}: ${m.marksObtained}/${m.maxMarks}`)
      .join("\n");

    const message = `Hello! Here is the report for ${student.student_name}:\n${marksText}\nTotal: ${student.total}\nPercentage: ${student.percentage}%\nResult: ${student.result}`;
    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  // ===== Send all reports at once =====
  const handleSendAll = () => {
    if (!data?.getStudentReports?.length) return;
    data.getStudentReports.forEach((student) => {
      if (student.parentPhone) sendWhatsappMessage(student);
    });
  };

  const sortedData = data?.getStudentReports?.slice().sort((a, b) =>
    sortAsc ? a.registrationNo - b.registrationNo : b.registrationNo - a.registrationNo
  );

  return (
    <div className="d-flex">
      <div style={{ flexShrink: 0, width: "250px" }}>
        <TeaNav />
      </div>

      <Container className="bg-light p-4">
        <h4 className="text-center mb-4">Student Report Cards</h4>

        {/* Filter Inputs */}
        <Form className="mb-4">
          <Row>
            <Col md={4}>
              <Form.Select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
                <option value="">Select Course</option>
                <option value="1">BCA</option>
                <option value="2">BBA</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={semesterId} onChange={(e) => setSemesterId(e.target.value)}>
                <option value="">Select Semester</option>
                <option value="1">Sem 1</option>
                <option value="2">Sem 2</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <Form.Select value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>

        {/* Loading / Error */}
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Failed to load reports.</Alert>}

        {/* Send All Button */}
        {sortedData?.length > 0 && (
          <div className="mb-3">
            <Button variant="primary" onClick={handleSendAll}>
              Send All Reports via WhatsApp
            </Button>
          </div>
        )}

        {/* Report Table */}
        {sortedData?.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  Roll No{" "}
                  <Button size="sm" variant="link" onClick={() => setSortAsc(!sortAsc)}>
                    {sortAsc ? "▲" : "▼"}
                  </Button>
                </th>
                <th>Name</th>
                <th>Subjects</th>
                <th>Total</th>
                <th>Percentage</th>
                <th>Result</th>
                <th>Send</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((student) => (
                <tr key={student.registrationNo}>
                  <td>{student.registrationNo}</td>
                  <td>{student.student_name}</td>
                  <td>
                    <ul>
                      {student.marks.map((m, idx) => (
                        <li key={idx}>
                          {m.subjectName}: {m.marksObtained}/{m.maxMarks}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{student.total}</td>
                  <td>{student.percentage}%</td>
                  <td>{student.result}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => sendWhatsappMessage(student)}
                    >
                      WhatsApp
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </div>
  );
};
