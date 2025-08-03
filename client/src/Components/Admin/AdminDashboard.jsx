import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { AdminNav } from '../../Components/Admin/AdminNav';
import director from '../../assets/director.jpeg';

export const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', flexShrink: 0 }}>
        <AdminNav />
      </div>
      
      {/* Main Content */}
      <Container fluid style={{ backgroundColor: '#f8f9fa', padding: '1rem' }}>
        {/* Profile Card - Split Layout */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm" style={{ border: 'none' }}>
              {/* <Card.Header className="text-center py-3" style={{ 
                backgroundColor: '#1d3557',
                color: 'white',
                borderBottom: '3px solid orange'
              }}>
                <h4 className="mb-0">Admin Profile</h4>
              </Card.Header> */}
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  {/* Left Column - Information */}
                  <Col md={7}>
                    <div className="mb-4">
                      <h3 style={{ color: '#1d3557' }}>
                        <strong>Dr. Narender Rana</strong>
                      </h3>
                      <p className="text-muted mb-2">
                        <i className="bi bi-envelope-fill me-2"></i>
                        director@maimt.com
                      </p>
                      <p className="text-muted mb-4">
                        <i className="bi bi-person-badge-fill me-2"></i>
                        Administrator
                      </p>
                    </div>
                    
                    <div className="d-flex gap-3">
                      <button 
                        className="btn px-4" 
                        style={{ 
                          backgroundColor: '#1d3557', 
                          color: 'white',
                          borderRadius: '20px'
                        }}
                      >
                        <i className="bi bi-pencil-fill me-2"></i>Edit Profile
                      </button>
                      <button 
                        className="btn btn-outline-secondary px-4"
                        style={{ borderRadius: '20px' }}
                      >
                        <i className="bi bi-gear-fill me-2"></i>Settings
                      </button>
                    </div>
                  </Col>
                  
                  {/* Right Column - Photo */}
                  <Col md={5} className="text-center">
                    <div
                      className="shadow-lg mx-auto "
                      style={{
                        width: '150px',
                        height: '150px',
                        overflow: 'hidden',
                        
                        // border: '4px solid #1d3557',
                      }}
                    >
                      <img
                        src={director}
                        alt="Profile"
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Space for future analytics/content */}
        <Row>
          <Col>
            {/* Additional content can be added here */}
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