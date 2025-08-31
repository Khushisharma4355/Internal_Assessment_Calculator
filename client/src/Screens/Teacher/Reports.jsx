import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Form,
  Button,
  Spinner,
  Alert,
  Card
} from "react-bootstrap";
import { TeaNav } from "../../Components/Teachers/TeaNav";
import { useQuery, gql } from "@apollo/client";
import { RingLoader } from "../../Components/Spinner/RingLoader";
import { FaBars, FaTimes, FaWhatsapp, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      {/* Sidebar (Desktop) */}
      <div
        className="d-none d-lg-block position-fixed h-100"
        style={{ 
          width: "250px", 
          background: "#fff", 
          borderRight: "1px solid #dee2e6",
          zIndex: 1000
        }}
      >
        <TeaNav />
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-3 p-md-4"
        style={
          isMobile
            ? { width: "100%" }
            : { marginLeft: "250px", width: "calc(100% - 250px)" }
        }
      >
        {/* Mobile Nav Toggle */}
        <div className="d-lg-none mb-3">
          <Button
            variant="outline-secondary"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          >
            {isMobileNavOpen ? <FaTimes className="me-1" /> : <FaBars className="me-1" />}
            Menu
          </Button>
        </div>

        {/* Mobile Overlay Nav */}
        {isMobileNavOpen && (
          <div
            className="d-lg-none position-fixed top-0 start-0 h-100 w-100"
            style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className="h-100"
              style={{ width: "75%", maxWidth: "280px", background: "#fff" }}
              onClick={(e) => e.stopPropagation()}
            >
              <TeaNav onSelect={() => setIsMobileNavOpen(false)} />
            </div>
          </div>
        )}

        {/* Content */}
        <Container fluid className="p-0">
          <h4 className="mb-4" style={{ color: '#1d3557' }}>Student Report Cards</h4>

          {/* Filter Inputs */}
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <Form>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Course</Form.Label>
                      <Form.Select 
                        value={courseId} 
                        onChange={(e) => setCourseId(e.target.value)}
                        style={{ borderColor: '#1d3557' }}
                      >
                        <option value="">Select Course</option>
                        <option value="1">BCA</option>
                        <option value="2">BBA</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Semester</Form.Label>
                      <Form.Select 
                        value={semesterId} 
                        onChange={(e) => setSemesterId(e.target.value)}
                        style={{ borderColor: '#1d3557' }}
                      >
                        <option value="">Select Semester</option>
                        <option value="1">Sem 1</option>
                        <option value="2">Sem 2</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Section</Form.Label>
                      <Form.Select 
                        value={sectionId} 
                        onChange={(e) => setSectionId(e.target.value)}
                        style={{ borderColor: '#1d3557' }}
                      >
                        <option value="">Select Section</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>

          {/* Loading / Error */}
          {loading && (
            <div className="text-center py-5">
              <RingLoader />
            </div>
          )}
          
          {error && (
            <Alert variant="danger" className="shadow-sm">
              <Alert.Heading>Error Loading Reports</Alert.Heading>
              Failed to load reports: {error.message}
            </Alert>
          )}

          {/* Send All Button */}
          {sortedData?.length > 0 && (
            <div className="mb-3">
              <Button 
                variant="primary" 
                onClick={handleSendAll}
                style={{ backgroundColor: '#1d3557', border: 'none' }}
              >
                <FaWhatsapp className="me-2" />
                Send All Reports via WhatsApp
              </Button>
            </div>
          )}

          {/* Report Table */}
          {sortedData?.length > 0 && (
            <Card className="shadow-sm border-0">
              <Card.Body className="p-0">
                <div className="table-responsive">
                  <Table striped bordered hover className="mb-0">
                    <thead style={{ backgroundColor: '#f1f3f5' }}>
                      <tr>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>
                          <div className="d-flex align-items-center">
                            Roll No
                            <Button 
                              size="sm" 
                              variant="link" 
                              onClick={() => setSortAsc(!sortAsc)}
                              className="p-0 ms-2"
                            >
                              {sortAsc ? <FaSortUp /> : <FaSortDown />}
                            </Button>
                          </div>
                        </th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Name</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Subjects</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Total</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Percentage</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Result</th>
                        <th style={{ padding: '1rem', borderTop: 'none' }}>Send</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData.map((student) => (
                        <tr key={student.registrationNo}>
                          <td style={{ padding: '1rem' }}>{student.registrationNo}</td>
                          <td style={{ padding: '1rem' }}>{student.student_name}</td>
                          <td style={{ padding: '1rem' }}>
                            <ul className="mb-0" style={{ paddingLeft: '1rem' }}>
                              {student.marks.map((m, idx) => (
                                <li key={idx} className="small">
                                  {m.subjectName}: {m.marksObtained}/{m.maxMarks}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td style={{ padding: '1rem' }}>{student.total}</td>
                          <td style={{ padding: '1rem' }}>{student.percentage}%</td>
                          <td style={{ padding: '1rem' }}>
                            <span 
                              className={`badge ${
                                student.result === 'PASS' 
                                  ? 'bg-success' 
                                  : 'bg-danger'
                              }`}
                            >
                              {student.result}
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => sendWhatsappMessage(student)}
                              disabled={!student.parentPhone}
                              title={!student.parentPhone ? "No parent phone number available" : ""}
                            >
                              <FaWhatsapp className="me-1" />
                              WhatsApp
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          )}

          {/* No Data Message */}
          {!loading && !error && courseId && semesterId && sectionId && !sortedData?.length && (
            <Alert variant="info" className="shadow-sm">
              <Alert.Heading>No Reports Found</Alert.Heading>
              No student reports found for the selected criteria.
            </Alert>
          )}
        </Container>
      </div>
    </div>
  );
};