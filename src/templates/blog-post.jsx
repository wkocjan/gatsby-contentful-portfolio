import { graphql } from "gatsby"
import React from "react"
import SiteMetadata from "../components/SiteMetadata"
// import Newsletter from "../components/Newsletter"
import Layout from "../layouts/Layout"

export default props => {
  const {
    title,
    summary,
    description
  } = props.data.item

  return (
    <Layout>
      <SiteMetadata
        title={title}
        description={summary}
      />
      <div className="bg-gray-0 py-12 lg:py-16">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:pl-8 xl:pl-12 text-justify">
              <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-1">
                {title}
              </h1>
              {description && (
                <div className="my-4 text-base text-gray-800 whitespace-pre-line">
                  <article dangerouslySetInnerHTML={{__html: description.childMarkdownRemark.html}}></article>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <Newsletter /> */}
    </Layout>
  )
}

export const query = graphql`
  query BlogItemQuery($slug: String!) {
    item: contentfulBlogPost(slug: { eq: $slug }) {
      title
      summary
      description {
        childMarkdownRemark {
          html
        }
      }
      author {
        name
      }
      publishDate
      tags
    }
  }
`
