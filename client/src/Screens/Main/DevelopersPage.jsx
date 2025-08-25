// import React from "react";
// import { Container, Row, Col, Card } from "react-bootstrap";
// import { motion } from "framer-motion";
// import { FaGithub, FaLinkedin } from "react-icons/fa";
// import sarita from "../../assets/244071_Sarita.jpg";
// import khushi from "../../assets/244033_Khushi Sharma.jpg";
// import pallavi from "../../assets/244054_Pallavi.jpg";

// // Example data for developers (you can add your team’s real info)
// const developers = [
//   {
//     name: "Sarita Rana",
//     role: "Full Stack Developer",
//     img: sarita,
//     github: "https://github.com/saritaranayng",
//     linkedin: "https://linkedin.com",
//   },
//   {
//     name: "Khushi Sharma",
//     role: "Full Stack Developer",
//     img: khushi,
//     github: "https://github.com",
//     linkedin: "https://linkedin.com",
//   },
//   {
//     name: "Pallavi Goswami",
//     role: "Full Stack Developer",
//     img: pallavi,
//     github: "https://github.com",
//     linkedin: "https://linkedin.com",
//   },
// ];

// const Developer = () => {
//   return (
//     <section style={{ background: "#f9fafc", padding: "60px 0" }}>
//       <Container>
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-5"
//         >
//           <h2 className="fw-bold display-5" style={{color:"#1d3557"}}>Meet the Developers</h2>
//           <p className="text-muted fs-5" style={{color:"#1d3557"}}>
//             The passionate team behind the Internal Assessment Calculator
//           </p>
//         </motion.div>

//         {/* Developer Cards */}
//         <Row className="g-4">
//           {developers.map((dev, index) => (
//             <Col md={4} key={index}>
//               <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-3 hover-card">
//                   <Card.Img
//                     variant="top"
//                     src={dev.img}
//                     alt={dev.name}
//                     className="rounded-circle mx-auto"
//                     style={{ width: "140px", height: "140px", objectFit: "cover", marginTop: "10px" }}
//                   />
//                   <Card.Body>
//                     <Card.Title style={{color:"#1d3557"}} className="fw-bold fs-4">{dev.name}</Card.Title>
//                     <Card.Subtitle className="mb-3 fw-semibold" style={{color:"#1d3557"}}>
//                       {dev.role}
//                     </Card.Subtitle>
//                     <div className="d-flex justify-content-center gap-3">
//                       <a href={dev.github} target="_blank" rel="noreferrer">
//                         <FaGithub size={28} className="text-dark hover-icon" />
//                       </a>
//                       <a href={dev.linkedin} target="_blank" rel="noreferrer">
//                         <FaLinkedin size={28} className="text-primary hover-icon" />
//                       </a>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </motion.div>
//             </Col>
//           ))}
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Developer;
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import sarita from "../../assets/244071_Sarita.jpg";
import khushi from "../../assets/244033_Khushi Sharma.jpg";
import pallavi from "../../assets/244054_Pallavi.jpg";
import { Footer } from "../../Components/Footer/Footer";

// Developer Data with Responsibilities
const developers = [
  {
    name: "Sarita Rana",
    role: "Authentication & Frontend Specialist",
    img: sarita,
    github: "https://github.com/saritaranayng",
    linkedin: "https://linkedin.com",
    responsibilities: [
      "Implemented secure user authentication system.",
      "Designed and developed static as well as dynamic frontend pages.",
      "Created announcement pages for teachers and students.",
      "Ensured smooth navigation and responsive UI across devices.",
    ],
  },
  {
    name: "Khushi Sharma",
    role: "Database & Backend Setup",
    img: khushi,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    responsibilities: [
      "Set up and configured MongoDB database with collections.",
      "Designed efficient schemas to store and retrieve assessment data.",
      "Integrated backend APIs for student and teacher data.",
      "Ensured proper database connectivity and security measures.",
    ],
  },
  {
    name: "Pallavi Goswami",
    role: "Teachers Portal & Integration",
    img: pallavi,
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    responsibilities: [
      "Developed a dedicated teacher’s portal for managing assessments.",
      "Linked frontend pages with backend APIs for real-time data exchange.",
      "Worked on CRUD operations for teacher-student interactions.",
      "Ensured smooth integration between frontend UI and backend logic.",
    ],
  },
];

export const Developer = () => {
  return (
   <div>
     <section style={{ background: "#f9fafc", padding: "60px 0" }}>
      <Container>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="fw-bold display-5" style={{ color: "#1d3557" }}>
            Meet the Developers
          </h2>
          <p className="fs-5" style={{ color: "#1d3557" }}>
            The passionate team behind the Internal Assessment Calculator
          </p>
        </motion.div>

        {/* Developer Cards */}
        <Row className="g-4">
          {developers.map((dev, index) => (
            <Col md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="h-100 shadow-lg border-0 rounded-4 text-center p-4 hover-card">
                  <Card.Img
                    variant="top"
                    src={dev.img}
                    alt={dev.name}
                    className="rounded-circle mx-auto"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                      marginTop: "10px",
                    }}
                  />
                  <Card.Body>
                    <Card.Title
                      style={{ color: "#1d3557" }}
                      className="fw-bold fs-4"
                    >
                      {dev.name}
                    </Card.Title>
                    <Card.Subtitle
                      className="mb-3 fw-semibold"
                      style={{ color: "#1d3557" }}
                    >
                      {dev.role}
                    </Card.Subtitle>

                    {/* Responsibilities */}
                    <ul className="text-start small text-muted px-3">
                      {dev.responsibilities.map((task, i) => (
                        <li key={i}>{task}</li>
                      ))}
                    </ul>

                    {/* Social Links */}
                    <div className="d-flex justify-content-center gap-3 mt-3">
                      <a href={dev.github} target="_blank" rel="noreferrer">
                        <FaGithub size={28} className="text-dark hover-icon" />
                      </a>
                      <a href={dev.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin
                          size={28}
                          className="text-primary hover-icon"
                        />
                      </a>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        
      </Container>
      
    </section>
    <Footer />
  </div>
);
}
