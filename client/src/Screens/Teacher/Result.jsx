// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { TeaNav } from "../../Components/Teachers/TeaNav"
export const TeaReports=()=>{
    return(
        <>
<TeaNav/>
        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
        <h3>Teachers students reports!!!</h3>
                </Col>
            </Row>
        </Container>
        </>
    )
}

