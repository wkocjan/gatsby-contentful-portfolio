import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import SocialLinks from './SocialLinks';

const Footer = () => {
  const year = (new Date()).getFullYear();
  const {
    site: {
      meta: { author, links },
    },
  } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        meta: siteMetadata {
          author
          links {
            github
            facebook
            instagram
            pinterest
            twitter
            linkedin
            stackOverflow
            flickr
          }
        }
      }
    }
  `)

  return (
    <div className="container py-12 md:flex md:items-center md:justify-between">
      <SocialLinks links={links}></SocialLinks>
      <div className="mt-8 md:mt-0 md:order-1">
        <p className="text-center text-sm md:text-base text-gray-700">
          &copy; {year} {author}. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
