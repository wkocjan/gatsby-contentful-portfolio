import Img from "gatsby-image"
import PropTypes from "prop-types"
import React from "react"
import Swiper from "react-id-swiper"

import "swiper/css/swiper.css"
import "./Carousel.css"

export const Carousel = ({ images }) => {
  const swiperParams = {
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  }
  return (
    <Swiper {...swiperParams}>
      {images.map(image => {
        return (
          <div key={`slide_${image.id}`}>
            <Img
              fluid={image.localFile.childImageSharp.fluid}
              alt={image.title}
            />
          </div>
        )
      })}
    </Swiper>
  )
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Carousel
