import classNames from "classnames"
import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"
import Button from "../components/Button"

const Newsletter = () => {
  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [disabled, setDisabled] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    setDisabled(true)
    setMessage("Sending...")
    const response = await addToMailchimp(email)
    if (response.result === "error") {
      if (response.msg.toLowerCase().includes("already subscribed")) {
        setMessage("You're already on to the list!")
      } else {
        setMessage("Some error occured while subscribing you to the list.")
      }
      setDisabled(false)
    } else {
      setMessage(
        "Thanks! Please check your e-mail and click the confirmation link."
      )
    }
  }

  return (
    <div className="container py-12 lg:py-16">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
        Sign up for my newsletter
      </h2>
      <form className="mt-8 sm:flex" onSubmit={handleSubmit}>
        <input
          aria-label="Email address"
          className="appearance-none w-full sm:max-w-xs px-5 py-3 border border-gray-400 leading-snug rounded-md text-gray-900 bg-white placeholder-gray-600 focus:outline-none focus:shadow-outline focus:border-blue-300 transition duration-150 ease-in-out"
          onChange={event => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
          type="email"
        />
        <div className="mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0">
          <Button disabled={disabled}>Sign up</Button>
        </div>
      </form>
      <div
        className={classNames("w-full pt-4 text-sm", { "opacity-0": !message })}
      >
        {message}
      </div>
    </div>
  )
}

export default Newsletter
