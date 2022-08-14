import React from "react"
import PropTypes from "prop-types"
import Swiper from "react-id-swiper"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import 'swiper/css'
import "./Carousel.css"

export const Carousel = ({ images }) => {
  const swiperParams = {
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }
  return (
    <Swiper {...swiperParams}>
      {images.map(image => {
        const imageProp = getImage(image.localFile.childImageSharp)
        return (
          <div key={`slide_${image.id}`}>
            <GatsbyImage image={imageProp} alt={image.title} />
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
