import PropTypes from "prop-types"
import React from "react"
import "typeface-inter"
import "../styles/style.css"
import Footer from "../components/Footer"
import Header from "../components/Header"

const Layout = ({ children, isHome = false }) => {
  return (
    <>
      <Header isHome={isHome} />
      {children}

      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isHome: PropTypes.bool,
}

export default Layout
