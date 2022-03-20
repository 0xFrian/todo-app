import { nanoid } from "nanoid"; 
import React, { useState, useRef, useEffect } from "react";
import usePrevious from "./components/UsePrevious";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";

const FILTER_MAP = {
  All: () => true,                    
  Active: task => !task.completed,    
  Completed: task => task.completed   
};
const FILTER_NAMES = Object.keys(FILTER_MAP); 
let renderCount = 0; 

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);  
  const [filter, setFilter] = useState("All");    

  function addTask(name) {
    console.log(`Adding task: "${name}"`);                                 
    const newTask = { 
        id: "todo-" + nanoid(), 
        name: name, 
        completed: false 
    }; 
    const newTaskList = [...tasks, newTask];  
    setTasks(newTaskList);
  }
  
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        const completeNoun = task.completed ? "incomplete" : "complete";
        console.log(`Marking "${task.name}" ${completeNoun}`);
        return {...task, completed: !task.completed};
      }
      return task; 
    });
    setTasks(updatedTasks); 
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}; 
      }
      return task; 
    });
    setTasks(editedTaskList); 
  }

  function deleteTask(id) {
    const task = document.getElementById(id);
    console.log(`Deleting task: "${task.value}"`);
    const remainingTasks = tasks.filter(task =>
      id !== task.id  
    );
    setTasks(remainingTasks); 
  }

  const taskList = tasks
  .filter(FILTER_MAP[filter])   
  .map(task => (                
    <Todo 
      id={task.id}          
      name={task.name} 
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
      deleteTask={deleteTask}
    />
  )); 
  const filterList = FILTER_NAMES.map(name => (   
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter} 
      setFilter={setFilter}  
    />
  ));   

  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length);   
  useEffect(() => {
    if (tasks.length < prevTaskLength) { 
      let listHeadingNode = listHeadingRef.current; 
      listHeadingNode.focus();
    }
  }, [tasks.length, prevTaskLength]);  
  
  const tasksNoun = taskList.length !== 1 ? "tasks" : "task"; 
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  console.log("Render Count: ", renderCount);
  useEffect(() => {
    renderCount++;
  });

  return (
    <div className="todoapp stack-large">
      <h1>ToDoMatic</h1>
      <Form onSubmit={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul 
        role="list" 
        className="todo-list stack-large stack-exception" 
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
