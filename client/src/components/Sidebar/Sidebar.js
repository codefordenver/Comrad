import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

class Sidebar extends Component {
  state = {};

  render() {
    const items = [
      {
        name: 'home',
        url: '/',
        iconClass: 'fas fa-home',
        tooltipText: 'Home',
      },
      {
        name: 'library',
        url: '/library',
        iconClass: 'fas fa-music',
        tooltipText: 'Music Library',
      },
      {
        name: 'microphone',
        url: '/',
        iconClass: 'fas fa-microphone',
        tooltipText: 'Shows',
      },
      {
        name: 'user',
        url: '/user',
        iconClass: 'fas fa-user',
        tooltipText: 'Users',
      },
      {
        name: 'calendar',
        url: '/calendar',
        iconClass: 'fas fa-calendar-alt',
        tooltipText: 'Calendars',
      },
      {
        name: 'calendar-check',
        url: '/',
        iconClass: 'fas fa-calendar-check',
        tooltipText: 'Calendar with a Checkbox',
      },
      {
        name: 'report',
        url: '/report',
        iconClass: 'fas fa-chart-bar',
        tooltipText: 'Report',
      },
      {
        name: 'copy',
        url: '/',
        iconClass: 'fas fa-copy',
        tooltipText: 'Copy?',
      },
    ];

    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          {items.map(item => (
            <Tooltip key={item.name} text={item.tooltipText} placement="right">
              <li className="sibebar-_item">
                <Link to={item.url} className="sidebar__link">
                  <i className={`sidebar__icon ${item.iconClass}`} />
                </Link>
              </li>
            </Tooltip>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
