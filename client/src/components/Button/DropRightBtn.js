import React from 'react'
import { Link } from 'react-router-dom';

export const DropRightBtn = props => {
  const { dropRightBtnItems } = props;

  return (
    <div className="dropright">
      <button className="btn btn-primary">
        Add
      </button>
      <button>
        +
      </button>
      <ul className="dropright__list">
        {dropRightBtnItems ? dropRightBtnItems.map(item => (
          <li key={item} className="dropright__item">
            <span className="dropright__span" onClick={() => props.handleDropRightBtnClick(item)}>{item}</span>
          </li>
        )) : (
          null
        )}
      </ul>
    </div>
  )
}
