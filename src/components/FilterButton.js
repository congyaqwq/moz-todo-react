import React from 'react'

import Button from '@mui/material/Button'

export default function FilterButton(props) {
  return (
    <Button size="large" type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
      <span className="visually-hidden">Show </span>
      <span>{props.name}</span>
      <span className="visually-hidden"> tasks</span>
    </Button>
  )
}