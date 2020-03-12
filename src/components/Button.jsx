import PropTypes from "prop-types"
import React from "react"

const Button = ({ children, href, ...params }) => {
  const className =
    "inline-block px-5 py-3 font-medium leading-snug border border-transparent text-base rounded-md text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button className={className} {...params}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
}

Button.defaultProps = {
  href: null,
}

export default Button
