"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"
import Chatbot from "../../components/Chatbot"

const StudentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("assignments")

  // Mock data
  const assignments = [
    {
      id: 1,
      title: "Data Structures Assignment",
      subject: "Computer Science",
      dueDate: "2023-05-15",
      status: "pending",
    },
    {
      id: 2,
      title: "Machine Learning Project",
      subject: "Artificial Intelligence",
      dueDate: "2023-05-20",
      status: "pending",
    },
    { id: 3, title: "Database Design", subject: "Database Systems", dueDate: "2023-05-10", status: "completed" },
  ]

  const codingAssessments = [
    { id: 1, title: "Algorithm Implementation", subject: "Data Structures", dueDate: "2023-05-18", status: "pending" },
    { id: 2, title: "Web API Development", subject: "Web Development", dueDate: "2023-05-25", status: "pending" },
    { id: 3, title: "Sorting Algorithms", subject: "Algorithms", dueDate: "2023-05-08", status: "completed" },
  ]

  const mcqTests = [
    { id: 1, title: "Python Fundamentals", subject: "Programming Languages", dueDate: "2023-05-16", status: "pending" },
    { id: 2, title: "Computer Networks", subject: "Networking", dueDate: "2023-05-22", status: "pending" },
    { id: 3, title: "Operating Systems", subject: "OS", dueDate: "2023-05-05", status: "completed" },
  ]

  const feedback = [
    {
      id: 1,
      type: "ai",
      content:
        "Your coding style is improving, but you need to work on code optimization and time complexity analysis.",
      date: "2023-05-01",
    },
    {
      id: 2,
      type: "teacher",
      content:
        "Great progress in the last assignment. Focus more on documenting your code and explaining your approach.",
      date: "2023-04-28",
    },
    {
      id: 3,
      type: "ai",
      content: "You're doing well in algorithm implementation, but need to improve on database design concepts.",
      date: "2023-04-25",
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case "assignments":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Assignments</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  All
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Pending
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Completed
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assignments.map((assignment) => (
                <Link
                  key={assignment.id}
                  to={`/student/assignment/${assignment.id}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assignment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assignment.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{assignment.subject}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )

      case "coding":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Coding Assessments</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  All
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Pending
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Completed
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {codingAssessments.map((assessment) => (
                <Link
                  key={assessment.id}
                  to={`/student/coding/${assessment.id}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          assessment.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {assessment.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{assessment.subject}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Due: {new Date(assessment.dueDate).toLocaleDateString()}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )

      case "mcq":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">MCQ Tests</h2>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  All
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Pending
                </button>
                <button className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Completed
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mcqTests.map((test) => (
                <Link
                  key={test.id}
                  to={`/student/mcq/${test.id}`}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900">{test.title}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          test.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {test.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{test.subject}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Due: {new Date(test.dueDate).toLocaleDateString()}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )

      case "feedback":
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Feedback</h2>

            <div className="space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        item.type === "ai" ? "bg-indigo-100" : "bg-green-100"
                      }`}
                    >
                      {item.type === "ai" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-indigo-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">
                          {item.type === "ai" ? "AI Feedback" : "Teacher Feedback"}
                        </h3>
                        <span className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-gray-700">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar user={user} onLogout={onLogout} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
                  <p className="text-white/80">Track your assignments, tests, and progress all in one place.</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    to="/student/skills"
                    className="inline-flex items-center px-4 py-2 bg-white text-indigo-600 rounded-lg font-medium hover:bg-opacity-90 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Improve Your Skills
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pending Assignments</p>
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Coding Tests</p>
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-pink-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">MCQ Tests</p>
                    <h3 className="text-2xl font-bold text-gray-900">2</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("assignments")}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "assignments"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Assignments
                </button>

                <button
                  onClick={() => setActiveTab("coding")}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "coding"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Coding Tests
                </button>

                <button
                  onClick={() => setActiveTab("mcq")}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "mcq"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  MCQ Tests
                </button>

                <button
                  onClick={() => setActiveTab("feedback")}
                  className={`py-4 px-1 text-sm font-medium border-b-2 ${
                    activeTab === "feedback"
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Feedback
                </button>
              </nav>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </main>
      </div>

      <Chatbot />
    </div>
  )
}

export default StudentDashboard

