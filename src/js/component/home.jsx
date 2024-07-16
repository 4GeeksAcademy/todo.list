import React, {useRef, useState} from "react";
import Task from "./task";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const tasksRef = useRef([]);
    const inputRef = useRef(null);

    const handleAddTask = (e) => {
        e.preventDefault();
        const newTaskName = inputRef.current.value.trim();
        if (newTaskName === '') return;

        const newTask = {
            id: new Date().getTime(), 
            name: newTaskName
        };

        tasksRef.current.push(newTask);
        inputRef.current.value = ''; 
        inputRef.current.focus(); 

       
        setRerenderFlag(!rerenderFlag);
    };

    const handleDeleteTask = (taskId) => {
        tasksRef.current = tasksRef.current.filter(task => task.id !== taskId);
        
        setRerenderFlag(!rerenderFlag);
    };

   
    const [rerenderFlag, setRerenderFlag] = useState(false);

    return (
        <div className="container text-center listBox">
            <h1 style={{color:"red"}}>Todo List</h1>
            <form onSubmit={handleAddTask}>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder="What needs to be done?"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddTask(e);
                        }
                    }}
                />
                
            </form>
            {tasksRef.current.length === 0 ? (
                <h1>No tasks, add a task</h1>
            ) : (
                <div >
                    {tasksRef.current.map(task => (
                       <div className="taskList">  <Task key={task.id} task={task} onDelete={handleDeleteTask} /> </div>
                    ))}
                </div>
            )}
            <div className="fixed-bottom itemCount">
                 {tasksRef.current.length} items left
            </div>
        </div>
    );
};

export default Home;
