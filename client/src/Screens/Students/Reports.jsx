import { Row, Col, Container, Button } from "react-bootstrap";
import { Stunav } from "../../Components/Students/Stunav";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_STUDENT_ASSESSMENT } from "../../graphql/queries"; // <-- Correct this import path to your frontend graphql folder
import { GeneratePDF } from "../../Components/Pdf/PdfDownload";

export const Reports = ({ registrationNo }) => {
  const [getAssessment, { data, loading, error }] = useLazyQuery(GET_STUDENT_ASSESSMENT);

  useEffect(() => {
    if (registrationNo) {
      getAssessment({ variables: { registrationNo: BigInt(registrationNo) } });
    }
  }, [registrationNo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const handleDownload = () => {
    if (data?.getStudentAssessment?.length) {
      GeneratePDF(data.getStudentAssessment);
    } else {
      alert("No data to generate report.");
    }
  };

  return (
    <>
      <Stunav />
      <Container className="bg-light">
        <Row>
          <Col className="d-flex justify-content-center">
            <div>
              <h2>Assessment Report</h2>
              <Button onClick={handleDownload} className="btn btn-primary">
                Download PDF
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
