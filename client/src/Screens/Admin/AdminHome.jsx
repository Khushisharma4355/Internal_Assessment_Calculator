// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { AdminNav } from "../../Components/Admin/AdminNav"
export const AdminHome=()=>{
    return(
        <>
<AdminNav/>
        <Container className="bg-light">
        <Row >
        <Col className="d-flex  justify-content-center">
        <h3>Welcome Admin!!!</h3>
                </Col>
        </Row>
        </Container>
        </>
    )
}

