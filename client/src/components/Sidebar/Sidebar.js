import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';

class Sidebar extends Component {
  state = {};

  render() {
    const items = [
      {
        name: 'home',
        url: '/dashboard',
        iconClass: 'fas fa-home',
        tooltipText: 'Home',
      },
      {
        name: 'microphone',
        url: '/show-builder',
        iconClass: 'fas fa-microphone',
        tooltipText: 'Show Builder',
      },
      {
        name: 'calendar-check',
        url: '/calendar',
        iconClass: 'fas fa-calendar-check',
        tooltipText: 'Traffic Calendar',
      },
      {
        name: 'calendar',
        url: '/calendar',
        iconClass: 'fas fa-calendar-alt',
        tooltipText: 'Show Calendar',
      },
      {
        name: 'library',
        url: '/library',
        iconClass: 'fas fa-music',
        tooltipText: 'Music Library',
      },
      {
        name: 'copy',
        url: '/resources',
        iconClass: 'fas fa-copy',
        tooltipText: 'Resources',
      },
      {
        name: 'report',
        url: '/reporting',
        iconClass: 'fas fa-chart-bar',
        tooltipText: 'Reporting',
      },
      {
        name: 'user',
        url: '/user/search',
        iconClass: 'fas fa-user',
        tooltipText: 'Users',
      },
    ];

    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          {items.map(item => (
            <Tooltip key={item.name} text={item.tooltipText} placement="right">
              <li className="sibebar__item">
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
