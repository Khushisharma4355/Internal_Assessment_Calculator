import { Assesments } from './Screens/Students/Assesments'
import { Reports } from './Screens/Students/Reports'
import './App.css'
import {Route,Routes} from "react-router-dom"
import { StuHome } from './Screens/Students/StuHome'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StuHome/>}/>
        <Route path="/assesments" element={<Assesments/>}/>
        <Route path="/reports" element={<Reports/>}/>

      </Routes>
    </>
  )
}

export default App
