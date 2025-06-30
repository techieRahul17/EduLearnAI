"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import StudentDashboard from "./pages/student/StudentDashboard"
import TeacherDashboard from "./pages/teacher/TeacherDashboard"
import TeacherProfile from "./pages/teacher/TeacherProfile"
import ProfilePage from "./pages/ProfilePage"
import AssignmentPage from "./pages/student/AssignmentPage"
import CodingEnvironment from "./pages/student/CodingEnvironment"
import MCQAssessment from "./pages/student/MCQAssessment"
import ResultsPage from "./pages/student/ResultsPage"
import SkillsImprovement from "./pages/student/SkillsImprovement"
import ProtectedRoute from "./components/ProtectedRoute"
import CourseMaterials from "./pages/teacher/CourseMaterials"
import Assignments from "./pages/teacher/Assignments"
import Analytics from "./pages/teacher/Analytics"
import Calendar from "./pages/teacher/Calendar"
import Settings from "./pages/teacher/Settings"

const user = {
  id: 1,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@university.edu",
  role: "Professor",
  department: "Computer Science",
  avatar: "/placeholder.svg?height=80&width=80",
}

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute user={user} userType="student">
              <StudentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/profile"
          element={
            <ProtectedRoute user={user} userType="student">
              <ProfilePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/assignment/:id"
          element={
            <ProtectedRoute user={user} userType="student">
              <AssignmentPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/coding/:id"
          element={
            <ProtectedRoute user={user} userType="student">
              <CodingEnvironment user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/mcq/:id"
          element={
            <ProtectedRoute user={user} userType="student">
              <MCQAssessment user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/results/:id"
          element={
            <ProtectedRoute user={user} userType="student">
              <ResultsPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/skills"
          element={
            <ProtectedRoute user={user} userType="student">
              <SkillsImprovement user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard user={user} />} />
        <Route path="/teacher/profile" element={<TeacherProfile user={user} />} />

        <Route path='/student/results' element={<ResultsPage/>}></Route>
        <Route path="/teacher/course-materials" element={<CourseMaterials user={user} />} />
        <Route path="/teacher/assignments" element={<Assignments user={user} />} />
        <Route path="/teacher/analytics" element={<Analytics user={user} />} />
        <Route path="/teacher/calendar" element={<Calendar user={user} />} />
        <Route path="/teacher/settings" element={<Settings user={user} />} />
        
        
        
        
      </Routes>
    </Router>
  )
}

export default App

