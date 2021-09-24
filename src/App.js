import './App.css'

import { useState } from 'react'
import { nanoid } from "nanoid"

import ToDo from './components/ToDo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

function App(props) {
  const [tasks, setTask] = useState(props.tasks)
  const tasksList =
    tasks.map(it => (
      <ToDo name={it.name} completed={it.completed} id={it.id} key={it.id} toggleTaskCompleted={toggleTaskCompleted} deleteTask={deleteTask} />
    ))
  const addTask = function (name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTask([...tasks, newTask])
  }
  const tasksNoun = tasksList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${tasksList.length} ${tasksNoun} remaining`
  function toggleTaskCompleted(id) {
    const updateTasks = tasks.map(task => {
      if (id === task.id) {
        return {
          ...task, completed: !task.completed
        }
      }
      return task
    })
    setTask(updateTasks)
  }
  function deleteTask(id) {
    console.log(id)
  }
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasksList}
      </ul>
    </div>
  )
}

export default App
