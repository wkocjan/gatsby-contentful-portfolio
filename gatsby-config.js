require("dotenv").config()

const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  )
}

module.exports = {
  siteMetadata: {
    menu: [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Blog", to: "/blog"},
      { name: "Portfolio", to: "/portfolio"}
    ],
    links: {
      facebook: "https://www.facebook.com/kranthilakum",
      instagram: "https://www.instagram.com/krantlak",
      pinterest: "https://pinterest.com/kranthilakum",
      twitter: "https://twitter.com/krantlak",
      linkedin: "https://www.linkedin.com/in/kranthilakum/",
      github: "https://www.github.com/kranthilakum",
      flickr: "https://www.flickr.com/photos/prince-apple/",
      stackOverflow: "https://stackoverflow.com/users/1509209/kranthi-lakum"
    },
    locale: "en",
    title: `Kranthi Lakum`,
    description: `Blog and personal website of Kranthi Lakum`,
    author: `Kranthi Lakum`,
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: CONTENTFUL_SPACE_ID,
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        downloadLocal: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kranthi Lakum`,
        short_name: `krantlak`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3182ce`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        develop: false,
        printRejected: false,
        rejected: true,
        tailwind: true,
        ignore: ["Carousel.css", "swiper.css"],
      },
    },
    {
      resolve: `gatsby-remark-prismjs`,
      options: {
        classPrefix: "language-",
        inlineCodeMarker: null,
        showLineNumbers: false,
        noInlineHighlight: false,
      }
    }
  ],
}
