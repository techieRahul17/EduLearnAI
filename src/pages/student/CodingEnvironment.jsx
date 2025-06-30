"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Editor from "@monaco-editor/react"
import { ChevronLeft, ChevronRight, Moon, Sun, Play, Send } from "lucide-react"

// Sample problems data
const problems = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    details:
      "You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    testCases: [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
      { input: "[1,2,3,4], 7", expectedOutput: "[2,3]" },
      { input: "[5,2,4], 6", expectedOutput: "[1,2]" },
    ],
    submissions: [
      {
        status: "Accepted",
        runtime: "76 ms",
        memory: "42.4 MB",
        language: "JavaScript",
        date: "2023-04-15",
      },
      {
        status: "Wrong Answer",
        runtime: "80 ms",
        memory: "43.1 MB",
        language: "JavaScript",
        date: "2023-04-14",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Your code here
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        # Your code here
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{0, 0};
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {0, 0};
    }
};`,
    },
  },
  {
    id: 2,
    title: "Add Two Numbers",
    difficulty: "Medium",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    details: "You may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807.",
      },
      {
        input: "l1 = [0], l2 = [0]",
        output: "[0]",
        explanation: "0 + 0 = 0.",
      },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    testCases: [
      { input: "[2,4,3], [5,6,4]", expectedOutput: "[7,0,8]" },
      { input: "[0], [0]", expectedOutput: "[0]" },
      { input: "[9,9,9,9], [9,9,9]", expectedOutput: "[8,9,9,0,1]" },
    ],
    submissions: [
      {
        status: "Accepted",
        runtime: "112 ms",
        memory: "46.8 MB",
        language: "JavaScript",
        date: "2023-05-20",
      },
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
    // Your code here
}`,
      python: `# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # Your code here
        pass`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        // Your code here
        return nullptr;
    }
};`,
    },
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    details: "",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation:
          'The answer is "wke", with the length of 3. Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
      },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    testCases: [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
      { input: '"pwwkew"', expectedOutput: "3" },
      { input: '""', expectedOutput: "0" },
      { input: '"aab"', expectedOutput: "2" },
    ],
    submissions: [
      {
        status: "Accepted",
        runtime: "92 ms",
        memory: "45.2 MB",
        language: "JavaScript",
        date: "2023-06-10",
      },
      {
        status: "Time Limit Exceeded",
        runtime: "N/A",
        memory: "N/A",
        language: "JavaScript",
        date: "2023-06-09",
      },
    ],
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    // Your code here
}`,
      python: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Your code here
        pass`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        // Your code here
        return 0;
    }
};`,
    },
  },
]

const CodingEnvironment = () => {
  const [currentProblemId, setCurrentProblemId] = useState(1)
  const [language, setLanguage] = useState("javascript")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showProblem, setShowProblem] = useState(true)
  const [showSidebar, setShowSidebar] = useState(false)
  const [resizing, setResizing] = useState(false)
  const [problemWidth, setProblemWidth] = useState(33) // percentage
  const [activeTab, setActiveTab] = useState("description")
  const [editorTab, setEditorTab] = useState("code")

  const resizeRef = useRef(null)
  const containerRef = useRef(null)

  const currentProblem = problems.find((p) => p.id === currentProblemId) || problems[0]
  const [testResults, setTestResults] = useState([])

  useEffect(() => {
    setCode(currentProblem.starterCode[language] || "")
    setOutput("")
    setTestResults([])
    setEditorTab("code")
  }, [language, currentProblem])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizing && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const newWidth = (e.clientX / containerWidth) * 100
        // Limit the width between 20% and 80%
        const clampedWidth = Math.min(Math.max(newWidth, 20), 80)
        setProblemWidth(clampedWidth)
      }
    }

    const handleMouseUp = () => {
      setResizing(false)
      document.body.style.cursor = "default"
    }

    if (resizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "default"
    }
  }, [resizing])

  const handleRun = async () => {
    setIsRunning(true)
    setOutput("")
    setTestResults([])

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock results
      const results = currentProblem.testCases.map((testCase, index) => {
        const passed = index % 2 === 0 // Just for demo
        return {
          passed,
          input: testCase.input,
          expected: testCase.expectedOutput,
          actual: passed ? testCase.expectedOutput : "Wrong output",
        }
      })

      setTestResults(results)

      const outputText = results
        .map(
          (result, index) =>
            `Test Case ${index + 1}: ${result.passed ? "PASSED" : "FAILED"}\n` +
            `Input: ${result.input}\n` +
            `Expected: ${result.expected}\n` +
            `Actual: ${result.actual}\n` +
            `${result.passed ? "✓" : "✗"}\n`,
        )
        .join("\n")

      setOutput(outputText)
      setEditorTab("result")
    } catch (error) {
      setOutput("Error: " + error.message)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setOutput("")
    setTestResults([])

    // Simulate submission
    setTimeout(() => {
      const results = currentProblem.testCases.map((testCase) => ({
        passed: true,
        input: testCase.input,
        expected: testCase.expectedOutput,
        actual: testCase.expectedOutput,
      }))

      setTestResults(results)
      setOutput("All test cases passed!\nYour solution has been accepted.")
      setEditorTab("result")
      setIsSubmitting(false)
    }, 2000)
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleProblem = () => {
    setShowProblem(!showProblem)
  }

  const navigateToProblem = (id) => {
    setCurrentProblemId(id)
    setShowSidebar(false)
  }

  const renderEditorContent = () => {
    switch (editorTab) {
      case "code":
        return (
          <Editor
            height="100%"
            defaultLanguage={language}
            value={code}
            onChange={(val) => setCode(val || "")}
            theme={isDarkMode ? "vs-dark" : "light"}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              lineNumbers: "on",
              tabSize: 2,
              wordWrap: "on",
            }}
          />
        )
      case "testcase":
        return (
          <div
            className={`p-4 h-full overflow-auto ${isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-900"}`}
          >
            <h3 className="text-lg font-medium mb-4">Test Cases</h3>
            <div className="space-y-4">
              {currentProblem.testCases.map((testCase, index) => (
                <div key={index} className={`p-4 rounded-md ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                  <div className="font-mono mb-2">
                    <span className="font-semibold">Input:</span> {testCase.input}
                  </div>
                  <div className="font-mono">
                    <span className="font-semibold">Expected Output:</span> {testCase.expectedOutput}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      case "result":
        return (
          <div
            className={`p-4 h-full overflow-auto ${isDarkMode ? "bg-[#1e1e1e] text-white" : "bg-white text-gray-900"}`}
          >
            <h3 className="text-lg font-medium mb-4">Test Results</h3>
            {testResults.length > 0 ? (
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-md ${
                      result.passed
                        ? isDarkMode
                          ? "bg-green-900/30"
                          : "bg-green-100"
                        : isDarkMode
                          ? "bg-red-900/30"
                          : "bg-red-100"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <span className={`mr-2 ${result.passed ? "text-green-500" : "text-red-500"}`}>
                        {result.passed ? "✓" : "✗"}
                      </span>
                      <span className="font-medium">
                        Test Case {index + 1}: {result.passed ? "PASSED" : "FAILED"}
                      </span>
                    </div>
                    <div className="font-mono text-sm mb-1">
                      <span className="font-semibold">Input:</span> {result.input}
                    </div>
                    <div className="font-mono text-sm mb-1">
                      <span className="font-semibold">Expected:</span> {result.expected}
                    </div>
                    <div className="font-mono text-sm">
                      <span className="font-semibold">Actual:</span> {result.actual}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                Run your code to see results
              </div>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-gray-900"}`}>
      {/* Top Navigation Bar */}
      <header
        className={`flex items-center justify-between px-4 py-2 border-b ${isDarkMode ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-200"}`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className={`p-2 rounded-md ${isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            >
              <ChevronRight className={`h-5 w-5 transition-transform ${showSidebar ? "rotate-180" : ""}`} />
            </button>
            <span className="ml-2 font-medium">Problem List</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <motion.button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-yellow-300"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            }`}
            whileHover={{
              scale: 1.05,
              boxShadow: isDarkMode ? "0 0 8px rgba(253, 224, 71, 0.3)" : "0 0 8px rgba(107, 114, 128, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </motion.button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border ${
              isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-gray-900"
            }`}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          <motion.button
            onClick={handleRun}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded-md font-medium flex items-center space-x-1 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
                : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
            } disabled:opacity-50`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="h-4 w-4" />
            <span>{isRunning ? "Running..." : "Run"}</span>
          </motion.button>

          <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-1.5 rounded-md font-medium flex items-center space-x-1 ${
              isDarkMode ? "bg-green-700 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-500 text-white"
            } disabled:opacity-50`}
            whileHover={{
              scale: 1.02,
              boxShadow: isDarkMode ? "0 0 8px rgba(22, 163, 74, 0.4)" : "0 0 8px rgba(22, 163, 74, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="h-4 w-4" />
            <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative" ref={containerRef}>
        {/* Questions sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              className={`absolute top-0 left-0 h-full z-20 ${
                isDarkMode ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-200"
              } border-r overflow-y-auto`}
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "250px" }}
            >
              <div className="p-4">
                <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Problems
                </h2>
                <div className="space-y-2">
                  {problems.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => navigateToProblem(p.id)}
                      className={`p-3 rounded-md cursor-pointer flex items-center ${
                        p.id === currentProblemId
                          ? isDarkMode
                            ? "bg-gray-800 text-white"
                            : "bg-gray-100 text-gray-900"
                          : isDarkMode
                            ? "hover:bg-gray-800"
                            : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{p.id}.</span>
                      <div>
                        <p className="font-medium">{p.title}</p>
                        <p
                          className={`text-xs ${
                            p.difficulty === "Easy"
                              ? "text-green-500"
                              : p.difficulty === "Medium"
                                ? "text-yellow-500"
                                : "text-red-500"
                          }`}
                        >
                          {p.difficulty}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Problem description */}
        <AnimatePresence>
          {showProblem && (
            <motion.div
              className={`overflow-y-auto border-r ${
                isDarkMode ? "bg-[#1a1a1a] border-gray-800" : "bg-white border-gray-200"
              }`}
              style={{ width: `${problemWidth}%` }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Problem tabs */}
              <div className={`flex border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"}`}>
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "description"
                      ? isDarkMode
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "border-b-2 border-blue-600 text-blue-600"
                      : isDarkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab("submissions")}
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "submissions"
                      ? isDarkMode
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "border-b-2 border-blue-600 text-blue-600"
                      : isDarkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  Submissions
                </button>
              </div>

              {/* Problem content */}
              {activeTab === "description" ? (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {currentProblem.id}. {currentProblem.title}
                    </h1>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        currentProblem.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : currentProblem.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {currentProblem.difficulty}
                    </span>
                  </div>

                  <div className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    <p className="mb-2">{currentProblem.description}</p>
                    {currentProblem.details && <p>{currentProblem.details}</p>}
                  </div>

                  <div className="mb-6">
                    <h3 className={`text-lg font-medium mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Examples:
                    </h3>
                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className={`p-4 rounded-md mb-3 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
                        <div className={`mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span className="font-mono">Input: </span>
                          <span>{example.input}</span>
                        </div>
                        <div className={`mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          <span className="font-mono">Output: </span>
                          <span>{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            <span className="font-mono">Explanation: </span>
                            <span>{example.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      Constraints:
                    </h3>
                    <ul className={`list-disc pl-5 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {currentProblem.constraints.map((constraint, index) => (
                        <li key={index} className="mb-1 font-mono text-sm">
                          {constraint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Your Submissions
                  </h2>
                  <div className="overflow-x-auto">
                    <table className={`w-full ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      <thead className={`text-left ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                        <tr>
                          <th className="py-2 px-4">Status</th>
                          <th className="py-2 px-4">Runtime</th>
                          <th className="py-2 px-4">Memory</th>
                          <th className="py-2 px-4">Language</th>
                          <th className="py-2 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentProblem.submissions.map((submission, index) => (
                          <tr key={index} className={`${isDarkMode ? "border-gray-800" : "border-gray-200"} border-t`}>
                            <td
                              className={`py-3 px-4 ${
                                submission.status === "Accepted"
                                  ? "text-green-500"
                                  : submission.status === "Wrong Answer"
                                    ? "text-red-500"
                                    : "text-yellow-500"
                              }`}
                            >
                              {submission.status}
                            </td>
                            <td className="py-3 px-4">{submission.runtime}</td>
                            <td className="py-3 px-4">{submission.memory}</td>
                            <td className="py-3 px-4">{submission.language}</td>
                            <td className="py-3 px-4">{submission.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Resizer */}
        {showProblem && (
          <div
            ref={resizeRef}
            className={`w-1 cursor-col-resize hover:bg-blue-500 active:bg-blue-600 z-10 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
            onMouseDown={() => setResizing(true)}
          />
        )}

        {/* Toggle problem button */}
        <button
          onClick={toggleProblem}
          className={`absolute top-1/2 ${showProblem ? `left-[${problemWidth}%]` : "left-0"} z-20 p-1 rounded-r-md ${
            isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
          style={{ transform: "translateY(-50%)" }}
        >
          {showProblem ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {/* Code editor section */}
        <div className="flex flex-col flex-1">
          {/* Code tabs */}
          <div
            className={`flex border-b ${isDarkMode ? "border-gray-800 bg-[#1e1e1e]" : "border-gray-200 bg-gray-50"}`}
          >
            <button
              onClick={() => setEditorTab("code")}
              className={`px-4 py-2 font-medium text-sm ${
                editorTab === "code"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "border-b-2 border-blue-600 text-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Code
            </button>
            <button
              onClick={() => setEditorTab("testcase")}
              className={`px-4 py-2 font-medium text-sm ${
                editorTab === "testcase"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "border-b-2 border-blue-600 text-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Testcase
            </button>
            <button
              onClick={() => setEditorTab("result")}
              className={`px-4 py-2 font-medium text-sm ${
                editorTab === "result"
                  ? isDarkMode
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "border-b-2 border-blue-600 text-blue-600"
                  : isDarkMode
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Test Result
            </button>
          </div>

          {/* Editor content based on active tab */}
          <div className="flex-1 overflow-hidden">{renderEditorContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default CodingEnvironment

