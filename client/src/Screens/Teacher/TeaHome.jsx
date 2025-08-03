// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { TeaNav } from "../../Components/Teachers/TeaNav"
// import { TeacherDashboard } from "../../Components/Teachers/TeacherDashboard"
import { TeacherDashboard } from "../../Components/Teachers/TeacherDashboard.jsx"

export const TeaHome=()=>{
    return(
        <>
        <div className="d-flex">
            <div style={{flexShrink:0, width:"250px"}}>
           <TeaNav/>
            </div>

        <Container className="bg-light">
            <Row >
          <Col className="d-flex  justify-content-center">
       <TeacherDashboard/>
                </Col>
            </Row>
        </Container>
        </div>
        </>
    )
}

