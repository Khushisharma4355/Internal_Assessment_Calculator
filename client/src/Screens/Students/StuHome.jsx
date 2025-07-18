import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
export const StuHome=()=>{
    return(
        <>
        <Container fluid>
            <Row >
          <Col md={2} className="bg-warning vh-100 p-3">
                <Navv/></Col>
          <Col className="d-flex  justify-content-center">
        <h3>Welcome Students!!!</h3>
                </Col>
            </Row>
        </Container>
        </>
    )
}

// vh-100 on the sidebar keeps it full-height.

// p-3 adds padding to the sidebar.

// d-flex align-items-center justify-content-center centers the message in the main content area.