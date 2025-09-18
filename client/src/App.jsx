import './App.css';
import { Route, Routes } from "react-router-dom";

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ========== MAIN ==========
import { MainHome } from './Screens/Main/Main';
import { FeaturesPage } from './Screens/Main/FeaturePage';

// ========== AUTH ==========
import { StuLogin } from './Screens/Login/stuLogin';
import { TeacherLogin } from './Screens/Login/TeacherLogin';
import { AdminLogin } from './Screens/Login/AdminLogin';
import { LoginForm } from './Components/Login/login';

// ========== STUDENTS ==========
import { StuHome } from './Screens/Students/StuHome';
import { Assesments } from './Screens/Students/Assesments';
import { Attendance } from './Screens/Students/Attendance';
import StudentAnnouncements from './Screens/Students/Announcement';

// ========== TEACHERS ==========
import { TeaHome } from './Screens/Teacher/TeaHome';
import { Reports } from './Screens/Teacher/Reports';
import { UploadMarks } from './Screens/Teacher/UploadMarks';
import { Managestu } from './Screens/Teacher/ManageStudents';
import TeacherAnnouncements from './Screens/Teacher/Announcement';
import { TeacherActivities } from './Screens/Teacher/TeacherActivities';
// ========== ADMIN ==========
import { AdminHome } from './Screens/Admin/AdminHome';
import { TeacherMgmt } from './Screens/Admin/TeacherMgmt';
import { StudentMgmt } from './Screens/Admin/StudentMgmt';
import { AdminAnnouncements } from './Screens/Admin/Announcements';
import { BulkStudentImport } from './Components/Admin/bulkimportStudent';
import { BulkTeacherImport } from './Components/Admin/bulkimportTeacher';
import { SendAllReports } from './Screens/Admin/SendAllReports';
import { Course } from './Screens/Admin/Courses';
import { CourseDetails } from './Screens/Admin/CourseDetails';
import AdminActivities from './Screens/Admin/AdminActivities';

// ========== COMMON ==========
import NotFoundPage from './Screens/NotFoundPage';
import { Footer } from './Components/Footer/Footer';

function App() {
  return (
    <>
      <Routes>
        {/* Main */}
        <Route path="/" element={<MainHome />} />
        <Route path="/features" element={<FeaturesPage />} />

        {/* Student Routes */}
        <Route path="/students/login" element={<StuLogin />} />
        <Route path="/students/" element={<StuHome />} />
        <Route path="/students/assesments" element={<Assesments />} />
        <Route path="/students/attendance" element={<Attendance />} />
        <Route path="/students/announcements" element={<StudentAnnouncements />} />

        {/* Teacher Routes */}
        <Route path="/teachers/login" element={<TeacherLogin />} />
        <Route path="/teachers/" element={<TeaHome />} />
        <Route path="/teachers/reports" element={<Reports />} />
        <Route path="/teachers/uploadmarks" element={<UploadMarks />} />
        <Route path="/teachers/managestudents" element={<Managestu />} />
        <Route path="/teachers/announcements" element={<TeacherAnnouncements />} />
        <Route path="/teacher/activities" element={<TeacherActivities />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/" element={<AdminHome />} />
        <Route path="/admin/teachers" element={<TeacherMgmt />} />
        <Route path="/admin/students" element={<StudentMgmt />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/bulk-import/teachers" element={<BulkTeacherImport />} />
        <Route path="/admin/bulk-import/students" element={<BulkStudentImport />} />
        <Route path="/admin/sendreports" element={<SendAllReports />} />
        <Route path="/admin/courses" element={<Course />} />
        <Route path="/admin/courses/:courseId" element={<CourseDetails />} />
        <Route path="/admin/bulk-import" element={<BulkStudentImport />} />
        <Route path="/admin/activities" element={<AdminActivities />} />
        {/* Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer />

      {/* <Footer /> */}
    </>
  );
}

export default App;
