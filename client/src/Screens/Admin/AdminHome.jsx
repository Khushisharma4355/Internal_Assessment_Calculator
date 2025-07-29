// import {Navv} from "../../Components/Students/NavBar/Navbar"
import { Row,Col,Container } from "react-bootstrap"
import { AdminNav } from "../../Components/Admin/AdminNav"
import { AdminDashboard } from "../../Components/Admin/AdminDashboard"
export const AdminHome=()=>{
    return(
        <>


<AdminDashboard/>


        {/* <Container className="bg-light">
        <Row >
        <Col className="d-flex  justify-content-center">
        <h3>Welcome Admin!!!</h3>
                </Col>
        </Row>
        </Container> */}
        </>
    )
}

