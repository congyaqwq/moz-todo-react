import React, { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function Form(props) {
  const [name, setName] = useState('')

  const handleChange = function (e) {
    const { value = '' } = e.target
    setName(value)
  }
  const handleSubmit = function (e) {
    e.preventDefault()
    props.addTask(name)
    setName('')
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <TextField
        id="new-todo-input"
        className="input input__lg"
        label="please enter event name"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <Button variant="contained" size="large" type="submit" className="btn btn__primary btn__lg">
        Add
      </Button>
    </form>
  )
}