import { graphql } from "gatsby"
import React from "react"
import Cards from "../components/Cards"
import Layout from "../layouts/Layout"
import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <SiteMetadata title="Blog" description="Blog of Kranthi Lakum" />

      <div className="bg-gray-100 py-12 lg:py-16">
        {data.blog && data.blog.nodes.length > 0 ? (
          <Cards items={data.blog.nodes} />
        ) : (
          <div className="container">No articles found.</div>
        )}
      </div>
      <Newsletter />
    </Layout>
  )
}

export default BlogPage

export const query = graphql`
  query BlogQuery {
    blog: allContentfulBlogPost(sort: {fields: [publishDate], order: DESC}) {
      nodes {
        id
        category
        name: title
        tags
        summary
        description {
          description
        }
        publishDate
        slug
        thumbnail: heroImage {
          localFile {
            childImageSharp {
              fluid(maxWidth: 444, maxHeight: 342, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
