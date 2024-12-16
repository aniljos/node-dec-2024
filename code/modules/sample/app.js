console.log("in the sample app");
const util = require('./util');
//const chalk = require('chalk');


import('chalk')
    .then(chalkModule => {

        const chalk = chalkModule.default;
        console.log(chalk.blue('Sample Application'));

        const formattedDate = util.formatDate(new Date());
        util.writeToFile("sample.txt", "This is a sample file created on " + formattedDate);


        const fileContents = util.readFile("sample.txt");

        console.log(chalk.inverse.yellow( "file contents: ", fileContents));

    })




