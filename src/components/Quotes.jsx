import React from 'react'

const Quote = () => (
  <blockquote className="relative p-4 text-xl italic border-l-4 bg-neutral-100 text-neutral-600 border-neutral-500 quote">
    <div className="stylistic-quote-mark" aria-hidden="true">
      &ldquo;
    </div>
    <p className="mb-4">"I trust him."</p>
    <cite className="flex items-center">
      <img
        alt="Avatar of nickd"
        className="w-12 mr-4 rounded-full bg-neutral-500"
        src="..."
      />
      <div className="flex flex-col items-start">
        <span className="mb-1 text-sm italic font-bold">nickd</span>
        <a
          href="..."
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm"
        >
          Draft
        </a>
      </div>
    </cite>
  </blockquote>
)
