"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import SectionSelector from "./SectionSelector"
import PerformanceChart from "./PerformanceChart"
import PendingFeedbackTable from "./PendingFeedbackTable"
import Chatbot from "./Chatbot"
import { User, BookOpen, FileText, BarChart2, Calendar, Settings, Bell } from "react-feather"

// Mock data
const sections = ["Section A", "Section B", "Section C", "Section D"]

const sectionData = {
  "Section A": {
    averageGrade: 85,
    topStudents: [
      { id: 1, name: "John Smith", grade: 98 },
      { id: 2, name: "Emily Johnson", grade: 95 },
      { id: 3, name: "Michael Brown", grade: 92 },
    ],
    weakAreas: ["Algorithm Complexity", "Database Normalization", "Recursion"],
    submissions: {
      completed: 42,
      pending: 8,
      total: 50,
    },
    performance: [75, 82, 85, 90, 85],
  },
  "Section B": {
    averageGrade: 78,
    topStudents: [
      { id: 4, name: "Sarah Wilson", grade: 94 },
      { id: 5, name: "David Lee", grade: 91 },
      { id: 6, name: "Jessica Taylor", grade: 89 },
    ],
    weakAreas: ["Object-Oriented Design", "Memory Management", "Web Security"],
    submissions: {
      completed: 38,
      pending: 12,
      total: 50,
    },
    performance: [70, 72, 75, 78, 78],
  },
  "Section C": {
    averageGrade: 82,
    topStudents: [
      { id: 7, name: "Robert Martinez", grade: 96 },
      { id: 8, name: "Jennifer Garcia", grade: 93 },
      { id: 9, name: "Daniel Rodriguez", grade: 90 },
    ],
    weakAreas: ["Concurrency", "Network Protocols", "Design Patterns"],
    submissions: {
      completed: 40,
      pending: 10,
      total: 50,
    },
    performance: [72, 76, 80, 81, 82],
  },
  "Section D": {
    averageGrade: 76,
    topStudents: [
      { id: 10, name: "Lisa Anderson", grade: 92 },
      { id: 11, name: "Thomas White", grade: 89 },
      { id: 12, name: "Michelle Harris", grade: 87 },
    ],
    weakAreas: ["Data Structures", "Algorithm Efficiency", "System Design"],
    submissions: {
      completed: 35,
      pending: 15,
      total: 50,
    },
    performance: [68, 70, 73, 75, 76],
  },
}

const pendingFeedbacks = [
  { id: 1, student: "John Smith", assignment: "Data Structures Essay", submitted: "2023-06-05", status: "AI Graded" },
  { id: 2, student: "Emily Johnson", assignment: "Algorithm Analysis", submitted: "2023-06-04", status: "AI Graded" },
  {
    id: 3,
    student: "Michael Brown",
    assignment: "Database Design Project",
    submitted: "2023-06-03",
    status: "AI Graded",
  },
  {
    id: 4,
    student: "Sarah Wilson",
    assignment: "Web Development Project",
    submitted: "2023-06-02",
    status: "AI Graded",
  },
]

const TeacherDashboard = ({ user: propUser }) => {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState("Section A")
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [notifications, setNotifications] = useState(3)
  const [user, setUser] = useState(propUser || {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    role: "Professor",
    department: "Computer Science",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  // If no user (not logged in), redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  if (!user) return null

  const currentSectionData = sectionData[activeSection]

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen)
  }

  const handleNotificationClick = () => {
    setNotifications(0)
  }

  const handleNavItemClick = (item) => {
    navigate(`/teacher/${item.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const handleGenerateImprovementPlan = () => {
    setIsChatbotOpen(true)
    // Here we would also send a message to the chatbot to generate an improvement plan
  }

  const handleReviewFeedback = (feedbackId, studentName) => {
    alert(`Reviewing feedback #${feedbackId} for ${studentName}`)
  }

  const handleApproveFeedback = (feedbackId, studentName) => {
    alert(`AI Feedback for ${studentName} approved!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">EduAssist AI</h1>
              <span className="hidden md:inline-block px-3 py-1 bg-white/20 rounded-full text-sm">
                Teacher Dashboard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-white/10" onClick={handleNotificationClick}>
                  <Bell className="h-6 w-6" />
                </button>
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full border-2 border-purple-600 flex items-center justify-center text-xs">
                    {notifications}
                  </span>
                )}
              </div>
              <Link to="/teacher/profile" className="flex items-center space-x-2 hover:bg-white/10 rounded-full pr-2">
                <img
                  src={user.avatar || "/placeholder.svg?height=40&width=40"}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-white/50"
                />
                <span className="hidden md:inline-block font-medium">{user.name}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.avatar || "/placeholder.svg?height=80&width=80"}
                    alt="Profile"
                    className="h-20 w-20 rounded-full border-4 border-white/30"
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-purple-100">{user.role}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">4</div>
                    <div className="text-sm text-gray-600">Class Sections</div>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-indigo-600 mb-1">120</div>
                    <div className="text-sm text-gray-600">Total Students</div>
                  </div>
                  <div className="bg-violet-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-violet-600 mb-1">15</div>
                    <div className="text-sm text-gray-600">Pending Reviews</div>
                  </div>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">80%</div>
                    <div className="text-sm text-gray-600">Avg. Performance</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Navigation</h3>
                  <nav className="space-y-2">
                    <Link
                      to="/teacher/profile"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <User className="h-5 w-5 text-gray-500" />
                      <span>Profile</span>
                    </Link>
                    <Link 
                      to="/teacher/course-materials"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <BookOpen className="h-5 w-5 text-gray-500" />
                      <span>Course Materials</span>
                    </Link>
                    <Link 
                      to="/teacher/assignments"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <FileText className="h-5 w-5 text-gray-500" />
                      <span>Assignments</span>
                    </Link>
                    <Link 
                      to="/teacher/analytics"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <BarChart2 className="h-5 w-5 text-gray-500" />
                      <span>Analytics</span>
                    </Link>
                    <Link 
                      to="/teacher/calendar"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>Calendar</span>
                    </Link>
                    <Link 
                      to="/teacher/settings"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
                    >
                      <Settings className="h-5 w-5 text-gray-500" />
                      <span>Settings</span>
                    </Link>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Section Selector */}
            <SectionSelector sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Section Analytics */}
            <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">{activeSection} Analytics</h2>
                  <div className="flex space-x-2">
                    <select 
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      onChange={(e) => alert(`Selected timeframe: ${e.target.value}`)}
                    >
                      <option>Current Semester</option>
                      <option>Last Semester</option>
                      <option>All Time</option>
                    </select>
                    <button 
                      className="px-3 py-2 bg-purple-600 text-white rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                      onClick={() => alert("Exporting data...")}
                    >
                      Export
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
                    <div className="text-4xl font-bold text-purple-600 mb-2">{currentSectionData.averageGrade}%</div>
                    <div className="text-gray-700 font-medium">Average Grade</div>
                    <div className="mt-4 text-sm text-gray-500">
                      {currentSectionData.averageGrade > 80 ? "5% above" : "3% below"} previous semester
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">
                      {currentSectionData.submissions.completed}
                    </div>
                    <div className="text-gray-700 font-medium">Completed Submissions</div>
                    <div className="mt-4 text-sm text-gray-500">
                      {currentSectionData.submissions.pending} pending submissions
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl border border-amber-100">
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {Math.round(
                        (currentSectionData.submissions.completed / currentSectionData.submissions.total) * 100,
                      )}
                      %
                    </div>
                    <div className="text-gray-700 font-medium">Completion Rate</div>
                    <div className="mt-4 text-sm text-gray-500">
                      {currentSectionData.submissions.total} total assignments
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Performing Students</h3>
                    <div className="space-y-4">
                      {currentSectionData.topStudents.map((student, index) => (
                        <div 
                          key={student.id} 
                          className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                          onClick={() => alert(`Viewing ${student.name}'s profile`)}
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="font-medium text-gray-800">{student.name}</div>
                            <div className="text-sm text-gray-500">Student ID: {student.id}</div>
                          </div>
                          <div className="text-lg font-bold text-purple-600">{student.grade}%</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas Needing Improvement</h3>
                    <div className="space-y-4">
                      {currentSectionData.weakAreas.map((area, index) => (
                        <div 
                          key={index} 
                          className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                          onClick={() => alert(`Viewing resources for ${area}`)}
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="ml-3">
                            <div className="font-medium text-gray-800">{area}</div>
                            <div className="text-sm text-gray-500">
                              {index === 0 ? "High priority" : index === 1 ? "Medium priority" : "Low priority"}
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className="mt-2 w-full py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors"
                        onClick={handleGenerateImprovementPlan}
                      >
                        Generate Improvement Plan
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Trend</h3>
                  <PerformanceChart data={currentSectionData.performance} />
                </div>
              </div>
            </div>

            {/* Pending Feedback */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Pending Feedback</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assignment
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Submitted
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {pendingFeedbacks.map((feedback) => (
                        <tr key={feedback.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold">
                                {feedback.student.split(" ").map((n) => n[0]).join("")}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{feedback.student}</div>
                                <div className="text-sm text-gray-500">{activeSection}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{feedback.assignment}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{feedback.submitted}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {feedback.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              className="text-purple-600 hover:text-purple-900 mr-3"
                              onClick={() => handleReviewFeedback(feedback.id, feedback.student)}
                            >
                              Review
                            </button>
                            <button
                              className="text-gray-600 hover:text-gray-900"
                              onClick={() => handleApproveFeedback(feedback.id, feedback.student)}
                            >
                              Approve AI Feedback
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <Chatbot isOpen={isChatbotOpen} toggleChatbot={toggleChatbot} />
    </div>
  )
}

export default TeacherDashboard