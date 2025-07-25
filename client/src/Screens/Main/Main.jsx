import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainNav } from "../../Components/Main/MainNav";
import { motion } from "framer-motion"; // Optional animation library
import { FaUserGraduate, FaChalkboardTeacher, FaUserShield } from "react-icons/fa";
import { LoginForm } from "../../Components/Login/login";


export const MainHome = () => {
  const navigate = useNavigate();

  const data = [
    { id: 1, login: "Students", oper: "/students/login", icon: <FaUserGraduate size={40} /> },
    { id: 2, login: "Teachers", oper: "/teachers/login", icon: <FaChalkboardTeacher size={40} /> },
    { id: 3, login: "Admin", oper: "/admin/login", icon: <FaUserShield size={40} /> }
  ];

  const handleClick = (oper) => {
    navigate(`${oper}`);
  };

  return (
    <>
      {/* <MainNav /> */}
      <Container fluid className="bg-light py-5 min-vh-100">
        <Row className="text-center mb-4">
          <Col>
            <img
              src="http://192.168.1.12/images/maimt_logo.png"
              width="120"
              height="120"
              alt="MAIMT Logo"
              className="mb-3"
            />
            <h1 style={{ fontFamily: "cursive", fontWeight: "bold", fontSize: "3rem", color:" #1d3557"}}>
              <span style={{ color: "orange" }}>Ur</span>Level
            </h1>
          </Col>
        </Row>

        <Row className="justify-content-center gap-4">
          {data.map((item) => (
            <Col key={item.id} xs={10} sm={6} md={4} lg={3} className="d-flex justify-content-center">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card
                  className="text-white text-center p-4 shadow border-0"
                  style={{
                    background: "linear-gradient(135deg, #1d3557 0%, #152a47ff 100%)",
                    cursor: "pointer",
                    borderRadius: "1.2rem",
                    minWidth: "180px"
                  }}
                  onClick={() => handleClick(item.oper)}
                >
                  <Card.Body className="fs-4 fw-semibold">
                                        <div className="mb-2">{item.icon}</div>

                    {item.login}
                    </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
      
    </>
  );
};
