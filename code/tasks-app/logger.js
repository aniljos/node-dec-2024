import chalk from "chalk";

export function logInfo(message){

    console.log(chalk.blue(message));
}

export function logSuccess(message){

    console.log(chalk.greenBright(message));
}

export function logError(message){

    console.log(chalk.redBright(message));
}

export function logHighlight(message){

    console.log(chalk.inverse.yellow(message));
}