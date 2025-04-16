"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

export default function InteractiveController() {
  const [isPressed, setIsPressed] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
    a: false,
    b: false,
  })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleButtonPress = useCallback((button: keyof typeof isPressed) => {
    setIsPressed((prev) => ({ ...prev, [button]: true }))

    // Reset button state after animation
    setTimeout(() => {
      setIsPressed((prev) => ({ ...prev, [button]: false }))
    }, 200)
  }, [])

  return (
    <div className="relative w-[280px] h-[160px] mx-auto my-8">
      {/* Controller base */}
      <div className="absolute inset-0 bg-gray-800 rounded-lg border-2 border-gray-700 shadow-lg"></div>

      {/* D-pad */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
        <div className="relative w-20 h-20">
          {/* Up */}
          <motion.button
            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            animate={{ y: isPressed.up ? 2 : 0 }}
            onClick={() => handleButtonPress("up")}
            aria-label="D-pad up"
          />

          {/* Down */}
          <motion.button
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            animate={{ y: isPressed.down ? -2 : 0 }}
            onClick={() => handleButtonPress("down")}
            aria-label="D-pad down"
          />

          {/* Left */}
          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            animate={{ x: isPressed.left ? 2 : 0 }}
            onClick={() => handleButtonPress("left")}
            aria-label="D-pad left"
          />

          {/* Right */}
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-700 hover:bg-gray-600 border border-gray-600"
            animate={{ x: isPressed.right ? -2 : 0 }}
            onClick={() => handleButtonPress("right")}
            aria-label="D-pad right"
          />

          {/* Center */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-700 border border-gray-600" />
        </div>
      </div>

      {/* A/B buttons */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
        <div className="relative w-20 h-20">
          <motion.button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 border-2 border-red-700 text-white font-bold"
            animate={{ scale: isPressed.a ? 0.9 : 1 }}
            onClick={() => handleButtonPress("a")}
            aria-label="A button"
          >
            A
          </motion.button>

          <motion.button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 border-2 border-blue-700 text-white font-bold"
            animate={{ scale: isPressed.b ? 0.9 : 1 }}
            onClick={() => handleButtonPress("b")}
            aria-label="B button"
          >
            B
          </motion.button>
        </div>
      </div>

      {/* Start/Select buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
        <button
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-sm text-xs text-white"
          aria-label="Select button"
          onClick={() => handleButtonPress("left")} // Reuse existing button press
        >
          SELECT
        </button>
        <button
          className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded-sm text-xs text-white"
          aria-label="Start button"
          onClick={() => handleButtonPress("right")} // Reuse existing button press
        >
          START
        </button>
      </div>
    </div>
  )
}
