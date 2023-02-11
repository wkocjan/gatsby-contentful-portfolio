import React from "react"
import PropTypes from "prop-types"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Card = props => {
  const { id, category, name, slug, summary, thumbnail, tags, hideImage, createdAt, publishDate } = props
  const image = getImage(thumbnail && thumbnail.localFile.childImageSharp)
  const categories = ['blog', 'travelogue']
  return (
    <div className="bg-white h-full shadow-sm rounded-md overflow-hidden group">
      {categories.map(item => {
        return (
          category && category === item && (
            <>
              <Link key={id} to={`/${item}/${slug}`} data-cy={category}>
                {hideImage ? null : (image && <div className="group-hover:opacity-75 transition duration-150 ease-in-out">
                  <GatsbyImage image={image} alt={name} />
                </div>)}
                <div className="p-4 sm:p-5" data-cy={slug}>
                  <h3 className="sm:text-lg text-emerald-600 hover:text-emerald-500 font-semibold">{name}</h3>
                  <p className="text-sm sm:text-base text-gray-700">{summary}</p>
                  { tags && tags.map(tag => (<span class="inline-block bg-emerald-100 rounded-full text-sm font-semibold text-gray-700 px-3 py-1 mr-2 my-2">#{tag}</span>))}
                </div>
              </Link>
            </>
          )
        )
      })}
    </div>
  )
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  summary: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired
  ]),
  thumbnail: PropTypes.shape({
    localFile: PropTypes.object,
  }),
}

export default Card

export const query = graphql`
  fragment PortfolioCard on ContentfulPortfolio {
    id
    category
    name
    slug
    createdAt(formatString: "DD-MM-YYYY")
    thumbnail {
      localFile {
        childImageSharp {
          gatsbyImageData(
            formats: [AUTO, WEBP],
            layout: CONSTRAINED, 
            quality: 85, 
            placeholder: BLURRED
          )
        }
      }
    }
  }
  fragment BlogPostCard on ContentfulBlogPost {
    id
    category
    name: title
    tags
    summary
    publishDate
    slug
    thumbnail: heroImage {
      localFile {
        childImageSharp {
          gatsbyImageData(
            formats: [AUTO, WEBP],
            layout: CONSTRAINED, 
            quality: 85, 
            placeholder: BLURRED
          )
        }
      }
    }
  }
`
