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
import { useQuery, useMutation, gql } from "@apollo/client";

// ========== GraphQL Queries ==========
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

const SEND_REPORT = gql`
  mutation SendReportToParent($registrationNo: BigInt!, $mode: String!) {
    sendReportToParent(registrationNo: $registrationNo, mode: $mode)
  }
`;

export const Reports = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
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
  Card,
} from "react-bootstrap";
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery, useMutation, gql } from "@apollo/client";

// ================= GraphQL Queries =================
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

const SEND_REPORT = gql`
  mutation SendReportToParent($registrationNo: BigInt!, $mode: String!) {
    sendReportToParent(registrationNo: $registrationNo, mode: $mode)
  }
`;

export const Reports = () => {
  const [courseId, setCourseId] = useState("");
  const [semesterId, setSemesterId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const { data, loading, error } = useQuery(GET_STUDENT_REPORTS, {
    variables: { courseId, semester_id: semesterId, section_id: sectionId },
    skip: !courseId || !semesterId || !sectionId,
  });

  const [sendReportToParent] = useMutation(SEND_REPORT);

  const handleSend = async (regNo) => {
    try {
      await sendReportToParent({ variables: { registrationNo: regNo, mode: "whatsapp" } });
      alert("Report sent via WhatsApp!");
    } catch (err) {
      alert("Failed to send report.");
    }
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

        {/* ========== Filters ========== */}
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

        {/* ========== Loading/Error ========== */}
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Failed to load reports.</Alert>}

        {/* ========== Report Table ========== */}
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
                <th>Total</th>
                <th>Percentage</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((student) => (
                <tr
                  key={student.registrationNo}
                  onClick={() => setSelectedStudent(student)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{student.registrationNo}</td>
                  <td>{student.student_name}</td>
                  <td>{student.total}</td>
                  <td>{student.percentage}%</td>
                  <td>{student.result}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* ========== Selected Report Card ========== */}
        {selectedStudent && (
          <Card className="mt-4 shadow">
            <Card.Body>
              <h5>Report Card: {selectedStudent.student_name}</h5>
              <p>
                <strong>Roll No:</strong> {selectedStudent.registrationNo}
              </p>
              <p>
                <strong>Parent Phone:</strong> {selectedStudent.parentPhone}
              </p>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Max Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedStudent.marks.map((m, idx) => (
                    <tr key={idx}>
                      <td>{m.subjectName}</td>
                      <td>{m.marksObtained}</td>
                      <td>{m.maxMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p><strong>Total:</strong> {selectedStudent.total}</p>
              <p><strong>Percentage:</strong> {selectedStudent.percentage}%</p>
              <p><strong>Result:</strong> {selectedStudent.result}</p>
              <Button
                variant="success"
                onClick={() => handleSend(selectedStudent.registrationNo)}
              >
                Send via WhatsApp
              </Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
};

  const { data, loading, error, refetch } = useQuery(GET_STUDENT_REPORTS, {
    variables: { courseId, semester_id: semesterId, section_id: sectionId },
    skip: !courseId || !semesterId || !sectionId,
  });

  const [sendReportToParent] = useMutation(SEND_REPORT);

  const handleSend = async (regNo) => {
    try {
      await sendReportToParent({
        variables: { registrationNo: regNo, mode: "whatsapp" },
      });
      alert("Report sent successfully via WhatsApp!");
    } catch (err) {
      alert("Failed to send report.");
    }
  };

  const sortedData = data?.getStudentReports
    ?.slice()
    .sort((a, b) =>
      sortAsc
        ? a.registrationNo - b.registrationNo
        : b.registrationNo - a.registrationNo
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

        {/* Loading / Error State */}
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">Failed to load reports.</Alert>}

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
                      onClick={() => handleSend(student.registrationNo)}
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
