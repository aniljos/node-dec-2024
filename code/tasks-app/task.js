export class Task{

    constructor(taskName, description){
        this.taskName = taskName;
        this.description = description;
        this.createdDate = new Date()
    }

    show(){
        console.log(`TaskName: ${this.taskName}, Description: ${this.description}, Created Date: ${this.createdDate}`)
    }
}