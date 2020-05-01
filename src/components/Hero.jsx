import React from "react"

const Hero = ({data}) => {
  const author = data[0];
  return (
    <div className="container py-12 lg:pb-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
        Hello, I'm {author.name}
        <span role="img" aria-label="technologist">
          &nbsp;👨🏻‍💻
        </span>
        <br />
        <span className="text-green-500">
          Welcome to my website.
        </span>
      </h2>
    </div>
  )
}

export default Hero
