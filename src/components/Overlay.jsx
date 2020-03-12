import { motion } from "framer-motion"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { FaTimes } from "react-icons/fa"

const backgroundVariants = {
  closed: {
    opacity: 0,
    transitionEnd: { display: "none" },
  },
  open: {
    bottom: 0,
    display: "block",
    left: 0,
    opacity: 1,
    right: 0,
    top: 0,
  },
}

const closeButtonVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.75,
      duration: 0.5,
    },
  },
}

const childrenVariants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.25,
    },
  },
}

function Overlay({ children, isOpen, setIsOpen }) {
  function closeOnEscapeKey(event) {
    if (event.keyCode === 27 && isOpen) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", closeOnEscapeKey)
    return () => {
      window.removeEventListener("keydown", closeOnEscapeKey)
    }
  })

  useEffect(() => {
    document
      .querySelectorAll("body, html")
      .forEach(e => e.classList[isOpen ? "add" : "remove"]("overflow-hidden"))
  }, [isOpen])

  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      className="fixed z-50 block bg-gray-900 text-white"
      initial="closed"
      variants={backgroundVariants}
    >
      <div className="flex flex-col h-full max-h-full">
        <div className="fixed top-0 right-0 mt-4 mr-4">
          <motion.button
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            variants={closeButtonVariants}
            className="text-white focus:outline-none select-none highlight-none"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes className="h-8 w-auto fill-current" />
          </motion.button>
        </div>
        <motion.div
          className="flex flex-grow overflow-hidden"
          animate={isOpen ? "open" : "closed"}
          variants={childrenVariants}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  )
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

export default Overlay
