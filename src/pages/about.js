import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Layout from "../layouts/Layout"
import Hero from "../components/Hero"
import Quotes from "../components/Quotes"
// import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const AboutPage = ({ data }) => {
  const experience =
    new Date().getFullYear() - new Date(2013, 11, 21).getFullYear()
  return (
    <Layout>
      <SiteMetadata title="About" description="Sample description" />
      <Hero data={data.author} />
      <div className="bg-gray-100">
        <div className="container py-12 lg:pb-16">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
              <div className="mt-4 leading-loose">
                <p>
                  I am a software developer living in Hyderabad, India. I have{" "}
                  {experience} years of experience in developing software and
                  web applications in Big-Data, E-commerce, Insurance, and
                  Telecommunication business domains.
                </p>
                <p>
                  I work mainly with JavaScript, TypeScript, Angular, React,
                  Vue.js, Node.js, and Python. You can always reach me out at my
                  email. I am always open to new challenges and opportunities!
                </p>
                I'm happy to hear from you. You can reach me out at my&nbsp;
                <a
                  href={"mailto:" + data.author.email}
                  className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
                >
                  E-mail
                </a>{" "}
                or{" "}
                <a
                  className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
                  href="https://www.linkedin.com/in/kranthilakum/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <br />
                <br />
                <div>
                  <strong>Favorite Quotes</strong>
                  <Quotes data={data.author.quotes} />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 xl:w-2/5 md:pl-12">
              <Img
                fluid={data.author.image.localFile.childImageSharp.fluid}
                alt="Kranthi Lakum"
                className="rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Newsletter /> */}
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query {
    author: contentfulPerson {
      name
      email
      quotes: childrenContentfulPersonQuotesJsonNode {
        id
        quote
      }
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 600, maxHeight: 480, quality: 85) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
