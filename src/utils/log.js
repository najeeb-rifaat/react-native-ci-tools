const chalk = require('chalk');

module.exports = (loggerStream) => {
    return {
        info: (infoMessage) => {
            loggerStream(chalk.italic.grey(`${infoMessage}`));
        },
        sucess: (sucessMessage) => {
            loggerStream(chalk.bold.green(`${sucessMessage}`));
        },
        error: (errorMessage) => {
            loggerStream(chalk.bold.red(`${errorMessage}`));
        }
    }
};
