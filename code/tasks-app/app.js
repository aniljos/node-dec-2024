//import {logError, logHighlight, logInfo, logSuccess} from './logger.js';
import * as chalklogger from './logger.js';
import yargs from 'yargs';
import { Task } from './Task.js';
import { fetchTasks, removeTask, writeTask, ioevent } from './tasks-io.js';
import chalk from 'chalk';

//logHighlight("Tasks Application");
chalklogger.logHighlight("Tasks Application")

// node app.js add --taskName "task1" --descrption "Task One"
// node app.js list
// node app.js remove --taskName "task1"

chalklogger.logInfo("Process Id: " + process.pid);
chalklogger.logInfo("Process Architecture: " + process.arch);

const programArgs = yargs(process.argv).parse();

// console.log("Command: ", programArgs._[2]);

const commandName = programArgs._[2];

ioevent.on("writeCompleted", (message) => {
    console.log(chalk.cyanBright("Write completd " + message));
})
ioevent.on("writeFailed", (message) => {
    console.log(chalk.cyanBright("Write Failed " + message));
})
ioevent.on("fetchFailed", (message) => {
    console.log(chalk.cyanBright("Fetch Failed " + message));
})
ioevent.on("fetchCompleted", (message) => {
    console.log(chalk.cyanBright("Fetch Completd ", message));
})
ioevent.on("removeCompleted", (message) => {
    console.log(chalk.cyanBright("Remove Completd ", message));
})
ioevent.on("removeFailed", (message) => {
    console.log(chalk.cyanBright("Remove Failed ", message));
})



if(commandName === "add"){

    // node app.js add --taskName "task1" --descrption "Task One"
    try {
        const taskName = programArgs.taskName;
        const description = programArgs.description
        const task = new Task(taskName, description);
        await writeTask(task);
        chalklogger.logSuccess("Saved task: " + taskName)
    } catch (error) {
        chalklogger.logError("Failed to save task: " + error);
    }
    
        

}
else if(commandName === "list"){

    chalklogger.logHighlight("Listing all tasks");
    try {
        
        const tasks = await fetchTasks();
        console.log(tasks);

    } catch (error) {
        chalklogger.logError("Failed to read tasks: " + error);
    }

}
else if(commandName === "remove"){
    // node app.js remove --taskName "task1"
    const taskName = programArgs.taskName;
    chalklogger.logHighlight("Removing task: " + taskName);
    try {
        await removeTask(taskName);
        chalklogger.logSuccess("Task removes successfully");
    } catch (error) {
        chalklogger.logError("Failed to remove task " + error)
    }
}
else{
    chalklogger.logError("Invalid command");
}
