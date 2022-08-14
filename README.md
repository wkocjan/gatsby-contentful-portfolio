# Blog and Portfolio website

[![Netlify Status](https://api.netlify.com/api/v1/badges/5db30996-3abd-4a1f-bfbf-8c100e86dbbb/deploy-status)](https://app.netlify.com/sites/kranthilakum/deploys)

## Screenshot

![The home page](screenshot.png?raw=true)

### Gatsby v3 integrated with [Contentful](https://www.contentful.com)

[![Gatsby](https://img.shields.io/badge/🌐-Gatsby-%23542c85)](https://gatsbyjs.com)
[![Reactjs](https://img.shields.io/badge/🌐-ReactJs-%2361dafb)](https://www.reactjs.org)
[![Netlify](https://img.shields.io/badge/🌐-Netlify-teal)](https://www.netlify.com)
[![Contentful](https://img.shields.io/badge/🌐-Contentful-%23306bc4)](https://www.contentful.com)
[![Mailchimp](https://img.shields.io/badge/🌐-Mailchimp-%23004e56)](https://mailchimp.com)
[![Docker](https://img.shields.io/badge/🌐-Docker-blue)](https://www.docker.com)

## Demo

The website is live at: https://www.lakum.in

## Features

- Integration with [Contentful](https://www.contentful.com) - automated content model & demo setup
- Responsive/adaptive images via [gatsby-plugin-image](https://www.gatsbyjs.org/packages/gatsby-plugin-image/)
- Uses utility-first [TailwindCSS](https://tailwindcss.com/) framework
- Integration with [Mailchimp](https://mailchimp.com/) - newsletter form
- Responsive design (desktop / mobile)

## Getting started

Install [Node package manager (NPM)](https://nodejs.org/) (if you haven't already).

## Requirements

To use this project you have to have a Contentful account. If you don't have one yet you can register at [www.contentful.com/sign-up](https://www.contentful.com/sign-up/).

### Forked from

```
$ git clone git@github.com:wkocjan/gatsby-contentful-portfolio.git
$ npm install
```

### Set up of the needed content model and create a configuration file

This project comes with a Contentful setup command `npm run setup`.

This command will ask you for a space ID, and access tokens for the Contentful Management and Delivery API and then import the needed content model into the space you define and write a config file (`.env`).

This command uses content from `export.json` to bootstrap your portfolio with test data. To use your blog content from Contentful, export the data as JSON to `contentful` folder. Update the import statement in the `setup.js` file and run `npm run setup` command.

### Set up Mailchimp

If you want to use built-in integration with Mailchimp, please provide your unique endpoind URL in the `.env` file (`MAILCHIMP_ENDPOINT` variable).

Follow [this instruction](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/?=mailchimp#mailchimp-endpoint) to get the endpoint value.

## Crucial Commands

This project comes with a few handy commands for linting and code fixing. The most important ones are the ones to develop and ship code. You can find the most important commands below.

#### `gatsby develop`

Run in the project locally.

#### `gatsby build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.

Look at `package.json` for additional commands.

## Contentful CLI

After initial login, the CLI stores your managementToken in `~/.contentfulrc.json`

**List all spaces of a Contentful space**

`contentful space list`

**List all content-types of a Contentful space**

`contentful content-type --space-id SPACE_ID list`

**Export a Contentful space**

`contentful space export --space-id SPACE_ID`

## Netlify CLI

After initial authorization, the CLI stores auth token in `~/.netlify/config.json`

**Netlify command**
- `netlify init` - to initialize netlify setup
- `netlify open:admin` - open Netlify admin site
- `netlify open:site` - open deployed site
- `netlify deploy` - trigger a deploy on Netlify

## Dockerize
```bash
docker build . -t g-portfolio:1.0.0

docker run -d -p 8000:8000 --name g-portfolio g-portfolio:1.0.0
```
OR
```bash
# Build images before starting containers.
docker-compose up --build

# Run built image in a container
docker-compose up

# Stops and removes container
docker-compose down
```

## Troubleshooted Issues

**[Issue #17173](https://github.com/gatsbyjs/gatsby/issues/17173)**: Unable to find plugin "gatsby-plugin-sharp"

- Remove node_modules. Remove package-lock.json
- `yarn upgrade --latest && gatsby clean`
- Use yarn instead of npm `yarn Install`
- `yarn run build`

**[Issue 19108](https://github.com/gatsbyjs/gatsby/issues/19108)**: Generating JavaScript bundles failed on Gatsby v2.17+

- delete your .cache and public folder and try again. If that doesn't work delete your package-lock.json or yarn.lock and node_modules and try a npm install again.

**[Issue #3432](https://github.com/gatsbyjs/gatsby/issues/3432)** - Error: Module not found: Error: Cannot resolve module 'react-helmet'

Install `react-helmet` and `gatsby-plugin-react-helmet@latest`

**[Issue #2088](https://github.com/gatsbyjs/gatsby/issues/2088)** - How to use childMarkdownRemark

Install `gatsby-transformer-remark` as a dependency.

**[Issue #1227](https://github.com/gaearon/react-hot-loader/issues/1227)** - React-Hot-Loader: react-🔥-dom patch is not detected. React 16.6+ features may not work.

In package.json file, replace `react-dom` inside dependencies with `@hot-loader/react-dom`

## Links
- [MethodDraw SVG Editor](https://editor.method.ac/)
- [Adobe Color](https://color.adobe.com/create)
- [Netlify](https://netlify.com/)
- [Contentful](https://www.contentful.com)
- [Gatsby](https://www.gatsbyjs.org/)
- [React-Id-Swiper](https://react-id-swiper.ashernguyen.site/)
