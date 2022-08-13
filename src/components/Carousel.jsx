import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"
import { GatsbyImage } from "gatsby-plugin-image"

// import "swiper/css/swiper.css"
import "./Carousel.css"

export const Carousel = ({ images }) => {
  // image.localFile.childImageSharp.fluid
  const swiperParams = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
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
            <GatsbyImage alt={image.title} />
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
