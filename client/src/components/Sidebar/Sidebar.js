import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Sidebar extends Component {
  state = {}

  render() {
    const items = [
      {
        name: 'home',
        url: '/',
        iconClass: 'fas fa-home'
      },
      {
        name: 'library',
        url: '/library',
        iconClass: 'fas fa-music'
      },
      {
        name: 'microphone',
        url: '/',
        iconClass: 'fas fa-microphone'
      },
      {
        name: 'user',
        url: '/user',
        iconClass: 'far fa-user'
      },
      {
        name: 'calendar',
        url: '/calendar',
        iconClass: 'far fa-calendar-alt'
      },
      {
        name: 'calendar-check',
        url: '/',
        iconClass: 'far fa-calendar-check'
      },
      {
        name: 'report',
        url: '/report',
        iconClass: 'fas fa-chart-bar'
      },
      {
        name: 'copy',
        url: '/',
        iconClass: 'far fa-copy'
      }
    ]

    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          {items.map(item => (
            <li key={item.name} className="sibebar-_item">
              <Link to={item.url} className="sidebar__link">
                <i className={`sidebar__icon ${item.iconClass}`} />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

export default Sidebar
