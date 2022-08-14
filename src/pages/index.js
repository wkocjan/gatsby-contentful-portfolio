import { graphql } from "gatsby"
import React from "react"
import Cards from "../components/Cards"
import Layout from "../layouts/Layout"
// import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  const blogNodes = [data.blog.nodes]
  const travelLogNodes = [data.portfolio.nodes]

  return (
    <Layout>
      <SiteMetadata
        title="Home"
        description="Blog and Portfolio of Kranthi Lakum"
      />

      <div className="bg-gray-100 py-12 lg:py-16">
        <div className="pb-6">
          {blogNodes &&
            blogNodes.map((item, index) =>
              item && item.length > 0 ? (
                <Cards key={index} items={item} heading="Latest blog posts" />
              ) : (
                <div className="container">No blog posts found.</div>
              )
            )}
        </div>
        <div className="pt-6">
          {travelLogNodes &&
            travelLogNodes.map((item, index) =>
              item && item.length > 0 ? (
                <Cards key={index} items={item} heading="Recent travel logs" />
              ) : (
                <div className="container">No travel logs found.</div>
              )
            )}
        </div>
      </div>
      {/* <Newsletter /> */}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query HomeQuery {
    portfolio: allContentfulPortfolio {
      nodes {
        ...PortfolioCard
      }
    }
    blog: allContentfulBlogPost(filter: { createdAt: { gte: "2020-03-01" } }) {
      nodes {
        ...BlogPostCard
      }
    }
    hero: allContentfulPerson {
      nodes {
        shortBio {
          shortBio
        }
        name
        email
        github
        facebook
        instagram
        twitter
        company
      }
    }
  }
`
