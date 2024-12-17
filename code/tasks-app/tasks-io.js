import { EventEmitter } from "node:events";
import { Task } from "./Task.js";
import fs from 'node:fs';


const fileName = "my-tasks.json";
let allTasks = []; // Arrays of Task(class)

export const ioevent = new EventEmitter();

export function writeTask(task) {


    return new Promise(async (resolve, reject) => {

        //task is an instance of the class Task   
        if (task instanceof Task) {

            try {
                allTasks = await fetchTasks();
            } catch (error) {
                allTasks = [];
            }
            
            allTasks.push(task);
            fs.writeFile(fileName, JSON.stringify(allTasks), (err) => {

                if (err) {
                    //error
                    reject("File save failed " + err)
                    ioevent.emit("writeFailed", `task with name ${task.taskName} failed to save`);

                    return;
                }

                //file written sucsessfully
                resolve();
                ioevent.emit("writeCompleted", `task with name ${task.taskName} saved`);
            });

        }
        else {
            // error
            reject("Invalid task passed")
        }

    })
}

export function fetchTasks() {

    return new Promise((resolve, reject) => {

        fs.readFile(fileName, {encoding: 'utf8'}, (err, contents) => {

            if(err){
                //error
                reject("Failed to read file: " + err)
                ioevent.emit("fetchFailed", "Failed to fetch tasks");
                return;
            }
            allTasks = JSON.parse(contents.toString());
            resolve(allTasks);
            ioevent.emit("fetchCompleted", allTasks);
        });

    })
}

export function removeTask(taskName) {

    return new Promise(async (resolve, reject) => {

        if(taskName){

            try {
            
                allTasks = await fetchTasks();
                const index = allTasks.findIndex(item => item.taskName === taskName);
                if(index === -1){
                    //error -> task not found
                    reject("Task not found");
                    ioevent.emit("removeFailed", "Task not found");
                }
                else{
                    //removes the element from the array
                    allTasks.splice(index, 1);
                    //save the array to the file.
                    fs.writeFile(fileName, JSON.stringify(allTasks), (err) => {
                        if(err){
                            //error
                            reject("Failed to save to file: " +  err)
                            ioevent.emit("removeFailed", "Failed to save to file");
                            return;
                        }
                        resolve();
                        ioevent.emit("removeCompleted", `task with name ${taskName} removed`);
                    })
                }
    
                
            } catch (error) {
                // error
                reject("Falied to remove task: " + error);
                ioevent.emit("removeFailed", "Falied to remove task");
            }
            
        }
        else{
            //error
            reject("No task provided");
            ioevent.emit("removeFailed", "No task provided");
        }

    })

    

}