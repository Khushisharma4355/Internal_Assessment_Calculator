import React from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import { AdminNav } from '../../Components/Admin/AdminNav'
import {Card} from 'react-bootstrap'
// import dummy from '../../assets/dummy.jpg'
// import { Footer } from '../../Components/Footer/Footer' 
import director from '../../assets/director.jpeg'
export const AdminDashboard = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md={2} className="bg-white text-white min-vh-100 sidebar">
            {/* Sidebar Nav here */}
            <AdminNav/>
          </Col>
          <Col md={10} className="p-4">
            {/* Topbar (optional) */}
            {/* Main Admin Content: Stats cards, charts, tables */}


            <Card className='ms-0'>
            <Card.Header className="text-center text-white" style={{ backgroundColor: '#1d3557' }}>
              <h4>Your Profile</h4>
            </Card.Header>
            <Card.Body className="text-center">
              <div
                className="rounded-circle mx-auto mb-3"
                style={{
                  width: '200px',
                  overflow: 'hidden',
                  border: '3px solid #1d3557',
                }}
              >
                <img 
                  src={director}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <h5><strong>Name: </strong>Dr. Narender Rana</h5>
              <p><strong>Email Id: </strong>director@maimt.com</p>
              {/* <p><strong>Class Roll No:</strong>23</p> */}
              {/* <p><strong>University Roll No:</strong>MAIMT23CS123</p> */}
            </Card.Body>
          </Card>
          {/* <div className="mt-5 px-0 sticky-bottom">
              <Footer />
            </div> */}
          </Col>
        </Row>
      </Container>

    </div>
  )
}
