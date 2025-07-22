import { Assesments } from './Screens/Students/Assesments'
import { Reports } from './Screens/Students/Reports'
import './App.css'
import {Route,Routes} from "react-router-dom"
import { TeaHome } from './Screens/Teacher/TeaHome'
import { StuHome } from './Screens/Students/StuHome'
import { UploadMarks } from './Screens/Teacher/UploadMarks'
import { Managestu } from './Screens/Teacher/ManageStudents'
import { TeaReports } from './Screens/Teacher/Result'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StuHome/>}/>
        <Route path="/assesments" element={<Assesments/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path="/teachers/" element={<TeaHome/>}/>
        <Route path="/teachers/uploadmarks" element={<UploadMarks/>}/>
        <Route path="/teachers/managestudents" element={<Managestu/>}/>
        <Route path="/teachers/reports" element={<TeaReports/>}/>



      </Routes>
    </>
  )
}

export default App
