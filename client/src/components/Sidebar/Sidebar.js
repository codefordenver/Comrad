import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';
import { SidebarData } from './SidebarData';

class Sidebar extends Component {
  checkRole = allowedRoles => {
    const { authRole } = this.props;

    if (allowedRoles.indexOf(authRole) === -1) {
      return false;
    }

    return true;
  };

  render() {
    return (
      <nav className="sidebar">
        <ul className="sidebar__list">
          {SidebarData.map(item => {
            const { iconClass, name, allowedRoles, tooltipText, url } = item;

            if (allowedRoles && !this.checkRole(allowedRoles)) {
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
                <li className="sidebar__item">
                  <Link
                    onClick={() => window.scrollTo(0, 0)}
                    to={url}
                    className="sidebar__link"
                  >
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
