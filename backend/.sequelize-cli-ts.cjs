require("ts-node/register")
require("dotenv").config()
const { execSync } = require("child_process")

const args = process.argv.slice(2).join(" ")
execSync(`npx sequelize-cli ${args}`, { stdio: "inherit" })