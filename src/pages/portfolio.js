import { graphql } from "gatsby"
import React from "react"
import WorldMap from "../components/world-map/WorldMap"
import Cards from "../components/Cards"
import Layout from "../layouts/Layout"
import Newsletter from "../components/Newsletter"
import SiteMetadata from "../components/SiteMetadata"

const PortfolioPage = ({ data }) => {
  return (
    <Layout>
      <SiteMetadata title="Porfolio" description="Portfolio of Kranthi Lakum" />

      <div className="bg-gray-100 py-12 lg:py-16">
        {data.portfolio && data.portfolio.nodes.length > 0 ? (
          <Cards items={data.portfolio.nodes} />
        ) : (
          <div className="container">No projects found.</div>
        )}
      </div>

      <hr />

      <div className="bg-gray-100">
        <WorldMap />
      </div>

      <Newsletter />
    </Layout>
  )
}

export default PortfolioPage

export const query = graphql`
  query PortfolioQuery {
    portfolio: allContentfulPortfolio {
      nodes {
        ...PortfolioCard
      }
    }
  }
`
