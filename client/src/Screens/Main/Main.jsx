import { Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MainNav } from "../../Components/Main/MainNav";
export const MainHome = () => {
  const navigate = useNavigate();

  const data = [
    { id: 1, login: "Students", oper: "students" },
    { id: 2, login: "Teachers", oper: "teachers" },
    { id: 3, login: "Admin", oper: "admin" }
  ];

  const handleClick = (oper) => {
    if (oper === "students") {
      navigate("/students/");
    } else if (oper === "teachers") {
      navigate("/teachers/");
    } else if (oper === "admin") {
      navigate("/admin/");
    }
  };

  return (
    <>
      <MainNav />
      <Container className="bg-light py-5">
       <Row
              className="text-center p-5 m-5 fs-5 fw-bold "
        >
            <Col>
            <h1>UrLevel Login!!!</h1></Col>
        </Row>
        <Row 
        className="justify-content-center"
        >
          {data.map((item) => (
            <Col key={item.id} md={4} className="mb-4 d-flex justify-content-center" >
              <Card
              className="text-center p-5 m-5 fs-5 fw-bold shadow-lg border-0"
                style={{ width: "12rem", cursor: "pointer",backgroundColor:"#FFB433" }}
                onClick={() => handleClick(item.oper)}
              >
                {item.login}
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
