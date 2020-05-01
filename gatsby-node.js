const path = require(`path`)

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type contentfulPortfolioDescriptionTextNode implements Node {
      description: String
    }
    type ContentfulPortfolio implements Node {
      description: contentfulPortfolioDescriptionTextNode
      gallery: [ContentfulAsset]
      id: ID!
      name: String!
      related: [ContentfulPortfolio]
      slug: String!
      summary: String!
      thumbnail: ContentfulAsset
      url: String,
      category: String!
    }
    type contentfulBlogPostBodyTextNode implements Node {
      body: String
    }
    type ContentfulBlogPost implements Node {
      id: ID!
      name: String!
      description: contentfulBlogPostDescriptionTextNode
      title: String
      body: contentfulBlogPostBodyTextNode
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
        const portfolioTemplate = path.resolve("./src/templates/portfolio-item.jsx")
        const blogTemplate = path.resolve("./src/templates/blog-post.jsx")
        data.portfolio.nodes.map(({ slug }) => {
          createPage({
            path: `/portfolio/${slug}`,
            component: portfolioTemplate,
            context: { slug },
          })
        })
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
