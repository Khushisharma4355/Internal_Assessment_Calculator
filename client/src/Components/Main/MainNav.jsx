import { Navbar, Nav, Container, NavDropdown,Dropdown } from "react-bootstrap"
import "./navbar.css"
import { Link } from "react-router-dom"
export const MainNav = () => {
    return (
        <>
            <Navbar
                variant="dark"
                sticky="top" expand="lg" style={{
                    backgroundColor: "#1d3557"
                }} className="m-0 p-3" sticky-top>
                <Container fluid className="m-0 p-0 justify-content-start">

                    <Navbar.Brand as={Link} to="/">
                        <img
                            src="http://192.168.1.12/images/maimt_logo.png"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="Maimt"
                        />
                        <span style={{ fontWeight: 'bold', fontSize: '1.6rem', color: 'white' }}><span style={{color:"orange"}}>Ur</span>Level</span>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}