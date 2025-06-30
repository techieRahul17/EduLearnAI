"use client"

import { useLocation, useNavigate } from "react-router-dom"
import Chatbot from "../../components/Chatbot"

const ResultsPage = ({ user, onLogout }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const { score, total, answers, questions, passedTests, totalTests, type } = location.state || {}

  const percentage = type === "mcq" ? Math.round((score / total) * 100) : Math.round((passedTests / totalTests) * 100)

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A", color: "text-green-600" }
    if (percentage >= 80) return { grade: "B", color: "text-green-600" }
    if (percentage >= 70) return { grade: "C", color: "text-yellow-600" }
    if (percentage >= 60) return { grade: "D", color: "text-yellow-600" }
    return { grade: "F", color: "text-red-600" }
  }

  const { grade, color } = getGrade(percentage)

  const renderMCQResults = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <p className="text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold">
                {score} / {total}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Percentage</p>
              <p className="text-3xl font-bold">{percentage}%</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Grade</p>
              <p className={`text-3xl font-bold ${color}`}>{grade}</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className={`h-4 rounded-full ${
                percentage >= 70 ? "bg-green-600" : percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => navigate("/student/dashboard")}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Analysis</h2>

          <div className="space-y-6">
            {questions?.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.Answer

              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start mb-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                        isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {isCorrect ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-2">{question.Question}</p>
                      <p className="text-sm text-gray-700 mb-1">
                        Your Answer: {question.Options[userAnswer] ? question.Options[userAnswer] : "Not Answered"}
                      </p>
                      <p className="text-sm text-gray-700">
                        Correct Answer: {question.Options[question.Answer]}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1">
        <main className="p-6">
          {type === "mcq" && renderMCQResults()}
        </main>
        <Chatbot />
      </div>
    </div>
  )
}

export default ResultsPage
