// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { TeaNav } from "../../Components/Teachers/TeaNav"
import { TeacherDashboard } from "../../Components/Teachers/TeacherDashboard"

export const TeaHome=()=>{
    return(
        <>
<TeaNav/>
        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
       <TeacherDashboard/>
                </Col>
            </Row>
        </Container>
        </>
    )
}

