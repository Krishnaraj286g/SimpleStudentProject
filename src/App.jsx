import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import StudentForm from './components/StudentForm'
import ViewPage from './components/ViewPage'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/Student_Details' element={<StudentForm/>}/>
      <Route path='/view/:id' element={<ViewPage/>}/>
      <Route path="*" element={<h2>Page Not Found</h2>} />
    </Routes>
     

    </>
  )
}

export default App
