import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faTrash, faArrowDown } from '@fortawesome/free-solid-svg-icons';



function ToDoList() {


    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : [""];
    });
    const [newTask, SetNewtask] = useState("");

    const [checkedTasks, setCheckedTasks] = useState(() => {
        const storedCheckedTasks = localStorage.getItem("checkedTasks");
        return storedCheckedTasks ? JSON.parse(storedCheckedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
    }, [tasks, checkedTasks]);


    function handleInputChange(event) {
        SetNewtask(event.target.value);
    }

    function addTasks() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, newTask]);
            SetNewtask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        setCheckedTasks(prevCheckedTasks => prevCheckedTasks.filter(taskIndex => taskIndex !== index));

    }


    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }


    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }   

    function checkedMark(task) {
        if (checkedTasks.includes(task)) {
            setCheckedTasks(prevCheckedTasks => prevCheckedTasks.filter(taskIndex => taskIndex !== task));
        } else {
            setCheckedTasks(prevCheckedTasks => [...prevCheckedTasks, task]);
        }
    }


    


    return (
        <>

            <div className="to-do-list">
                <h1>To-Do-List</h1>
                <div>
                    <input type="text" placeholder="Enter tasks..." value={newTask} onChange={handleInputChange} />
                    <button className="add-button" onClick={addTasks}>Add</button>
                </div>
                <ol>
                    {tasks.map((task, index) =>
                        <li key={index} className={checkedTasks.includes(task) ? "checked" : ""}>
                            <input
                                type="checkbox"
                                className="checkedbox"
                                onClick={() => checkedMark(task)}
                                checked={checkedTasks.includes(task)}

                            />
                            <span className="text"> {task} </span>
                            <button className="delete-button" onClick={() => deleteTask(index)}><FontAwesomeIcon icon={faTrash} /></button>
                            <button className="move-button" onClick={() => moveTaskUp(index)}><FontAwesomeIcon icon={faArrowUp} /></button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}><FontAwesomeIcon icon={faArrowDown} /></button>
                           
                        </li>
                    )}
                </ol>
            </div>
        </>
    );


}

export default ToDoList;
