import * as commander from 'commander'
import chalk from 'chalk'
import * as ejs from "ejs"
import * as util from "util"
import * as fs from "fs"

const renderFile = util.promisify(ejs.renderFile)

interface Params {
    source: string,
    output: string
}

commander
  .version('0.0.0', '-v, --version')
  .option('-s, --source <path>', 'the source ejs file')
  .option('-j, --jsonstr <jsonstr>', 'json string of data to fill the ejs file')
  .option('-o, --output <path>', 'output path')
  .parse(process.argv)

if (!commander.source || !commander.output) {
  console.log(
    chalk.redBright(
      'ERROR: the arguments "--source" and "--output" are required.\n'
    )
  )
  commander.outputHelp()
}

(async function main (params: Params) {
  const result = await renderFile(params.source)
  fs.writeFileSync(params.output, result, { encoding: "utf-8"})
})({
    source: commander.source,
    output: commander.output
})
.then(() => {
    console.log(chalk.greenBright("done!"))
})
.catch((e: Error) => {
  console.log(e.message)
  console.log(e.stack)
  console.log(chalk.redBright("error occured."))
})
