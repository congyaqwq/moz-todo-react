import React from 'react'

export default function FilterButtom() {
  return (
    <button type="button" className="btn toggle-btn" aria-pressed="false">
      <span className="visually-hidden">Show </span>
      <span>Completed</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}