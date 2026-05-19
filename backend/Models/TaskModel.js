const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskName :{
        type: String,
        require: true
    },
    isDone :{
        type: Boolean,
        require: true,
        default: false
    },

});

const TaskModel = mongoose.model('todos', TaskSchema);

module.exports = TaskModel;