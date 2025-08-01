// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row, Col, Container, Card } from "react-bootstrap"
import { Stunav } from "../../Components/Students/Stunav"
import { Footer } from "../../Components/Footer/Footer"
import "./assessment.css"
import { ViewAssessment } from "../../Components/Students/ViewAssessment"
export const Assesments = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
   <Container fluid className="bg-light py-4">
  <Row>
    <Col xs={12} md={3}>
      <Stunav />
    </Col>
    <Col xs={12} md={9} className="d-flex justify-content-center">
      <Card className="centered-view">
        <ViewAssessment />
      </Card>
    </Col>
  </Row>
</Container>

      {/* Footer */}
      <footer className="footer mt-auto">
        <Footer />
      </footer>
    </div>
  );
};


