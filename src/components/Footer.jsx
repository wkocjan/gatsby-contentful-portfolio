import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa"

const Footer = () => {
  const {
    site: {
      meta: { links },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        meta: siteMetadata {
          links {
            facebook
            instagram
            pinterest
            twitter
          }
        }
      }
    }
  `)

  return (
    <div className="container py-12 md:flex md:items-center md:justify-between">
      <ul className="flex justify-center md:order-2">
        <FooterLink href={links.twitter} icon={FaTwitter} label="Twitter" />
        <FooterLink href={links.facebook} icon={FaFacebook} label="Facebook" />
        <FooterLink
          href={links.instagram}
          icon={FaInstagram}
          label="Instagram"
        />
        <FooterLink
          href={links.pinterest}
          icon={FaPinterest}
          label="Pinterest"
        />
      </ul>
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-sm md:text-base text-gray-700">
          &copy; 2020 John Doe. All rights reserved.
        </p>
      </div>
    </div>
  )
}

const FooterLink = ({ href, label, icon: Icon }) => {
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

export default Footer
