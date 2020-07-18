import React from "react"
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaGithub,
  FaLinkedin,
  FaFlickr,
  FaStackOverflow} from "react-icons/fa"

const SocialLinks = ({ links }) => {
  return (
    <div>
      <ul className="flex justify-center md:order-2">
        <SocialLink href={links.github} icon={FaGithub} label="Github" />
        <SocialLink href={links.linkedin} icon={FaLinkedin} label="Linkedin" />
        <SocialLink href={links.stackOverflow} icon={FaStackOverflow} label="StackOverflow" />
        <SocialLink href={links.twitter} icon={FaTwitter} label="Twitter" />
        <SocialLink href={links.facebook} icon={FaFacebook} label="Facebook" />
        <SocialLink
          href={links.instagram}
          icon={FaInstagram}
          label="Instagram"
        />
        <SocialLink
          href={links.pinterest}
          icon={FaPinterest}
          label="Pinterest"
        />
        <SocialLink href={links.flickr} icon={FaFlickr} label="Flickr" />
      </ul>
    </div>
  )
}

const SocialLink = ({ href, label, icon: Icon }) => {
  return (
    <li className="inline-block pl-6">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="text-gray-500 hover:text-blue-600 transition duration-150 ease-in-out"
      >
        <span className="sr-only">{label}</span>
        <Icon className="w-5 h-5 fill-current" />
      </a>
    </li>
  )
}

export default SocialLinks
