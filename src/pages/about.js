import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import Layout from "../layouts/Layout"
import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const AboutPage = ({ data }) => (
  <Layout>
    <SiteMetadata title="About" description="Sample description" />

    <div className="bg-gray-100">
      <div className="container py-12 lg:pb-16">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2 xl:w-3/5 pb-8 md:pb-0">
            <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              About me
            </h1>
            <h2 className="text-xl leading-tight font-semibold tracking-tight text-blue-600 sm:text-2xl">
              non nobis, sed omnibus | not for us, but for everyone
            </h2>
            <div className="mt-4 leading-loose">
              <p>
                <strong>Kranthi Lakum</strong> is a software developer based in Hyderabad, India.
                He works as a full-time software engineer for a Finnish Telecom software provider.
                He has experience in designing and developing software applications for the Web and Mobile platforms in
                Big-Data, E-business, Insurance, Health-care, and Telecommunication business domains. He mainly works with application development involving Java, Scala, Python, and JavaScript languages.
                You can always reach him out at his email or any of the social networks. He is always open to new challenges and opportunities!
              </p>
              <br />
              <div>
                  <strong>Favorite Quotes</strong>
                  <blockquote>
                      If you are not willing to learn, no one can help you.
                      If you are determined to learn, no one can stop you.
                  </blockquote>
                  <blockquote>
                      Nothing stops you from being distinctive.
                      The only one who stops you is yourself.
                      Everything is within you.
                  </blockquote>
                  <blockquote>Nothing is over until you stop trying.</blockquote>
              </div>
              <br />
              I'm happy to hear from you. Reach me at my&nbsp;
              <a
                href={"mailto:" + data.author.email}
                className="border-b border-gray-500 hover:border-blue-600 hover:text-blue-600"
              >
                E-mail
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 xl:w-2/5 md:pl-12">
            <Img
              fluid={data.authorImage.childImageSharp.fluid}
              alt="John Doe"
              className="rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
    <Newsletter />
  </Layout>
)

export default AboutPage

export const query = graphql`
  query {
    author: contentfulPerson {
      email
    }
    authorImage: file(relativePath: { eq: "author.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 600, maxHeight: 480, quality: 85) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
