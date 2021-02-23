# Portfolio theme for Gatsby

### Gatsby starter theme integrated with [Contentful](https://www.contentful.com)

## Demo

Live demo is available at:
https://gatsby-contentful-portfolio.netlify.com/

## Screenshot

![The home page](screenshot.png?raw=true)

## Who is this for?

- Graphic designers
- Photographers
- Illustrators
- Other creatives

## Features

- Integration with [Contentful](https://www.contentful.com) - automated content model & demo setup
- Responsive/adaptive images via [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/)
- Uses utility-first [TailwindCSS](https://tailwindcss.com/) framework
- Integration with [Mailchimp](https://mailchimp.com/) - newsletter form
- Responsive design (desktop / mobile)

## Getting started

Install [Node package manager (NPM)](https://nodejs.org/) (if you haven't already).

## Requirements

To use this project you have to have a Contentful account. If you don't have one yet you can register at [www.contentful.com/sign-up](https://www.contentful.com/sign-up/).

### Get the source code and install dependencies.

```
$ git clone git@github.com:wkocjan/gatsby-contentful-portfolio.git
$ npm install
```

### Set up of the needed content model and create a configuration file

This project comes with a Contentful setup command `npm run setup`.

This command will ask you for a space ID, and access tokens for the Contentful Management and Delivery API and then import the needed content model into the space you define and write a config file (`.env`).

### Set up Mailchimp

If you want to use built-in integration with Mailchimp, please provide your unique endpoind URL in the `.env` file (`MAILCHIMP_ENDPOINT` variable).

Follow [this instruction](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/?=mailchimp#mailchimp-endpoint) to get the endpoint value.

## Crucial Commands

This project comes with a few handy commands for linting and code fixing. The most important ones are the ones to develop and ship code. You can find the most important commands below.

#### `gatsby develop`

Run in the project locally.

#### `gatsby build`

Run a production build into `./public`. The result is ready to be put on any static hosting you prefer.
