import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  render() {
    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link to="/" className="sidebar__link">
              <i className="sidebar__icon fas fa-home" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/library" className="sidebar__link">
              <i className="sidebar__icon fas fa-music" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/" className="sidebar__link">
              <i className="sidebar__icon fas fa-microphone" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/user" className="sidebar__link">
              <i className="sidebar__icon far fa-user" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/calendar" className="sidebar__link">
              <i className="sidebar__icon far fa-calendar-alt" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/" className="sidebar__link">
              <i className="sidebar__icon far fa-calendar-check" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/report" className="sidebar__link">
              <i className="sidebar__icon fas fa-chart-bar" />
            </Link>
          </li>
          <li className="sidebar__item">
            <Link to="/" className="sidebar__link">
              <i className="sidebar__icon far fa-copy" />
            </Link>
          </li>
        </ul>
      </nav>
    )
  }
}

export default Sidebar
