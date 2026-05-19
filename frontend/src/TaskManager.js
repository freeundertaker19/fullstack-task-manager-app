import React, { useEffect, useState } from "react";
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from 'react-icons/fa';
import { ToastContainer } from "react-toastify";
import { createTask, delTask, getAllTask, updateTask } from "./api";
import { notify } from "./utils";
const TaskManager = () => {
const [input, setInput] = useState('')
const [task, setTask] = useState([])
const[copyTask,setCopyTask] = useState([])
const [updateObj, setUpdateObj] = useState(null);
const handleAddTask = async ()=>{
  const obj = {
    taskName: input,
    isDone: false
  }
  // console.log(obj)
  try {
        // const data = await createTask(obj);
        const {success, message} = await createTask(obj);
        if (success) {
          // show success toast
          notify(message, 'success')
        } else {
          // show error toast
          notify(message, 'error')
        }
        setInput('');
        fetchAllTask();
        // console.log(data)
  } catch (error) {
    console.error(error);
    notify("Failed to create task", 'error')
  }

}
const fetchAllTask = async ()=>{
  try {
    const {data} = await getAllTask();
    console.log(data)
   setTask(data);
   setCopyTask(data);
    // console.log(data)
} catch (error) {
console.error(error);
}
}

useEffect(()=>{
  fetchAllTask()
}, [])

const handleDelTask = async(id)=>{
  try {
    const {success, message} = await delTask(id);

    if (success) {
      // show success toast
      notify(message, 'success')
    } else {
      // show error toast
      notify(message, 'error')
    }
    fetchAllTask()
    // console.log(data)
} catch (error) {
console.error(error);
notify("Failed to create task", 'error')
}


}

const handleCheck = async (item) =>{
  const {_id , isDone, taskName} = item
  const obj = {
    taskName,
    isDone: !isDone
  }
  try {
    const {success, message} = await updateTask(_id, obj);


    if (success) {
      // show success toast
      notify(message, 'success')
    } else {
      // show error toast
      notify(message, 'error')
    }
    fetchAllTask()
    // console.log(data)
} catch (error) {
console.error(error);
notify("Failed to create task", 'error')
}
}

// This triggers when you click the Pencil icon
const handleUpdate = (item) => {
  setUpdateObj(item); // Store the entire object being edited
}

// This handles the input change inside the edit mode
const handleUpdateInputChange = (e) => {
  setUpdateObj({ ...updateObj, taskName: e.target.value });
}

// This sends the PUT request to the backend
const handleUpdateTask = async () => {
  try {
      const { success, message } = await updateTask(updateObj._id, updateObj);
      if (success) {
          notify(message, 'success');
          setUpdateObj(null); // Exit edit mode
          fetchAllTask();     // Refresh list
      } else {
          notify(message, 'error');
      }
  } catch (error) {
      console.error(error);
      notify("Failed to update task", 'error');
  }
}


const handleSearch = (e)=>{
  const term = e.target.value.toLowerCase();
  const oldTask = [...copyTask];
  const result = oldTask.filter(item => item.taskName.toLowerCase().includes(term))
  setTask(result)
}
  return (
    <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
      <h1 className="mb-4">Task Manager App</h1>
      {/* Input and searchbox */}
      <div className="d-flex justify-conent-between align-items-center mb-4 w-100">
        <div className="input-group flex-grow-1 me-2">
          <input
            type="text"
            className="form-control me-1 "
            placeholder="Add new task"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
          ></input>
          <button className="btn btn-success btn-sm me-2"
          onClick={handleAddTask}>
    <FaPlus className="m-2"/>
          </button>

        </div>

        <div className="input-group flex-grow-1">
          <span className="input-group-text">
            <FaSearch/>
          </span>
          <input type="text"
            className="form-control  "
            placeholder="search tasks"
            onChange={handleSearch}></input>
        </div>
        
            
       
 
      </div>

      {/* list of items  */}
      <div className="d-flex flex-column w-100">
  {task.map((item) => (
    <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
      
      {updateObj && updateObj._id === item._id ? (
        <div className="d-flex w-100 me-2">
          <input
            type="text"
            className="form-control form-control-sm"
            value={updateObj.taskName}
            onChange={handleUpdateInputChange}
          />
          <button className="btn btn-primary btn-sm ms-2" onClick={handleUpdateTask}>Save</button>
          <button className="btn btn-secondary btn-sm ms-1" onClick={() => setUpdateObj(null)}>X</button>
        </div>
      ) : (
        <span className={item.isDone ? 'text-decoration-line-through' : ''}>
          {item.taskName}
        </span>
      )}

      {/* BUTTONS SECTION */}
      {!updateObj || updateObj._id !== item._id ? (
        <div>
          <button type="button" className="btn btn-success btn-sm me-2" onClick={() => handleCheck(item)}>
            <FaCheck />
          </button>
          <button type="button" className="btn btn-primary btn-sm me-2" onClick={() => handleUpdate(item)}>
            <FaPencilAlt />
          </button>
          <button type="button" className="btn btn-danger btn-sm me-2" onClick={() => handleDelTask(item._id)}>
            <FaTrash />
          </button>
        </div>
      ) : null}
      
    </div>
  ))}
</div>

      {/* Toastify  */}
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      />

    </div>
  );
};

export default TaskManager;
