const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type contentfulPortfolioDescriptionTextNode implements Node {
      description: String
    }
    type ContentfulPortfolio implements Node {
      description: contentfulPortfolioDescriptionTextNode
      id: ID!
      name: String!
      related: [ContentfulPortfolio]
      slug: String!
      summary: String!
      url: String,
      category: String!
    }
    type contentfulBlogPostDescriptionTextNode implements Node {
      description: String
      childMarkdownRemark: MarkdownRemark
    }
    type ContentfulBlogPost implements Node {
      id: ID!
      name: String!
      summary: String
      description: contentfulBlogPostDescriptionTextNode
      title: String
      publishDate: Date
      slug: String!
      author: ContentfulPerson
      category: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        portfolio: allContentfulPortfolio {
          nodes {
            slug
          }
        }
        blog: allContentfulBlogPost {
          nodes {
            slug
          }
        }
      }
    `).then(({ errors, data }) => {
      if (errors) {
        reject(errors)
      }

      if (data && data.portfolio) {
        const portfolioTemplate = path.resolve(
          "./src/templates/travelogue-item.jsx"
        )
        data.portfolio.nodes.map(({ slug }) => {
          createPage({
            path: `/travelogue/${slug}`,
            component: portfolioTemplate,
            context: { slug },
          })
        })
      }

      if (data && data.blog) {
        const blogTemplate = path.resolve("./src/templates/blog-post.jsx")
        data.blog.nodes.map(({ slug }) => {
          createPage({
            path: `/blog/${slug}`,
            component: blogTemplate,
            context: { slug },
          })
        })
      }

      resolve()
    })
  })
}

exports.onCreateWebpackConfig = ({ getConfig, stage }) => {
  const config = getConfig()
  if (stage.startsWith("develop") && config.resolve) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom": "@hot-loader/react-dom",
    }
  }
}
