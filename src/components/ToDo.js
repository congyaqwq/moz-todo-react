import React, { useEffect, useRef, useState } from 'react'

import Button from '@mui/material/Button'
import { Paper } from '@mui/material'
import TextField from '@mui/material/TextField'


export default function ToDo(props) {

  const [isEditing, setEditing] = useState(false)
  const [newName, setNewName] = useState('')
  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)

  console.log("main render")
  useEffect(() => {
    console.log('side effect')
  })

  function usePrevious(value) {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    })
    return ref.current
  }

  const wasEditing = usePrevious(isEditing)

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus()
    }
    if (wasEditing && !isEditing) {
      editButtonRef.current.focus()
    }
  }, [wasEditing, isEditing])

  function handleChange(e) {
    setNewName(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    props.editTask(props.id, newName)
    setNewName('')
    setEditing(false)
  }
  const editingTemplate = (
    <Paper sx={{ padding: '20px' }}>
      <form className="stack-small" onSubmit={handleSubmit} >
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>

          </label>
          <TextField id={props.id} label={`New name for ${props.name}`} fullWidth margin="normal" className="todo-text" type="text" ref={editFieldRef} onChange={handleChange}></TextField>
          {/* <input id={props.id} className="todo-text" type="text" ref={editFieldRef} onChange={handleChange} /> */}
        </div>
        <div className="btn-group">
          <Button variant="outlined" type="button" className="btn todo-cancel" sx={{ marginRight: '20px' }} onClick={() => { setEditing(false) }}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </Button>
          <Button variant="contained" type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </Button>
        </div>
      </form>
    </Paper>
  )

  const viewTemplate = (
    <Paper sx={{ padding: '20px' }}>
      <div className="stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <Button variant="outlined" size="large" type="button" className="btn" sx={{ marginRight: '20px' }} ref={editButtonRef} onClick={() => setEditing(true)}>
            Edit <span className="visually-hidden">{props.name}</span>
          </Button>
          <Button
            variant="contained" color="error" size="large"
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(props.id)}
          >
            Delete <span className="visually-hidden">{props.name}</span>
          </Button>
        </div>
      </div>
    </Paper>
  )
  return (<li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>)
}