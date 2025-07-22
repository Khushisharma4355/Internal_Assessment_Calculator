// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { TeaNav } from "../../Components/Teachers/TeaNav"

export const TeaHome=()=>{
    return(
        <>
<TeaNav/>
        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
        <h3>Welcome Teachers!!!</h3>
                </Col>
            </Row>
        </Container>
        </>
    )
}

