const chalk = require('chalk');

module.exports = {
    info: (infoMessage) => {
        console.log(chalk.italic.grey(`${nestedPadding} ${infoMessage}`));
    },
    sucess: (sucessMessage) => {
        console.log(chalk.bold.green(`${nestedPadding}${nestedPadding} ${sucessMessage}`));
    },
    error: (errorMessage) => {
        console.log(chalk.bold.red(`${nestedPadding}${nestedPadding} ${errorMessage}`));
    }
};
