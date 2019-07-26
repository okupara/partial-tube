"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const chalk_1 = require("chalk");
const ejs = require("ejs");
const util = require("util");
const fs = require("fs");
const renderFile = util.promisify(ejs.renderFile);
commander
    .version('0.0.0', '-v, --version')
    .option('-s, --source <path>', 'the source ejs file')
    .option('-j, --jsonstr <jsonstr>', 'json string of data to fill the ejs file')
    .option('-o, --output <path>', 'output path')
    .parse(process.argv);
if (!commander.source || !commander.output) {
    console.log(chalk_1.default.redBright('ERROR: the arguments "--source" and "--output" are required.\n'));
    commander.outputHelp();
}
(async function main(params) {
    const result = await renderFile(params.source);
    fs.writeFileSync(params.output, result, { encoding: "utf-8" });
})({
    source: commander.source,
    output: commander.output
})
    .then(() => {
    console.log(chalk_1.default.greenBright("done!"));
})
    .catch((e) => {
    console.log(e.message);
    console.log(e.stack);
    console.log(chalk_1.default.redBright("error occured."));
});
