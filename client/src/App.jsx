import { Assesments } from './Screens/Students/Assesments'
// import { Reports } from './Screens/Students/Reports'
import './App.css';
// import { Route, Routes, BrowserRouter } from "react-router-dom";

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CourseDetails } from './Screens/Admin/CourseDetails';
// import { Reports } from './Screens/Students/Reports'
// import { Reports } from './Screens/Students/Assesments';
import { Reports } from './Screens/Teacher/Reports'
// import './App.css'
import { Route, Routes } from "react-router-dom"
import { TeaHome } from './Screens/Teacher/TeaHome'
import { StuHome } from './Screens/Students/StuHome'
// import { UploadMarks } from './Screens/Teacher/UploadMarks'
import { UploadMarks } from './Screens/Teacher/UploadMarks'
import { Managestu } from './Screens/Teacher/ManageStudents'
// import { TeaReports } from './Screens/Teacher/Result'
import { Footer } from './Components/Footer/Footer'
import { AdminHome } from './Screens/Admin/AdminHome'
import { MainHome } from './Screens/Main/Main'
import { FeaturesPage } from './Screens/Main/FeaturePage';
import { LoginForm } from './Components/Login/login'
import { StuLogin } from './Screens/Login/stuLogin'
import { TeacherLogin } from './Screens/Login/TeacherLogin'
import { AdminLogin } from './Screens/Login/AdminLogin'
// import { StudentHome } from './Screens/Students/StudentHome'
import { Attendance } from './Screens/Students/Attendance'
import { Course } from './Screens/Admin/Courses';
// import EnterMarks from './Screens/Teacher/Entermarks'
import { TeacherMgmt } from './Screens/Admin/TeacherMgmt'
import { StudentMgmt } from './Screens/Admin/StudentMgmt'
// import { StudentLogout } from './Screens/Logout/StudentLogout'


import { AdminAnnouncements } from './Screens/Admin/Announcements'
import  TeacherAnnouncements  from './Screens/Teacher/Announcement'
import  StudentAnnouncements  from './Screens/Students/Announcement'
import { BulkStudentImport } from './Components/Admin/bulkimportStudent';
import { BulkTeacherImport } from './Components/Admin/bulkimportTeacher';
import NotFoundPage from './Screens/NotFoundPage';
import { SendAllReports } from './Screens/Admin/SendAllReports';
import {Developer} from './Screens/Main/DevelopersPage';


// import { Attendance } from './Screens/Students/Attendance';
// import {TeacherDashboard} from './Components/Teachers/TeacherDashboard'
// import { DevelopersPage } from './Screens/Main/DevelopersPage';
function App() {
  return (
    <>

      <Routes>
         <Route path="/" element={<MainHome />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/developers" element={<Developer />} />
        {/* <Route path="/developers" element={<DevelopersPage />} /> */}
        <Route path="/students/login" element={<StuLogin />} />
        {/* the below route is home route of student and right now working on /students route */}
        <Route path="/students/" element={<StuHome />} />

        <Route path="/students/assesments" element={<Assesments />} />
        <Route path="/students/attendance" element={<Attendance />} />
        {/* <Route path="/students/reports" element={<Reports />} /> */}
        <Route path="/teachers/login" element={<TeacherLogin />} />
        <Route path="/teachers/" element={<TeaHome />} />
        <Route path="/teachers/reports" element={<Reports />} />



        <Route path="/teachers/uploadmarks" element={<UploadMarks />} />
        <Route path="/teachers/managestudents" element={<Managestu />} />
        {/* <Route path="/teachers/reports" element={<TeaReports />} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/teachers" element={<TeacherMgmt/>}/>
        <Route path="/admin/students" element={<StudentMgmt/>}/>

        {/* ANNOUNCEMENT */}
        <Route path="/admin/announcements" element={<AdminAnnouncements/>}/>
        <Route path="/students/announcements" element={<StudentAnnouncements />} />
        <Route path="/teachers/announcements" element={<TeacherAnnouncements />} />

         <Route path="/admin/bulk-import/teachers" element={<BulkTeacherImport />} />
        <Route path="/admin/bulk-import/students" element={<BulkStudentImport />} />
        <Route path="/admin/sendreports" element={<SendAllReports />} />
        
        <Route path="/admin/courses" element={<Course/>}/>
        <Route path="/admin/courses/:courseId" element={<CourseDetails/>}/>
        <Route path="/admin/bulk-import" element={<BulkStudentImport/>}></Route>
        <Route path="*" element ={<NotFoundPage />} />

        {/* LOGOUT */}

        {/* <Route path="/student/logout" element={<StudentLogout />} /> */}
      </Routes>

      <ToastContainer />

      {/* <Footer /> */}
    </>
  )
}

export default App
