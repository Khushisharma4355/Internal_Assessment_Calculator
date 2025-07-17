
import './App.css'
import {Route,Routes} from "react-router-dom"
import {Navv} from "./Components/NavBar/Navbar"
import { StuHome } from './Screens/Students/StuHome'
function App() {

  return (
    <>
    <Navv/>
      <Routes>
        <Route path="/" element={<StuHome/>}/>
      </Routes>
    </>
  )
}

export default App
