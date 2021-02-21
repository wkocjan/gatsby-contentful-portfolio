const spaceImport = require("contentful-import")
const exportFile = require("../contentful/export.json")
const inquirer = require("inquirer")
const chalk = require("chalk")
const path = require("path")
const { writeFileSync } = require("fs")

const argv = require("yargs-parser")(process.argv.slice(2))

console.log(`
  To set up this project you need to provide your Space ID
  and the belonging API access tokens.

  You can find all the needed information in your Contentful space under:

  ${chalk.yellow(
    `app.contentful.com ${chalk.red("->")} Space Settings ${chalk.red(
      "->"
    )} API keys`
  )}

  The ${chalk.green("Content Management API Token")}
    will be used to import and write data to your space.

  The ${chalk.green("Content Delivery API Token")}
    will be used to ship published production-ready content in your Gatsby app.

  Ready? Let's do it! 🎉
`)

const questions = [
  {
    name: "spaceId",
    message: "Your Space ID",
    when: !argv.spaceId && !process.env.CONTENTFUL_SPACE_ID,
    validate: input =>
      /^[a-z0-9]{12}$/.test(input) ||
      "Space ID must be 12 lowercase characters",
  },
  {
    name: "managementToken",
    when: !argv.managementToken,
    message: "Your Content Management API access token",
  },
  {
    name: "accessToken",
    when: !argv.accessToken && !process.env.CONTENTFUL_ACCESS_TOKEN,
    message: "Your Content Delivery API access token",
  },
]

inquirer
  .prompt(questions)
  .then(({ spaceId, managementToken, accessToken }) => {
    const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

    // env vars are given precedence followed by args provided to the setup
    // followed by input given to prompts displayed by the setup script
    spaceId = CONTENTFUL_SPACE_ID || argv.spaceId || spaceId
    managementToken = argv.managementToken || managementToken
    accessToken = CONTENTFUL_ACCESS_TOKEN || argv.accessToken || accessToken

    console.log("Writing config file...")
    const configFiles = [`.env`].map(file => path.join(__dirname, "..", file))

    const fileContents =
      [
        `# Do NOT commit this file to source control`,
        `CONTENTFUL_SPACE_ID='${spaceId}'`,
        `CONTENTFUL_ACCESS_TOKEN='${accessToken}'`,
        ``,
        `# https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/?=mailchimp#mailchimp-endpoint`,
        `MAILCHIMP_ENDPOINT='https://example.us10.list-manage.com/subscribe/post?u=123'`,
      ].join("\n") + "\n"

    configFiles.forEach(file => {
      writeFileSync(file, fileContents, "utf8")
      console.log(`Config file ${chalk.yellow(file)} written`)
    })
    return { spaceId, managementToken }
  })
  .then(({ spaceId, managementToken }) => {
    spaceImport({ spaceId, managementToken, content: exportFile })
  })
  .catch(error => console.error(error))
