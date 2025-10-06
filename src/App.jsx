import { useState } from 'react'

import './App.css'
import Nav from './Componenets/Nav.jsx'
import { Routes, Route,Navigate } from "react-router-dom";
import Footer from "./Componenets/Footer.jsx";
// import Home from './Componenets/HomeComponent/Home.jsx';
 import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
function App() {


  return (
    <div className="pt-12">
      <Nav />
      <Routes>
        <Route path="/" element={<Navigate to="/courses" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/course/:id' element={<CourseDetail/>}/>
      </Routes>
      <Footer />
    </div>
  );

  
}

export default App
