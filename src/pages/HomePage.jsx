"use client"

import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for scroll detection
  const featuresRef = useRef(null)
  const benefitsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const pricingRef = useRef(null)

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3])

  // Floating animation for background elements
  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  // Detect scroll position for navbar and section highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }

      // Determine active section
      const scrollPosition = window.scrollY + 300

      if (
        featuresRef.current &&
        scrollPosition >= featuresRef.current.offsetTop &&
        benefitsRef.current &&
        scrollPosition < benefitsRef.current.offsetTop
      ) {
        setActiveSection("features")
      } else if (
        benefitsRef.current &&
        scrollPosition >= benefitsRef.current.offsetTop &&
        testimonialsRef.current &&
        scrollPosition < testimonialsRef.current.offsetTop
      ) {
        setActiveSection("benefits")
      } else if (
        testimonialsRef.current &&
        scrollPosition >= testimonialsRef.current.offsetTop &&
        pricingRef.current &&
        scrollPosition < pricingRef.current.offsetTop
      ) {
        setActiveSection("testimonials")
      } else if (pricingRef.current && scrollPosition >= pricingRef.current.offsetTop) {
        setActiveSection("pricing")
      } else {
        setActiveSection("hero")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.2), 0 18px 36px -18px rgba(0, 0, 0, 0.22)",
      transition: { type: "spring", stiffness: 500, damping: 15 },
    },
  }

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const navItems = [
    { id: "features", label: "Features" },
    { id: "benefits", label: "Benefits" },
    { id: "testimonials", label: "Testimonials" },
    { id: "pricing", label: "Pricing" },
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 z-0">
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 40 + 10,
                height: Math.random() * 40 + 10,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Book and education elements */}
        <motion.div animate={floatingAnimation} className="absolute top-1/4 left-1/4 w-64 h-64 text-white/5">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
          className="absolute top-1/3 right-1/4 w-80 h-80 text-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
          </svg>
        </motion.div>

        <motion.div
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
          className="absolute bottom-1/4 left-1/3 w-72 h-72 text-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 4h2v5l-1-.75L9 9V4zm9 16H6V4h1v9l3-2.25L13 13V4h5v16z" />
          </svg>
        </motion.div>

        {/* Light beams */}
        <div className="absolute top-0 left-1/4 w-1/2 h-screen bg-gradient-to-b from-blue-400/20 to-transparent transform -rotate-45 blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/3 h-screen bg-gradient-to-b from-purple-400/10 to-transparent transform rotate-45 blur-3xl"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 shadow-lg backdrop-blur-md py-3 text-gray-800" : "bg-transparent py-5 text-white"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 mr-2 ${isScrolled ? "text-blue-600" : "text-white"}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
            </svg>
            <span className={`font-bold text-xl ${isScrolled ? "text-blue-600" : "text-white"}`}>EduLearn AI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-2 py-1 transition-colors ${
                  activeSection === item.id
                    ? isScrolled
                      ? "text-blue-600 font-medium"
                      : "text-white font-medium"
                    : isScrolled
                      ? "text-gray-700 hover:text-blue-600"
                      : "text-white/80 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className={`absolute bottom-0 left-0 h-0.5 w-full ${isScrolled ? "bg-blue-600" : "bg-white"}`}
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isScrolled ? "text-blue-600" : "text-white"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex space-x-4">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isScrolled ? "text-blue-600 hover:bg-blue-50" : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className={`px-4 py-2 ${
                  isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-600 hover:bg-opacity-90"
                } rounded-lg font-medium transition-all shadow-lg hover:shadow-xl`}
              >
                Register
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-4 py-3 space-y-3">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                  <Link
                    to="/login"
                    className="px-3 py-2 text-center text-blue-600 border border-blue-600 rounded-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link to="/register" className="px-3 py-2 text-center bg-blue-600 text-white rounded-lg font-medium">
                    Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        id="hero"
        className="min-h-screen flex items-center relative z-10 pt-20 pb-16"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6"
                variants={itemVariants}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Revolutionizing Education with AI
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6 drop-shadow-md"
                variants={itemVariants}
              >
                Learn Smarter, <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                  Not Harder
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 drop-shadow-sm"
                variants={itemVariants}
              >
                Our AI-powered platform personalizes your learning journey, provides instant feedback, and helps you
                master any subject at your own pace.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/register"
                    className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-opacity-95 transition-all shadow-xl hover:shadow-2xl text-center block"
                  >
                    Start Learning Free
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="px-8 py-4 border-2 border-white/50 text-white rounded-xl font-medium hover:bg-white/10 transition-all text-center block"
                  >
                    Explore Features
                  </button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="mt-12 grid grid-cols-3 gap-4"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {[
                  { value: "10k+", label: "Students" },
                  { value: "500+", label: "Courses" },
                  { value: "98%", label: "Success Rate" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  >
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="lg:w-1/2 relative" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div
                className="relative z-10 mx-auto lg:ml-auto lg:mr-0 max-w-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                {/* Decorative elements */}
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-blue-500/30 rounded-2xl blur-xl"></div>
                <div className="absolute -inset-2 bg-white/20 rounded-2xl blur-lg"></div>

                {/* Main dashboard preview */}
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-2xl">
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden">
                    <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 text-white text-sm">EduLearn AI Dashboard</div>
                    </div>

                    <div className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="text-white text-lg font-semibold">Welcome back, Alex!</div>
                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
                          Premium
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
                          <div className="text-gray-400 text-xs mb-1">Courses Completed</div>
                          <div className="text-white text-2xl font-bold">12</div>
                          <div className="mt-2 text-green-400 text-xs flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 10l7-7m0 0l7 7m-7-7v18"
                              />
                            </svg>
                            +3 this month
                          </div>
                        </div>
                        <div className="bg-gray-800/80 p-4 rounded-lg border border-gray-700">
                          <div className="text-gray-400 text-xs mb-1">Current Progress</div>
                          <div className="text-white text-2xl font-bold">87%</div>
                          <div className="mt-2 text-blue-400 text-xs">Machine Learning</div>
                          <div className="mt-1 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: "87%" }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-800/80 p-4 rounded-lg mb-6 border border-gray-700">
                        <div className="text-gray-400 text-xs mb-3 flex justify-between items-center">
                          <span>Recommended Next Steps</span>
                          <span className="text-blue-400">View All</span>
                        </div>
                        <div className="space-y-3">
                          <div className="bg-gray-700/80 p-3 rounded-lg flex items-center border border-gray-600/50">
                            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                              <svg
                                className="w-4 h-4 text-purple-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white text-sm">Complete Neural Networks Quiz</div>
                              <div className="text-gray-400 text-xs mt-1">Due in 2 days</div>
                            </div>
                          </div>
                          <div className="bg-gray-700/80 p-3 rounded-lg flex items-center border border-gray-600/50">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                              <svg
                                className="w-4 h-4 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white text-sm">Review Project Feedback</div>
                              <div className="text-gray-400 text-xs mt-1">New comments available</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-xs">AI Tutor Available</div>
                        <div className="bg-green-500 text-white text-xs px-3 py-1 rounded-full flex items-center">
                          <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse"></span>
                          Online
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-5 -left-5 w-16 h-16 bg-blue-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                ></motion.div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute top-1/4 -right-10 transform rotate-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg px-4 py-2 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">Assignment Graded</div>
                    <div className="text-xs text-gray-500">Score: 95/100</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-1/4 -left-10 transform -rotate-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-lg px-4 py-2 flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-800">New Course Added</div>
                    <div className="text-xs text-gray-500">Data Science Fundamentals</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <button
            onClick={() => scrollToSection("features")}
            className="flex flex-col items-center text-white/80 hover:text-white"
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="py-24 bg-white relative z-10">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/0 to-white"></div>
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-20" variants={fadeInUpVariants}>
            <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
              Powerful Features
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Intelligent Learning Tools</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Our AI-powered platform offers a comprehensive suite of tools to enhance teaching and learning experiences
              for both educators and students.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Intelligent Assessment</h3>
              <p className="text-gray-600 text-lg mb-4">
                AI-based grading for essays, multiple-choice questions, and coding assignments with detailed feedback
                and improvement suggestions.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant grading and feedback
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-blue-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Plagiarism detection
                </li>
              </ul>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">AI Learning Assistant</h3>
              <p className="text-gray-600 text-lg mb-4">
                24/7 virtual tutor that answers questions, explains concepts, and provides personalized learning support
                in natural language.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Natural language interaction
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Personalized explanations
                </li>
              </ul>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Learning Analytics</h3>
              <p className="text-gray-600 text-lg mb-4">
                Comprehensive insights into student performance, identifying knowledge gaps and recommending targeted
                interventions.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Visual performance dashboards
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Predictive learning patterns
                </li>
              </ul>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Adaptive Curriculum</h3>
              <p className="text-gray-600 text-lg mb-4">
                Personalized learning paths that adapt to each student's pace, learning style, and mastery level for
                optimal progress.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom learning sequences
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-red-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Difficulty auto-adjustment
                </li>
              </ul>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-amber-600"
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
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interactive Coding</h3>
              <p className="text-gray-600 text-lg mb-4">
                Built-in coding environment with real-time feedback, error detection, and automated test case validation
                for programming courses.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-language support
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-amber-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Real-time code execution
                </li>
              </ul>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Progress Tracking</h3>
              <p className="text-gray-600 text-lg mb-4">
                Comprehensive progress monitoring with visual dashboards, achievement badges, and milestone celebrations
                to boost motivation.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Gamified achievements
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-teal-500 mr-2 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Learning streak tracking
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Feature showcase */}
          <motion.div
            className="mt-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
            variants={fadeInUpVariants}
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-200 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-200 rounded-full opacity-50 blur-3xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
                  Featured Highlight
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">AI-Powered Learning Assistant</h3>
                <p className="text-gray-600 text-lg mb-6">
                  Our intelligent AI tutor provides personalized support 24/7, answering questions, explaining concepts,
                  and guiding your learning journey.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-4 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Instant Answers</h4>
                      <p className="text-gray-600">Get immediate responses to your questions at any time</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-4 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Personalized Explanations</h4>
                      <p className="text-gray-600">Receive explanations tailored to your learning style and pace</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-4 mt-1">
                      <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Guided Problem Solving</h4>
                      <p className="text-gray-600">Step-by-step assistance with challenging problems</p>
                    </div>
                  </li>
                </ul>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg">
                  Try AI Assistant
                </button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl"></div>
                <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </div>
                      <div className="font-medium">AI Learning Assistant</div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="text-blue-600 font-bold">S</span>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
                          <p className="text-gray-700">Can you explain how neural networks work?</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          <svg
                            className="w-4 h-4 text-purple-600"
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
                        </div>
                        <div className="bg-purple-50 rounded-2xl rounded-tl-none p-4">
                          <p className="text-gray-700">
                            Neural networks are computing systems inspired by the human brain. They consist of:
                          </p>
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                            <li>Input layer: receives data</li>
                            <li>Hidden layers: process information</li>
                            <li>Output layer: provides results</li>
                          </ul>
                          <p className="mt-2 text-gray-700">Would you like me to explain how they learn?</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="text-blue-600 font-bold">S</span>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-xs">
                          <p className="text-gray-700">Yes, please explain how they learn!</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                          <svg
                            className="w-4 h-4 text-purple-600"
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
                        </div>
                        <div className="bg-purple-50 rounded-2xl rounded-tl-none p-4">
                          <p className="text-gray-700">
                            Neural networks learn through a process called backpropagation:
                          </p>
                          <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-700">
                            <li>They make predictions</li>
                            <li>Compare results to correct answers</li>
                            <li>Calculate error</li>
                            <li>Adjust weights to reduce error</li>
                          </ol>
                          <p className="mt-2 text-gray-700">
                            This process repeats many times, gradually improving accuracy.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 relative">
                      <input
                        type="text"
                        placeholder="Ask anything..."
                        className="w-full px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 12h14M12 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" ref={benefitsRef} className="py-24 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 opacity-95"></div>
        <motion.div
          className="container mx-auto px-4 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-20" variants={fadeInUpVariants}>
            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-4">
              Why Choose Us
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Transform Your Learning Experience</h2>
            <p className="text-white/80 text-xl max-w-3xl mx-auto">
              Our platform transforms the educational experience for both students and educators with powerful AI-driven
              tools that save time, improve outcomes, and personalize learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Students */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
              variants={fadeInUpVariants}
            >
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">For Students</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Personalized Learning Paths</h4>
                    <p className="text-white/80">
                      Customized curriculum that adapts to your unique learning style, pace, and goals
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">24/7 AI Tutor Assistance</h4>
                    <p className="text-white/80">Get immediate help with concepts and questions whenever you need it</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Detailed Feedback</h4>
                    <p className="text-white/80">
                      Receive specific improvement suggestions on assignments and assessments
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Gamified Learning</h4>
                    <p className="text-white/80">
                      Earn badges, track streaks, and celebrate milestones to stay motivated
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* For Educators */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20"
              variants={fadeInUpVariants}
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">For Educators</h3>
              <ul className="space-y-5">
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Automated Grading</h4>
                    <p className="text-white/80">
                      Save hours with AI-powered assessment that provides consistent, objective feedback
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Comprehensive Analytics</h4>
                    <p className="text-white/80">
                      Gain insights into class and individual student performance with detailed dashboards
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">AI-Generated Content</h4>
                    <p className="text-white/80">
                      Create curriculum materials, quizzes, and assignments with AI assistance
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-400/20 rounded-full p-1 mr-4 mt-1">
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-lg mb-1">Early Intervention</h4>
                    <p className="text-white/80">
                      Receive alerts when students are struggling so you can provide timely support
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Testimonial in benefits section */}
          <motion.div
            className="mt-20 bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 relative overflow-hidden"
            variants={fadeInUpVariants}
          >
            <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 top-1/3 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl"></div>

            <div className="relative flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="University Professor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <svg className="w-12 h-12 text-white/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white text-xl mb-6 leading-relaxed">
                  EduLearn AI has completely transformed how I teach my computer science courses. The automated grading
                  saves me countless hours, and the analytics help me identify exactly where students are struggling.
                  It's like having a teaching assistant available 24/7.
                </p>
                <div>
                  <h4 className="text-white font-bold text-lg">Dr. Sarah Johnson</h4>
                  <p className="text-white/70">Professor of Computer Science, Stanford University</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" ref={testimonialsRef} className="py-24 bg-white relative z-10">
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-20" variants={fadeInUpVariants}>
            <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
              Success Stories
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">What Our Users Say</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Hear from educators and students who have transformed their educational experience with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=64&width=64"
                    alt="Professor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Dr. Jane Doe</h4>
                  <p className="text-gray-500">Computer Science Professor</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "This platform has revolutionized how I grade coding assignments. The automated test case validation
                saves me hours each week, and the insights help me identify which concepts students are struggling with.
                My teaching has become much more targeted and effective."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-blue-600 font-medium">MIT</span>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img src="/placeholder.svg?height=64&width=64" alt="Teacher" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Mark Smith</h4>
                  <p className="text-gray-500">High School Math Teacher</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "The personalized feedback generation has transformed how my students learn. They get immediate insights
                on their work, and I can focus on providing higher-level guidance. My students' test scores have
                improved by 27% since we started using this platform."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-purple-600 font-medium">Westlake High</span>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              className="bg-white rounded-xl p-8 shadow-xl border border-gray-100"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mr-4 overflow-hidden">
                  <img src="/placeholder.svg?height=64&width=64" alt="Student" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-xl text-gray-900">Alex Johnson</h4>
                  <p className="text-gray-500">Computer Science Student</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                "The AI chatbot has been like having a personal tutor available 24/7. I can ask questions about my
                assignments and get immediate help. I've gone from a C to an A- in my programming class since I started
                using this platform."
              </p>
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-green-600 font-medium">UC Berkeley</span>
              </div>
            </motion.div>
          </div>

          {/* Video testimonial */}
          <motion.div
            className="mt-20 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
            variants={fadeInUpVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
                  Featured Success Story
                </div>
                <h3 className="text-3xl font-bold mb-6 text-gray-900">How EduLearn AI Transformed Our University</h3>
                <p className="text-gray-600 text-lg mb-6">
                  "After implementing EduLearn AI across our computer science department, we saw a 35% increase in
                  student engagement and a 28% improvement in course completion rates."
                </p>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img src="/placeholder.svg?height=48&width=48" alt="Dean" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Dr. Michael Chen</h4>
                    <p className="text-gray-600">Dean of Computer Science, Tech University</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Watch Full Interview
                </button>
              </div>

              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-lg relative">
                  <img
                    src="/placeholder.svg?height=360&width=640"
                    alt="Video thumbnail"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer transform transition-transform hover:scale-110">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" ref={pricingRef} className="py-24 bg-gray-50 relative z-10">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white to-gray-50"></div>
        <motion.div
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-20" variants={fadeInUpVariants}>
            <div className="inline-block px-3 py-1 bg-blue-100 rounded-full text-blue-600 text-sm font-medium mb-4">
              Simple Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">Choose Your Learning Plan</h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Flexible plans designed to fit your educational needs, with no hidden fees or complicated tiers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-xl overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Basic</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">Free</span>
                  <span className="text-gray-500 ml-2">forever</span>
                </div>
                <p className="text-gray-600 text-lg mb-6">
                  Perfect for individual students getting started with AI learning.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic AI assessment tools
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Limited AI tutor questions (10/day)
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Basic progress tracking
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center text-gray-400">
                    <svg className="h-5 w-5 text-gray-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Personalized learning paths
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="block w-full py-3 px-6 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-blue-500 transform scale-105 z-10"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">MOST POPULAR</div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Pro</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">$19</span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600 text-lg mb-6">
                  Ideal for serious students and educators seeking advanced features.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Full AI assessment suite
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited AI tutor access
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics dashboard
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized learning paths
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="block w-full py-3 px-6 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              className="bg-white rounded-xl shadow-xl overflow-hidden"
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900">Enterprise</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">Custom</span>
                </div>
                <p className="text-gray-600 text-lg mb-6">
                  For schools and institutions needing custom solutions at scale.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Everything in Pro plan
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom LMS integrations
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Custom AI model training
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="h-5 w-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    White-labeling options
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="block w-full py-3 px-6 text-center bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6">
              {[
                {
                  question: "How does the AI tutoring work?",
                  answer:
                    "Our AI tutoring system uses advanced natural language processing to understand your questions and provide personalized explanations. It adapts to your learning style and can break down complex concepts into simpler terms, provide step-by-step guidance, and offer additional resources when needed.",
                },
                {
                  question: "Can I switch between plans?",
                  answer:
                    "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll immediately gain access to all the new features. If you downgrade, you'll continue to have access to your current plan until the end of your billing cycle.",
                },
                {
                  question: "Is there a discount for educational institutions?",
                  answer:
                    "Yes, we offer special pricing for schools, colleges, and universities. Please contact our sales team for more information about our educational discounts and volume licensing options.",
                },
                {
                  question: "How secure is my data?",
                  answer:
                    "We take data security very seriously. All data is encrypted both in transit and at rest. We comply with FERPA, GDPR, and other educational privacy regulations. We never share or sell your data to third parties, and you maintain ownership of all your content.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                  variants={cardVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <h4 className="text-xl font-semibold mb-3 text-gray-900">{faq.question}</h4>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white relative z-10">
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto px-4 text-center relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium mb-6">
            Start Your Learning Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 drop-shadow-md">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of educators and students who are already using our AI-powered learning platform to achieve
            better results with less effort.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium hover:bg-opacity-95 transition-all shadow-xl hover:shadow-2xl text-center block"
              >
                Get Started for Free
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/demo"
                className="px-8 py-4 border-2 border-white/50 text-white rounded-xl font-medium hover:bg-white/10 transition-all text-center block"
              >
                Request Demo
              </Link>
            </motion.div>
          </div>

          {/* Trust badges */}
          <div className="mt-16">
            <p className="text-white/70 mb-6">Trusted by leading educational institutions</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
              {[1, 2, 3, 4, 5].map((badge) => (
                <div key={badge} className="h-12">
                  <div className="h-full w-32 bg-white/20 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 mr-2 text-blue-400"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                </svg>
                <span className="font-bold text-xl">EduLearn AI</span>
              </div>
              <p className="text-gray-400 mb-6">
                Revolutionizing education with AI-powered tools that save time for educators and enhance learning
                experiences for students.
              </p>
              <div className="flex space-x-4">
                {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Platform</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Use Cases
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© {new Date().getFullYear()} EduLearn AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default HomePage

