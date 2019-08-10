import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';
import { SidebarData } from './SidebarData';

class Sidebar extends Component {
  checkRole = sidebarRole => {
    const { authRole } = this.props;

    if (authRole !== sidebarRole) {
      return false;
    }

    return true;
  };

  render() {
    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          {SidebarData.map(item => {
            const { iconClass, name, role, tooltipText, url } = item;

            if (item.role && !this.checkRole(role)) {
              return false;
            }

            return (
              <Tooltip
                key={name}
                id={name}
                overlay={tooltipText}
                trigger="hover"
                placement="right"
              >
                <li className="sibebar__item">
                  <Link to={url} className="sidebar__link">
                    <i className={`sidebar__icon ${iconClass}`} />
                  </Link>
                </li>
              </Tooltip>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
