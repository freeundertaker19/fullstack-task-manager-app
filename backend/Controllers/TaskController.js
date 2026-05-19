const TaskModel = require('../Models/TaskModel');

const createTask = async (req,res) => {
    const data = req.body;
    try {
        
        await TaskModel.create({
            taskName: data.taskName,
            isDone: data.isDone
        })
        res.status(201).json({message: "task created",success: true})

    } catch (error) {
        res.status(500).json({message: 'Failed to create task', success: false});
    }
}

// get all task
const fetchAllTask = async (req,res) => {
    try {
       data = await TaskModel.find()
        res.status(200).json({message: "task fetched", data})

    } catch (error) {
        res.status(500).json({message: 'Failed to get all task', success: false});
    }
}

//update task

const updateTask = async (req,res) => {
    const id = req.params.id;
    const data = req.body
    try {
        await TaskModel.findOneAndUpdate({_id: id },{
            taskName: data.taskName,
            isDone: data.isDone
        })
        res.status(200).json({message: "task updated", success:true})

    } catch (error) {
        res.status(500).json({message: 'Failed to update task', success: false});
    }
}
//delete task

const deleteTask = async (req,res) => {
    const id = req.params.id;

    try {
        await TaskModel.findOneAndDelete({_id: id })
        res.status(200).json({message: "task deleted successfully" , success: true})

    } catch (error) {
        res.status(500).json({message: 'Failed to delete task', success: false});
    }
}

module.exports = {createTask, fetchAllTask , updateTask, deleteTask}