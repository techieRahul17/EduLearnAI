"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Chatbot from "../../components/Chatbot"

const MCQAssessment = () => {
  const navigate = useNavigate()

  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(1800)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("https://mithackapi.onrender.com/getQuestions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            Topic: "OS",
            Type: "MCQ",
            Quantity: 5
          })
        })

        const data = await res.json()
        const formatted = data.Questions?.map((q, idx) => ({
          ...q,
          id: idx, // Ensure every question has an ID
          correctAnswer: q.Answer
        })) || []

        setQuestions(formatted)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching questions:", error)
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  useEffect(() => {
    if (loading) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [loading])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleAnswerSelect = (qIndex, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }
  const handleSubmit = () => {
    if (isSubmitting || loading) return
    setIsSubmitting(true)
  
    let correct = 0
    const scoreList = [] 
  
    questions.forEach((q, index) => {
      const isCorrect = answers[index] === q.correctAnswer
      if (isCorrect) correct++
      scoreList.push(isCorrect ? 1 : 0)
    })

    console.log(scoreList)
  
    const formattedAnswers = {}
    questions.forEach((q, index) => {
      formattedAnswers[q.id] = answers[index]
    })
  
    setTimeout(() => {
      navigate("/student/results", {
        state: {
          score: correct,
          total: questions.length,
          answers: formattedAnswers,
          scoreList, // ✅ send the per-question score list too
          questions,
          type: "mcq"
        }
      })
    }, 1500)
  }
  

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-medium">
        Loading Questions...
      </div>
    )
  }

  const current = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Assessment</h1>
          <span className="text-sm text-gray-500">MCQ Format</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded text-sm font-medium ${timeLeft < 300 ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-800"}`}>
            ⏳ Time Left: {formatTime(timeLeft)}
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </header>

      <div className="h-1 bg-gray-200">
        <div className="h-1 bg-indigo-600 transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <p className="text-gray-800 whitespace-pre-wrap mb-6">{current.Question}</p>

          <div className="space-y-3 mb-6">
            {current.Options.map((opt, i) => (
              <div
                key={i}
                onClick={() => handleAnswerSelect(currentQuestion, i)}
                className={`p-3 border rounded-lg cursor-pointer ${
                  answers[currentQuestion] === i
                    ? "bg-indigo-50 border-indigo-500"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + i)}.</span> {opt}
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  )
}

export default MCQAssessment
