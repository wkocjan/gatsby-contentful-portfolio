import React from "react"

const Hero = ({data}) => {
  const author = data;
  return (
    <div className="pb-6 lg:pb-10">
      <h1 data-cy="author" className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900">
        Hello, I'm {author.name}
        <span role="img" aria-label="technologist">
          &nbsp;👨🏻‍💻
        </span>
        <br />
        <span data-cy="greet" className="text-emerald-500">
          Welcome to my website.
        </span>
      </h1>
    </div>
  )
}

export default Hero
