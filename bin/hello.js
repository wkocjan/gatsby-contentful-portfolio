const chalk = require("chalk")
const pkg = require("../package.json")

console.log(`

${chalk.green("Hey there! 👋")}

Thanks for giving the ${pkg.name} a try. 🎉
To get you going really quickly this project includes a setup step.

${chalk.yellow.bold("npm run setup")} automates the following steps for you:
  - creates a config file ${chalk.yellow(".env")}
  - imports ${chalk.green("a predefined content model")}

When this is done run:

${chalk.yellow(
  "gatsby develop"
)} to start a development environment at ${chalk.green("localhost:8000")}

or

${chalk.yellow(
  "gatsby build"
)} to create a production ready static site in ${chalk.green("./public")}

`)
