import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Layout from "../layouts/Layout"
import Quotes from "../components/Quotes"
// import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const AboutPage = ({ data }) => {
  const experience = (new Date()).getFullYear() - (new Date(2013,11,21)).getFullYear();
  return (<Layout>
    <SiteMetadata title="About" description="Sample description" />

    <div className="bg-gray-100">
      <div className="container py-12 lg:pb-16">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About me
            </h1>
            <br />
            <h2 className="text-xl leading-tight font-semibold tracking-tight text-green-500 sm:text-2xl">
              non nobis, sed omnibus | not for us, but for everyone
            </h2>
            <div className="mt-4 leading-loose">
              <p>
                I'm <strong>Kranthi Lakum</strong>, a software developer based in Hyderabad, India.
                I have {experience} years of experience in developing software applications for the Web and Mobile platforms in
                Big-Data, E-business, Insurance, Health-care, and Telecommunication business domains.
              </p>
              <p>
              I mainly work with Java, Scala, Python, JavaScript, and TypeScript languages.
              You can always reach me out at my email. I am always open to new challenges and opportunities!
              </p>
              I'm happy to hear from you. You can reach me out at my&nbsp;
              <a
                href={"mailto:" + data.author.email}
                className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
              >
                E-mail
              </a> or <a
                className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
                href="https://www.linkedin.com/in/kranthilakum/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
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
)}

export default AboutPage

export const query = graphql`
  query {
    author: contentfulPerson {
      email,
      quotes: childrenContentfulPersonQuotesJsonNode {
        id
        quote
      },
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
