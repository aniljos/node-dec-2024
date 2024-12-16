const fs = require('node:fs');
const moment = require('moment');

// contain some helper functions for demo.

//write some contents to a file
function writeToFile(fileName, contents){

    try {
        
        fs.writeFileSync(fileName, contents);
        console.log("writeToFile completed");

    } catch (error) {
        console.log("writeToFile failed", error);
    }
}

//read from a file
function readFile(fileName){

    try {
        
        const contents = fs.readFileSync(fileName);
        return contents.toString();

    } catch (error) {
        console.log("readFile failed", error);
    }
}


// format a date
function formatDate(date){
    return moment(date).format("[Today is] dddd YYYY-MM-DD");
}

module.exports = {
    writeToFile, readFile, formatDate
}