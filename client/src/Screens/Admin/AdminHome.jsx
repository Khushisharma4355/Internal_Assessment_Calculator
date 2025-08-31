import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Button, ListGroup, Alert, Dropdown } from 'react-bootstrap';
import { AdminNav } from '../../Components/Admin/AdminNav';
import { FiBook, FiUsers, FiAlertCircle, FiUserPlus, FiUpload, FiMail, FiCalendar, FiBarChart2, FiMenu, FiX } from 'react-icons/fi';
import { BsPersonCheck } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Modall } from '../../Components/Admin/modal';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { GET_ADMIN_DATA, GET_COURSE_COUNT, GET_STUDENT_COUNT, GET_TEACHER_COUNT } from '../../GraphQL/Queries';
import { RingLoader } from '../../Components/Spinner/RingLoader';

// Register ChartJS components
ChartJS.register(
    ArcElement, Tooltip, Legend, CategoryScale,
    LinearScale, BarElement, PointElement, LineElement
);

export const AdminHome = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 992);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navigate = useNavigate();
    const empid = "T001"; // This should be dynamically set based on logged-in admin

    // State for mobile navigation
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    //for add user modal
    const [modalShow, setModalShow] = useState(false);
    const [activeFormType, setActiveFormType] = useState('teacher'); //for form type 

    const { loading, error, data } = useQuery(GET_ADMIN_DATA, {
        variables: { empid },
    });

    const { data: studentCount, loading: studentsLoading } = useQuery(GET_STUDENT_COUNT)
    const { data: teacherCount, loading: teacherLoading } = useQuery(GET_TEACHER_COUNT)
    const { data: courseCount, loading: courseLoading } = useQuery(GET_COURSE_COUNT)
    const totalStudents = studentCount?.getStudentCount;
    const totalTeachers = teacherCount?.getTeacherCount;
    const totalCourses = courseCount?.getCourseCount;

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
            <RingLoader />
        </div>
    );

    if (error) {
        return (
            <Alert variant="danger" className="mt-4">
                Error loading admin data: {error.message}
            </Alert>
        );
    }

    const adminData = data?.getAdmin;
    const adminName = adminData?.teacher?.emp_name || "Admin";

    // Mock data for charts
    const userDistributionData = {
        labels: ['BCA Students', 'MCA Students', 'BBA Students', 'MBA Students'],
        datasets: [
            {
                data: [20, 10, 15, 12],
                backgroundColor: ['#457b9d', '#a8dadc', '#f1faee', '#1d3557'],
                borderColor: '#fff',
                borderWidth: 1,
            },
        ],
    };

    const passingPercentageData = {
        labels: ['BCA', 'MCA', 'BBA', 'MBA'],
        datasets: [
            {
                label: 'Passing Percentage',
                data: [78, 82.5, 70, 75],
                backgroundColor: ['#457b9d', '#a8dadc', '#f1faee', '#1d3557'],
                borderWidth: 1,
            },
        ],
    };

    const attendanceTrendData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Attendance %',
                data: [85, 82, 90, 87, 88],
                fill: false,
                backgroundColor: '#1d3557',
                borderColor: '#1d3557',
                tension: 0.1
            }
        ]
    };

    return (
        <div>
            {/* Sidebar Navigation */}
            <div
                className="d-none d-lg-block"
                style={{
                    width: "250px",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    height: "100vh",
                    zIndex: 1030,
                }}
            >
                <AdminNav />
            </div>

            {/* Main Content */}
            <div className={`flex-grow-1 p-3 p-md-4 ${isDesktop ? "ms-lg-250" : ""}`}>
                {/* Mobile Nav Toggle */}
                <div className="d-lg-none mb-3">
                    <Button
                        variant="outline-secondary"
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        className="d-flex align-items-center"
                    >
                        {isMobileNavOpen ? <FiX className="me-1" /> : <FiMenu className="me-1" />}
                        Menu
                    </Button>
                </div>

                {/* Mobile Navigation Overlay */}
                {isMobileNavOpen && (
                    <div
                        className="d-lg-none position-fixed top-0 start-0 h-100 w-100"
                        style={{ zIndex: 1040, backgroundColor: "rgba(0,0,0,0.5)" }}
                        onClick={() => setIsMobileNavOpen(false)}
                    >
                        <div
                            className="h-100 bg-white"
                            style={{ width: "75%", maxWidth: "280px" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <AdminNav onSelect={() => setIsMobileNavOpen(false)} />
                        </div>
                    </div>
                )}
                <Container style={{marginLeft:isDesktop?250:0, width:"auto"}}>
                    <Row className='mb-4'>
                        <Col>
                            <h2 style={{ color: '#1d3557' }}>Welcome, <span style={{ color: 'orange' }}>{adminName}</span></h2>
                            <p className="text-muted">Here's what's happening today</p>
                        </Col>
                        <Col md="auto" className="d-flex align-items-center">
                            <FiCalendar className="me-2" />
                            <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </Col>
                    </Row>

                    {/* Stats Cards */}
                    <Row>
                        <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                            <Card className='shadow-sm' onClick={() => { navigate("/admin/teachers") }}>
                                <Card.Body>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h6>Teachers</h6>
                                            <h3>{teacherLoading ? "Loading..." : totalTeachers}</h3>
                                        </div>
                                        <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                                            <FiUsers />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                            <Card className='shadow-sm' onClick={() => { navigate("/admin/students") }}>
                                <Card.Body>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h6>Students</h6>
                                            <h3>{studentsLoading ? "Loading..." : totalStudents}</h3>
                                        </div>
                                        <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                                            <BsPersonCheck />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                            <Card className='shadow-sm'>
                                <Card.Body>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h6>Courses</h6>
                                            <h3>{courseLoading ? "Loading..." : totalCourses}</h3>
                                        </div>
                                        <div style={{ fontSize: "2rem", color: "#1d3557" }}>
                                            <FiBook />
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3} className='mb-3 mb-lg-0'>
                            <Card className='shadow-sm' >
                                <Card.Body>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h6>Pending Actions</h6>
                                            <h3>8</h3>
                                        </div>
                                        <div style={{ fontSize: "2rem", color: "orange" }}>
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
                            <div className="d-flex gap-3 flex-wrap">
                                <Button
                                    style={{ backgroundColor: "#1d3557" }}
                                    onClick={() => {
                                        setModalShow(true);
                                        setActiveFormType("teacher");
                                    }}
                                >
                                    <FiUserPlus className="me-2" />
                                    Add Teacher
                                </Button>

                                {/* Modal for Add Teacher */}
                                <Modall
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    formType={activeFormType}
                                />

                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary">
                                        <FiUpload className="me-2" />
                                        Bulk Import
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => navigate("/admin/bulk-import/teachers")}>
                                            Import Teachers
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => navigate("/admin/bulk-import/students")}>
                                            Import Students
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                                <Button variant="warning" onClick={() => navigate("/admin/send-announcement")}>
                                    <FiMail className="me-2" />
                                    Send Announcement
                                </Button>
                            </div>
                        </Col>
                    </Row>

                    {/* Charts and Recent Activity Section */}
                    <Row className="mt-4">
                        {/* User Distribution Pie Chart */}
                        <Col md={12} lg={4} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <span>Enrolled Students</span>
                                    <FiBarChart2 />
                                </Card.Header>
                                <Card.Body>
                                    <div style={{ height: '250px' }}>
                                        <Pie
                                            data={userDistributionData}
                                            options={{
                                                maintainAspectRatio: false,
                                                plugins: {
                                                    legend: {
                                                        position: 'bottom'
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Attendance Trend Line Chart */}
                        <Col md={12} lg={4} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <span>Weekly Attendance Trend</span>
                                    <FiBarChart2 />
                                </Card.Header>
                                <Card.Body>
                                    <div style={{ height: '250px' }}>
                                        <Line
                                            data={attendanceTrendData}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: false,
                                                        min: 70,
                                                        max: 100
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Today's Stats */}
                        <Col md={12} lg={4} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header>Today's Stats</Card.Header>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Today's Attendance</span>
                                            <div className="text-end">
                                                <strong>87%</strong>
                                                <div className="text-danger">
                                                    <small>Low: 9th-B (72%)</small>
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>New Students</span>
                                            <strong>5</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Classes Today</span>
                                            <strong>12</strong>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            <span>Pending Approvals</span>
                                            <strong>3</strong>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Second Row */}
                    <Row>
                        {/* Course Distribution */}
                        <Col md={12} lg={6} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <span>Passing Percentage by Course</span>
                                    <FiBarChart2 />
                                </Card.Header>
                                <Card.Body>
                                    <div style={{ height: '250px' }}>
                                        <Bar
                                            data={passingPercentageData}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    y: {
                                                        beginAtZero: true,
                                                        max: 100,
                                                        title: {
                                                            display: true,
                                                            text: 'Passing Percentage (%)',
                                                        },
                                                        ticks: {
                                                            callback: value => value + '%'
                                                        }
                                                    },
                                                    x: {
                                                        title: {
                                                            display: true,
                                                            text: 'Courses',
                                                        }
                                                    }
                                                },
                                                plugins: {
                                                    legend: {
                                                        display: true,
                                                        position: 'top',
                                                    },
                                                    tooltip: {
                                                        callbacks: {
                                                            label: (ctx) => `${ctx.parsed.y}% passed`,
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Recent Activity */}
                        <Col md={12} lg={6} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Header>Recent Activity</Card.Header>
                                <Card.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <small className="text-muted">Today, 10:30 AM</small><br />
                                            <strong>Ms. Sharma</strong> submitted Math test marks
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <small className="text-muted">Yesterday, 3:45 PM</small><br />
                                            <strong>Mr. Khan</strong> requested course change
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <small className="text-muted">Yesterday, 11:20 AM</small><br />
                                            <strong>System</strong> 15 new student accounts created
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <small className="text-muted">Monday, 9:15 AM</small><br />
                                            <strong>Admin</strong> updated school policies
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};