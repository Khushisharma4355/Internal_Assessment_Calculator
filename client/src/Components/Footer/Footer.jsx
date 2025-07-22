import { Container, Row, Col } from "react-bootstrap";
import { FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export const Footer = () => {
    return (

        <footer
            style={{ backgroundColor: "#f5f5dc", borderTop: "1px solid #ccc"}}>
            <Container className="py-3" sticky="Bottom" >
                <Row className="justify-content-center mb-2">
                    <Col xs="auto">
                        <a
                            href="https://www.linkedin.com/school/maimtdetail/?original_referer=https%3A%2F%2Fwww.bing.com%2F"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none mx-2 text-primary"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://www.instagram.com/maimt_official/"
                           
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none mx-2"
                            style={{ color: "#C13584" }}
                        >
                            <FaInstagram size={24} />
                        </a>
                        <a
                             href="https://www.facebook.com/maimtdetail/"   
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none mx-2 text-primary"
                        >
                            <FaFacebook size={24} />
                        </a>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="auto">
                        <small className="text-muted">MAIMT Digital Library 2025.</small>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
