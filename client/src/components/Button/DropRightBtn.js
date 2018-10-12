import React from 'react'
import { Link } from 'react-router-dom';

export const DropRightBtn = props => {
  return (
    <div className="dropdown">
      <button className="btn btn-primary">
        Add
      </button>
      <button>
        +
      </button>
      <ul className="dropdown__list">
        <li className="drop__item">
          <Link to="/library/add/track">Tracks</Link>
        </li>
        <li className="drop__item">
          <Link to="/library/add/album">Album</Link>
        </li>
        <li className="drop__item">
          <Link to="#">Other</Link>
        </li>
      </ul>
    </div>
  )
}
