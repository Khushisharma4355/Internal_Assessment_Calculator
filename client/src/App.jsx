
import './App.css'
import {Route,Routes} from "react-router-dom"
import { StuHome } from './Screens/Students/StuHome'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StuHome/>}/>
      </Routes>
    </>
  )
}

export default App
