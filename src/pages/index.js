import { graphql } from "gatsby"
import React from "react"
import Cards from "../components/Cards"
import Hero from "../components/Hero"
import Layout from "../layouts/Layout"
import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const IndexPage = ({ data }) => {
  const cardData = [data.blog.nodes, data.portfolio.nodes]
  return (
    <Layout>
      <SiteMetadata title="Home" description="Blog and Portfolio of Kranthi Lakum" />

      <Hero data={data.hero.nodes} />

      <div className="bg-gray-100 py-12 lg:py-16">
        {cardData && cardData.map((item, index) =>
          item && item.length > 0 ? (
            <Cards key={index} items={item} />
          ) : (
            <div className="container">No posts found.</div>
          )
        )}
      </div>
      <Newsletter />
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
    blog: allContentfulBlogPost(filter: {publishDate: {gte: "2020-01-01"}}) {
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
