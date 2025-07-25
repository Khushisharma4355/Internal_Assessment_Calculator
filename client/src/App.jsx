import { Assesments } from './Screens/Students/Assesments'
import { Reports } from './Screens/Students/Reports'
import './App.css'
import { Route, Routes } from "react-router-dom"
import { TeaHome } from './Screens/Teacher/TeaHome'
import { StuHome } from './Screens/Students/StuHome'
import { UploadMarks } from './Screens/Teacher/UploadMarks'
import { Managestu } from './Screens/Teacher/ManageStudents'
import { TeaReports } from './Screens/Teacher/Result'
import { Footer } from './Components/Footer/Footer'
import { AdminHome } from './Screens/Admin/AdminHome'
import { MainHome } from './Screens/Main/Main'
import { LoginForm } from './Components/Login/login'
import { StuLogin } from './Screens/Login/stuLogin'
import { TeacherLogin } from './Screens/Login/TeacherLogin'
import { AdminLogin } from './Screens/Login/AdminLogin'
import { DemoStudentHome } from './Screens/Students/demoStudentHome'
function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<MainHome />} />

        <Route path="/students/login" element={<StuLogin />} />
        {/* <Route path="/students/" element={<StuHome/>}/> */}
        {/* the below route is home route of student and right now working on /students route */}
        <Route path="/students/" element={<DemoStudentHome />} />

        <Route path="/students/assesments" element={<Assesments />} />
        <Route path="/students/reports" element={<Reports />} />


        <Route path="/teachers/login" element={<TeacherLogin />} />
        <Route path="/teachers/" element={<TeaHome />} />


        <Route path="/teachers/uploadmarks" element={<UploadMarks />} />
        <Route path="/teachers/managestudents" element={<Managestu />} />
        <Route path="/teachers/reports" element={<TeaReports />} />
      

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/" element={<AdminHome />} />


        <Route path="*" element={<h1>404 Not Found</h1>} />


      </Routes>
      <Footer />
    </>
  )
}

export default App
