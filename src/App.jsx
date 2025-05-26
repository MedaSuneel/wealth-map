import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import USMap from './components/USMap.jsx';
import Employee from './components/Employee.jsx';
import Profile from './components/Profile.jsx';
import MainLayout from './components/MainLayout.jsx';


function App() {
  
  return (
    <>
      <div>
      
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* MainLayout will wrap these child routes */}
            <Route element={<MainLayout />}>
              <Route path="/usmap" element={<USMap />} />
              <Route path="/employee" element={<Employee />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            
          </Routes>
        </Router>

      </div>
    </>
  )
}

export default App
