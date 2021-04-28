const Task = require('./task');

function create() {

    let tasks = [];
    let id = 0;

    this.add = function(text, done) {
        let task = new Task.create(id++, text, done);
        tasks.push(task);
    }

    this.get = function(id) {
        let index = findIndex(id);

        if(index === -1)
            return;
        
        return convert(tasks[index]);
    }

    this.getAll = function() {
        let simpleTasks = [];
        for(let i = 0; i < tasks.length; i++) {
            simpleTasks.push(convert(tasks[i]));
        }
        return simpleTasks;
    }

    this.remove = function(id) {
        let index = findIndex(id);
        if(index === -1)
            return;

        tasks.splice(index, 1);
    }

    this.update = function(id, text, done) {
        let index = findIndex(id);
        if(index === -1)
            return;
        text = text.trim();
        if(text)
            tasks[index].setText(text);
        
        if(done === "true") 
            tasks[index].markDone();
        else if(done === "false") 
            tasks[index].markToDo();
    }

    function convert(task) {
        let simpleTask = {
            id: task.getID(),
            text: task.getText(),
            done: task.isDone(),
        }

        return simpleTask;
    }

    function findIndex(id) {
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].getID() == id)
                return i;
        }

        return -1;
    }
}

module.exports = { create } ;