// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import {Stunav} from "../../Components/Students/Stunav"
export const StuHome=()=>{
    return(
        <>
<Stunav/>
        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
        <h3>Welcome Students!!!</h3>
                </Col>
            </Row>
        </Container>
        </>
    )
}

