import React from 'react'
import { LoginForm } from '../../Components/Login/login'
import {Container,Row,Col} from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import maimt from '../../assets/maimtphoto.jpg'

export const StuLogin = () => {
  return (
    <div>
        <div className="min-vh-100 bg-light">
              <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center p-0">
                <Row className="w-100 g-0">
                  {/* Left Side Image */}
        
                  <Col lg={6} className="d-none d-lg-block p-0">
                    <img
                      className="img-fluid w-100 h-100"
                      src={maimt}
                      alt="College"
                      style={{ objectFit: 'cover' }}
                    />
                  </Col>
        
                  {/* Right Side Login Form */}
                  <Col
                     xs={12} lg={6} className="d-flex align-items-center justify-content-center min-vh-100 bg-light"
                  >
                    
                    <Card className="p-4 shadow-lg rounded-4 w-100" style={{ maxWidth: '450px' }}>
        
                      {/* Logo and Branding */}
                      <div className="text-center mb-4">
                        <h1 className="text-center mb-3 text-dark fw-bold">Student Login</h1>
                        <img
                          src="http://192.168.1.12/images/maimt_logo.png"
                          width="100"
                          height="100"
                          alt="MAIMT Logo"
                          className="mb-2"
                        />
                        <h2
                          style={{
                            fontFamily: 'cursive',
                            fontWeight: 'bold',
                            fontSize: '2rem',
                            margin: 0
                          }}
                        >
                          <span style={{ color: 'orange' }}>Ur</span>Level
                        </h2>
                      </div>
        
                      {/* Form Title */}
                      {/* <h4 className="text-center mb-3 text-dark fw-bold">Admin Login</h4> */}
        
                      {/* Login Form */}
                      <LoginForm />
                    </Card>
                  </Col>
                </Row>
              </Container>
            </div>
    </div>
  )
}
