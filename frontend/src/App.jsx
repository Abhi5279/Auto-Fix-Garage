import React from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Form from './components/Form'
import Status from './pages/Status'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyProfile from './pages/MyProfile'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoutes';
import UpdateStatus from './admin-pages/UpdateStatus'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='bg-gradient-to-r from-gray-900 to-gray-700  '>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />

        <Route
          path='/form'
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>} />


        <Route
          path='/status'
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>} />

        <Route path='/about' element={<About />} />

        <Route path='/contact-us' element={<Contact />} />

        <Route path='/login' element={<Login />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/myprofile' element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>} />

        <Route
          path="/updateStatus"
          element={
            <AdminRoute>
              <UpdateStatus />
            </AdminRoute>} />

      </Routes>

      <Footer />
    </div>
  )
}

export default App
