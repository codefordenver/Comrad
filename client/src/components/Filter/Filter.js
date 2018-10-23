import React, { Component } from 'react'

export const Filter = props => (
  <ul className="filter__list">
    {props.filterItems.map(item => (
      <li key={item} className="filter__item">
        <span className="filter__span" onClick={() => props.handleFilterChange(item)}>{item}</span>
      </li>
    ))}
  </ul>
)
