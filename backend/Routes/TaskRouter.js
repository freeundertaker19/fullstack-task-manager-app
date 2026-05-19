const { createTask, fetchAllTask, deleteTask, updateTask } = require('../Controllers/TaskController');

const router = require('express').Router();
// To get all task
router.get('/', fetchAllTask);

//create task
router.post('/', createTask);

//delete task
router.delete('/:id', deleteTask);

//update task
router.put('/:id', updateTask);

module.exports = router