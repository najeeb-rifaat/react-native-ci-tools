const chalk = require('chalk');

const info = chalk.bold.grey;
const sucess = chalk.bold.green;
const error = chalk.bold.red;

const nestedPadding = '     ';

const InfoLog = (infoMessage) => {
    console.log(info(`${nestedPadding} ${infoMessage}`));
}

const SucessLog = (sucessMessage) => {
    console.log(sucess(`${nestedPadding}${nestedPadding} ${sucessMessage}`));
}

const ErrorLog = (errorMessage) => {
    console.log(error(`${nestedPadding}${nestedPadding} ${errorMessage}`));
}

module.exports = {
    info: InfoLog,
    sucess: SucessLog,
    error: ErrorLog
};
