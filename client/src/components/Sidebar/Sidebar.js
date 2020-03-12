import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Tooltip from '../Tooltip';
import { SidebarData } from './SidebarData';

class Sidebar extends Component {
  checkRole = allowedRoles => {
    const { authRoles } = this.props;

    if (typeof authRoles === 'undefined') {
      return false;
    }

    for (let i = 0; i < allowedRoles.length; i++) {
      let allowedRole = allowedRoles[i];
      if (authRoles.indexOf(allowedRole) !== -1) {
        return true;
      }
    }

    return false;
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
                  {/* check for ctrl key so that we don't scroll to top if the link is being opened in a new tab */}
                  <Link
                    onClick={e => {
                      if (!e.ctrlKey) {
                        window.scrollTo(0, 0);
                      }
                    }}
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
