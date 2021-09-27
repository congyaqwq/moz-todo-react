// import './App.css'

import { useState, useRef, useEffect } from 'react'
import { nanoid } from "nanoid"

import ToDo from './components/ToDo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'
import ButtonGroup from '@mui/material/ButtonGroup'

function App(props) {
  const [tasks, setTask] = useState(props.tasks)
  const [filter, setFilter] = useState('All')

  const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP)

  const listHeadingRef = useRef(null)

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name} isPressed={name === filter}
      setFilter={setFilter} ></FilterButton>
  ))

  const addTask = function (name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false }
    setTask([...tasks, newTask])
  }
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
    const newTasks = tasks.filter(it => it.id !== id)
    setTask(newTasks)
  }

  function editTask(id, newName) {
    const newTasks = tasks.map(it => {
      if (it.id === id) {
        return { ...it, name: newName }
      }
      return it
    })
    setTask(newTasks)
  }

  const tasksList = tasks.filter(FILTER_MAP[filter]).map(it => (
    <ToDo
      key={it.id}
      name={it.name}
      completed={it.completed}
      id={it.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const tasksNoun = tasksList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${tasksList.length} ${tasksNoun} remaining`

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const prevTaskLength = usePrevious(tasks.length)
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <h2 id="list-heading" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ButtonGroup sx={{ display: 'block' }} size="large" variant="contained" aria-label="outlined primary button group">
        {filterList}
      </ButtonGroup>
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
