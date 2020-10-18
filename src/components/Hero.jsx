import React from "react"

const Hero = ({data}) => {
  const author = data[0];
  return (
    <div className="container py-12 lg:pb-16">
      <h1 data-cy="author" className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
        Hello, I'm {author.name}
        <span role="img" aria-label="technologist">
          &nbsp;👨🏻‍💻
        </span>
        <br />
        <span data-cy="greet" className="text-green-500">
          Welcome to my website.
        </span>
      </h1>
    </div>
  )
}

export default Hero
