import React from 'react';
import { Container, Card, Row, Col, Button, ListGroup } from 'react-bootstrap';
import { AdminNav } from '../../Components/Admin/AdminNav';
import { FiBook, FiUsers, FiAlertCircle, FiUserPlus, FiUpload, FiMail,FiClipboard } from 'react-icons/fi';
import { BsPersonCheck } from "react-icons/bs";

export const AdminDashboard = () => {
  const adminName="Dr Narinder Rana"
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', flexShrink: 0}}>
        <AdminNav />
      </div>
      
      {/* Main Content */}
      <Container fluid style={{padding:'2rem'}}>
        <Row className='mb-4'>
          <Col>
           <h2 style={{color:'#1d3557'}}>Welcome, <span style={{color: 'orange'}}>{adminName}</span></h2>
            <p className="text-muted">Here's what's happening today</p>
          </Col>
        </Row>
        
        {/* Stats Cards */}
        <Row>
          <Col md={6} lg={3}>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Teachers</h6>
                    <h3>40</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <FiUsers />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Students</h6>
                    <h3>400</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <BsPersonCheck />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Courses</h6>
                    <h3>5</h3>
                  </div>
                  <div style={{fontSize:"2rem", color:"#1d3557"}}>
                    <FiBook/>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={3}>
            <Card className='shadow-sm'>
              <Card.Body>
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6>Pending Actions</h6>
                    <h3>8</h3>
                    {/* <small className="text-muted">5 marks to approve</small><br/>
                    <small className="text-muted">3 messages to review</small> */}
                  </div>
                  <div style={{fontSize:"2rem", color:"orange"}}>
                    <FiAlertCircle />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Quick Actions */}
        <Row className="mt-4">
          <Col>
            <div className="d-flex gap-5">
              <Button style={{backgroundColor:"#1d3557"}}>
                <FiUserPlus className="me-2" />
                Add Student
              </Button>
              <Button variant="outline-secondary">
                <FiUpload className="me-2" />
                Bulk Import
              </Button>
              <Button variant="warning">
                <FiMail className="me-2" />
                Send Announcement
              </Button>
            </div>
          </Col>
        </Row>
        
        {/* Recent Activity */}
        <Row className="mt-4">
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header>Recent Activity</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <small className="text-muted">Today, 10:30 AM</small><br/>
                    <strong>Ms. Sharma</strong> submitted Math test marks
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 3:45 PM</small><br/>
                    <strong>Mr. Khan</strong> requested course change
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small className="text-muted">Yesterday, 11:20 AM</small><br/>
                    <strong>System</strong> 15 new student accounts created
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
  <Card className='shadow-sm'>
    <Card.Body>
      <div className='d-flex justify-content-between align-items-center'>
        <div>
          <h6>Today's Attendance</h6>
          <h3>87%</h3>
          <small className="text-danger">Low: 9th-B (72%)</small>
        </div>
        <div style={{fontSize:"2rem", color:"#1d3557"}}>
          <FiClipboard />
        </div>
      </div>
    </Card.Body>
  </Card>
</Col>
        </Row>
      </Container>
    </div>
  );
};
// import React from 'react';
// import { Container, Row, Col, Card, ProgressBar, Table } from 'react-bootstrap';
// import { AdminNav } from '../../Components/Admin/AdminNav';
// import { FiUsers, FiBook, FiDollarSign, FiCalendar, FiBarChart2, FiMail } from 'react-icons/fi';
// import { BsPersonCheck, BsExclamationTriangle } from 'react-icons/bs';

// export const AdminDashboard = () => {
//   // Sample data - in a real app, this would come from API calls
//   const stats = {
//     totalTeachers: 42,
//     totalStudents: 856,
//     activeCourses: 18,
//     pendingRequests: 5,
//     attendanceRate: 87,
//     revenue: 1250000
//   };

//   const recentActivities = [
//     { id: 1, teacher: 'Dr. Sharma', action: 'added new course', time: '2 hours ago' },
//     { id: 2, student: 'Rahul Verma', action: 'submitted assignment', time: '4 hours ago' },
//     { id: 3, system: 'System', action: 'scheduled maintenance', time: '1 day ago' },
//     { id: 4, teacher: 'Prof. Gupta', action: 'updated syllabus', time: '1 day ago' },
//     { id: 5, student: 'Priya Singh', action: 'requested course change', time: '2 days ago' }
//   ];

//   const upcomingEvents = [
//     { id: 1, title: 'Faculty Meeting', date: 'Tomorrow, 10:00 AM', location: 'Conference Room' },
//     { id: 2, title: 'Parent-Teacher Conference', date: 'March 15, 2:00 PM', location: 'Main Hall' },
//     { id: 3, title: 'Semester Exams Begin', date: 'April 1', location: 'All Classrooms' }
//   ];

//   return (
//     <div style={{ display: 'flex', minHeight: '100vh' }}>
//       {/* Sidebar */}
//       <div style={{ width: '250px', flexShrink: 0 }}>
//         <AdminNav />
//       </div>
      
//       {/* Main Content */}
//       <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '2rem' }}>
//         {/* Welcome Header */}
//         <Row className="mb-4">
//           <Col>
//             <h3 style={{ color: '#1d3557' }}>Welcome, Director</h3>
//             <p className="text-muted">Here's what's happening with your institute today</p>
//           </Col>
//         </Row>

//         {/* Stats Cards */}
//         <Row className="mb-4">
//           <Col md={6} lg={3} className="mb-3">
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Teachers</h6>
//                     <h3>{stats.totalTeachers}</h3>
//                   </div>
//                   <div style={{ fontSize: '2rem', color: '#1d3557' }}>
//                     <FiUsers />
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6} lg={3} className="mb-3">
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Students</h6>
//                     <h3>{stats.totalStudents}</h3>
//                   </div>
//                   <div style={{ fontSize: '2rem', color: '#1d3557' }}>
//                     <BsPersonCheck />
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6} lg={3} className="mb-3">
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Active Courses</h6>
//                     <h3>{stats.activeCourses}</h3>
//                   </div>
//                   <div style={{ fontSize: '2rem', color: '#1d3557' }}>
//                     <FiBook />
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col md={6} lg={3} className="mb-3">
//             <Card className="h-100 shadow-sm">
//               <Card.Body>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <div>
//                     <h6 className="text-muted mb-2">Pending Requests</h6>
//                     <h3 className="text-warning">{stats.pendingRequests}</h3>
//                   </div>
//                   <div style={{ fontSize: '2rem', color: '#ffc107' }}>
//                     <BsExclamationTriangle />
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>

//         {/* Main Content Area */}
//         <Row>
//           {/* Left Column */}
//           <Col lg={8} className="mb-4">
//             {/* Attendance and Revenue */}
//             <Row className="mb-4">
//               <Col md={6} className="mb-3">
//                 <Card className="h-100 shadow-sm">
//                   <Card.Body>
//                     <h6 className="text-muted mb-3">Attendance Rate</h6>
//                     <ProgressBar 
//                       now={stats.attendanceRate} 
//                       label={`${stats.attendanceRate}%`} 
//                       variant="success"
//                       style={{ height: '25px' }}
//                     />
//                     <div className="mt-2 d-flex justify-content-between">
//                       <small className="text-muted">This Month</small>
//                       <small className="text-muted">+2% from last month</small>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//               <Col md={6} className="mb-3">
//                 <Card className="h-100 shadow-sm">
//                   <Card.Body>
//                     <h6 className="text-muted mb-3">Revenue</h6>
//                     <h3 className="text-success">
//                       ₹{(stats.revenue / 100000).toFixed(2)} Lakhs
//                     </h3>
//                     <div className="d-flex align-items-center mt-2">
//                       <FiBarChart2 className="me-2 text-success" />
//                       <small className="text-muted">12% increase from last quarter</small>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </Row>

//             {/* Recent Activities */}
//             <Card className="shadow-sm mb-4">
//               <Card.Header style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
//                 <h6 className="mb-0">Recent Activities</h6>
//               </Card.Header>
//               <Card.Body style={{ padding: '0' }}>
//                 <Table hover className="mb-0">
//                   <tbody>
//                     {recentActivities.map(activity => (
//                       <tr key={activity.id}>
//                         <td style={{ width: '40px', padding: '12px' }}>
//                           <div style={{
//                             width: '32px',
//                             height: '32px',
//                             borderRadius: '50%',
//                             backgroundColor: '#f0f0f0',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                           }}>
//                             <FiMail />
//                           </div>
//                         </td>
//                         <td style={{ padding: '12px' }}>
//                           <div>
//                             <strong>{activity.teacher || activity.student || activity.system}</strong> {activity.action}
//                           </div>
//                           <small className="text-muted">{activity.time}</small>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Right Column */}
//           <Col lg={4}>
//             {/* Upcoming Events */}
//             <Card className="shadow-sm mb-4">
//               <Card.Header style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
//                 <h6 className="mb-0">Upcoming Events</h6>
//               </Card.Header>
//               <Card.Body>
//                 {upcomingEvents.map(event => (
//                   <div key={event.id} className="mb-3 pb-3 border-bottom">
//                     <div className="d-flex">
//                       <div style={{
//                         width: '40px',
//                         height: '40px',
//                         borderRadius: '4px',
//                         backgroundColor: '#1d3557',
//                         color: 'white',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         marginRight: '12px'
//                       }}>
//                         <FiCalendar />
//                       </div>
//                       <div>
//                         <h6 className="mb-1">{event.title}</h6>
//                         <small className="text-muted d-block">{event.date}</small>
//                         <small className="text-muted">{event.location}</small>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button className="btn btn-sm btn-link ps-0">View All Events</button>
//               </Card.Body>
//             </Card>

//             {/* Quick Actions */}
//             <Card className="shadow-sm">
//               <Card.Header style={{ backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,.125)' }}>
//                 <h6 className="mb-0">Quick Actions</h6>
//               </Card.Header>
//               <Card.Body>
//                 <button className="btn btn-outline-primary w-100 mb-2">
//                   Add New Teacher
//                 </button>
//                 <button className="btn btn-outline-secondary w-100 mb-2">
//                   Create New Course
//                 </button>
//                 <button className="btn btn-outline-success w-100 mb-2">
//                   Generate Reports
//                 </button>
//                 <button className="btn btn-outline-info w-100">
//                   Send Announcement
//                 </button>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };