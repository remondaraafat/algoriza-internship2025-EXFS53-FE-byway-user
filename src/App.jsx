import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './Componenets/Nav.jsx'
import { Routes, Route } from "react-router-dom";
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
        <Route path="/" element={<Courses />} />
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
