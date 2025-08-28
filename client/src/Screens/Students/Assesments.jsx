import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Stunav } from "../../Components/Students/Stunav"

import { 
  Card, 
  Spinner, 
  Alert, 
  Button, 
  Badge,
  ProgressBar,
  Container,
  Row,
  Col
} from 'react-bootstrap';

import { GeneratePDF } from '../../Components/Pdf/PdfDownload';
import { RingLoader } from '../../Components/Spinner/RingLoader';
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

const GradeBadge = ({ score }) => {
  if (score === null || score === undefined) return <Badge bg="secondary">N/A</Badge>;
  if (score >= 90) return <Badge bg="success">{score}</Badge>;
  if (score >= 75) return <Badge bg="primary">{score}</Badge>;
  if (score >= 50) return <Badge bg="warning" text="dark">{score}</Badge>;
  return <Badge bg="danger">{score}</Badge>;
};



export const Assesments=()=>{

     const regno = 20230003;
    
        const { loading, error, data } = useQuery(GET_ASSESSMENT, {
            variables: { regno },
        });
    
        if (loading) return (
            <RingLoader/>
        );
        if (error)
            return (
                <Alert variant="danger" className="mt-4">
                    Error loading assessments: {error.message}
                </Alert>
            );
    
        const assessments = data.getStudentAssessment;
        const studentName = assessments[0]?.student?.student_name ?? 'N/A';
        const registrationNo = assessments[0]?.student?.registrationNo ?? 'N/A';
    
        // Calculate overall performance
        const overallPerformance = assessments.reduce((acc, curr) => {
          const total = (curr.Class_test_1 || 0) + (curr.Class_test_2 || 0) + (curr.MTE || 0) + (curr.ETE || 0);
          return acc + (total / 4);
        }, 0) / assessments.length;
    return(
        <>
        <div className="d-flex">
            <div style={{flexShrink:0, width:"250px"}}>
           <Stunav/>
            </div>

        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">

    <Container className="my-4">
                <Card className="shadow-sm border-0">
                    <Card.Header className="bg-primary text-white">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h4 className="mb-0">Student Assessment Report</h4>
                                <small className="opacity-75">Academic Year 2023-2024</small>
                            </div>
                            <Button 
                                variant="light" 
                                size="sm"
                                onClick={() => GeneratePDF(assessments)}
                            >
                                <i className="bi bi-download me-2"></i>Download PDF
                            </Button>
                        </div>
                    </Card.Header>
                    
                    <Card.Body>
                        {/* Student Info Header */}
                        <div className="text-center mb-4">
                            <div className="avatar-lg bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                                <i className="bi bi-person-fill text-primary fs-2"></i>
                            </div>
                            <h3 className="mb-1">{studentName}</h3>
                            <p className="text-muted mb-2">Registration No: {registrationNo}</p>
                            
                            <div className="d-flex justify-content-center gap-3 mb-3">
                                <div>
                                    <span className="text-muted">Total Subjects</span>
                                    <h5 className="mb-0">{assessments.length}</h5>
                                </div>
                                <div>
                                    <span className="text-muted">Overall Performance</span>
                                    <h5 className="mb-0">
                                        <GradeBadge score={Math.round(overallPerformance)} />
                                    </h5>
                                </div>
                            </div>
                        </div>
    
                        {/* Performance Summary */}
                        <Card className="mb-4 border-0 bg-light">
                            <Card.Body>
                                <h5 className="mb-3">Performance Summary</h5>
                                <Row className="g-3">
                                    <Col md={4}>
                                        <div className="p-3 bg-white rounded">
                                            <h6 className="text-muted">Average Score</h6>
                                            <ProgressBar 
                                                now={overallPerformance} 
                                                variant={overallPerformance >= 75 ? 'success' : overallPerformance >= 50 ? 'warning' : 'danger'}
                                                label={`${Math.round(overallPerformance)}%`}
                                                className="mb-2"
                                                style={{ height: '6px' }}
                                            />
                                            <small className="text-muted">Based on all assessments</small>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="p-3 bg-white rounded">
                                            <h6 className="text-muted">Average Attendance</h6>
                                            <ProgressBar 
                                                now={assessments.reduce((acc, curr) => acc + (curr.attendance || 0), 0) / assessments.length}
                                                variant="info"
                                                label={`${Math.round(assessments.reduce((acc, curr) => acc + (curr.attendance || 0), 0) / assessments.length)}%`}
                                                className="mb-2"
                                                style={{ height: '6px' }}
                                            />
                                            <small className="text-muted">Across all subjects</small>
                                        </div>
                                    </Col>
                                    <Col md={4}>
                                        <div className="p-3 bg-white rounded">
                                            <h6 className="text-muted">Best Subject</h6>
                                            <h5 className="text-success mb-1">
                                                {assessments.reduce((prev, current) => 
                                                    ((prev.Class_test_1 + prev.Class_test_2 + prev.MTE + prev.ETE) > 
                                                    (current.Class_test_1 + current.Class_test_2 + current.MTE + current.ETE)) ? prev : current
                                                ).subject?.subjectName}
                                            </h5>
                                            <small className="text-muted">Highest combined score</small>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
    
                        {/* Subjects Assessment */}
                        <h5 className="mb-3">Subject-wise Assessment</h5>
                        <Row className="g-4">
                            {assessments.map((assessment, idx) => {
                                const totalScore = (
                                    (assessment.Class_test_1 || 0) + 
                                    (assessment.Class_test_2 || 0) + 
                                    (assessment.MTE || 0) + 
                                    (assessment.ETE || 0)
                                ) / 4;
                                
                                return (
                                    <Col key={idx} md={6} lg={4}>
                                        <Card className="h-100 shadow-sm">
                                            <Card.Header className="bg-white border-bottom-0">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <h6 className="mb-0">{assessment.subject?.subjectName}</h6>
                                                    <Badge bg="light" text="dark" className="fw-normal">
                                                        {assessment.subjectCode}
                                                    </Badge>
                                                </div>
                                            </Card.Header>
                                            <Card.Body>
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <small>Class Test 1</small>
                                                        <small><GradeBadge score={assessment.Class_test_1} /></small>
                                                    </div>
                                                    <ProgressBar 
                                                        now={assessment.Class_test_1 || 0} 
                                                        variant={assessment.Class_test_1 >= 75 ? 'success' : assessment.Class_test_1 >= 50 ? 'primary' : 'danger'}
                                                        style={{ height: '3px' }}
                                                    />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <small>Class Test 2</small>
                                                        <small><GradeBadge score={assessment.Class_test_2} /></small>
                                                    </div>
                                                    <ProgressBar 
                                                        now={assessment.Class_test_2 || 0} 
                                                        variant={assessment.Class_test_2 >= 75 ? 'success' : assessment.Class_test_2 >= 50 ? 'primary' : 'danger'}
                                                        style={{ height: '3px' }}
                                                    />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <small>Mid-Term Exam</small>
                                                        <small><GradeBadge score={assessment.MTE} /></small>
                                                    </div>
                                                    <ProgressBar 
                                                        now={assessment.MTE || 0} 
                                                        variant={assessment.MTE >= 75 ? 'success' : assessment.MTE >= 50 ? 'primary' : 'danger'}
                                                        style={{ height: '3px' }}
                                                    />
                                                </div>
                                                
                                                <div className="mb-3">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <small>End-Term Exam</small>
                                                        <small><GradeBadge score={assessment.ETE} /></small>
                                                    </div>
                                                    <ProgressBar 
                                                        now={assessment.ETE || 0} 
                                                        variant={assessment.ETE >= 75 ? 'success' : assessment.ETE >= 50 ? 'primary' : 'danger'}
                                                        style={{ height: '3px' }}
                                                    />
                                                </div>
                                                
                                                <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                                    <small className="text-muted">Attendance</small>
                                                    <div className="d-flex align-items-center">
                                                        <small className="me-2">{assessment.attendance || 0}%</small>
                                                        <ProgressBar 
                                                            now={assessment.attendance || 0} 
                                                            variant={assessment.attendance >= 85 ? 'success' : assessment.attendance >= 70 ? 'warning' : 'danger'}
                                                            style={{ width: '60px', height: '5px' }}
                                                        />
                                                    </div>
                                                </div>
                                            </Card.Body>
                                            <Card.Footer className="bg-white border-top-0">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <small className="text-muted">Overall</small>
                                                    <Badge bg={totalScore >= 75 ? 'success' : totalScore >= 50 ? 'primary' : 'danger'}>
                                                        {Math.round(totalScore)}%
                                                    </Badge>
                                                </div>
                                            </Card.Footer>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
    
                        {/* Footer Notes */}
                        <div className="mt-4 pt-3 border-top text-center text-muted">
                            <small>
                                <i className="bi bi-info-circle me-1"></i>
                                This report was generated on {new Date().toLocaleDateString()}. 
                                Please contact your faculty for any discrepancies.
                            </small>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
       
                </Col>
            </Row>
        </Container>
        </div>
        </>
    )
}

