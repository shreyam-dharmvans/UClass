import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Login } from './pages/Login'
import { PrincipalPage } from './pages/PrincipalPage'
import { StudentPage } from './pages/StudentPage'
import { TeacherPage } from './pages/TeacherPage'
import { StudentSignup } from './pages/StudentSignup'
import { TeacherEdit } from './pages/TeacherEdit'
import { StudentEdit } from './pages/StudentEdit'
import { TeacherSignup } from './pages/TeacherSignup'
import { Header } from './components/Header'
import { ClassroomCreate } from './pages/ClassroomCreate'
import { useState } from 'react'

function App() {

  const [currentUser, setCurrentUser] = useState('');

  return (
    <div>
      <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Routes>
        <Route path='/' element={<Login currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        <Route path='/principal' element={<PrincipalPage />} />
        <Route path='/student' element={<StudentPage />} />
        <Route path='/teacher' element={<TeacherPage />} />
        <Route path='/teacher-signup' element={<TeacherSignup />} />
        <Route path='/teacher-edit' element={<TeacherEdit />} />
        <Route path='/student-signup' element={<StudentSignup />} />
        <Route path='/student-edit' element={<StudentEdit />} />
        <Route path='/new-classroom' element={<ClassroomCreate />} />
      </Routes>
    </div>
  )
}

export default App
