import React from 'react';
import { NavLink } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import LogoutButton from '../auth/LogoutButton';

import './NavBar.css';

const NavBar = () => {
  const profileButton = (<i className='fas fa-id-card-alt'></i>)

  return (
    <div className='navbar-container'>
      <DropdownButton id='navbar-dropdown' title='Tasks'>
        <Dropdown.Item>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </DropdownButton>

      <DropdownButton id='navbar-dropdown' title='Patients'>
        <Dropdown.Item>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id='navbar-dropdown' title='Physicians'>
        <Dropdown.Item>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id='navbar-dropdown' title='Insurance'>
        <Dropdown.Item>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </DropdownButton>
      <DropdownButton id='navbar-dropdown' title={profileButton}>
        <Dropdown.Item>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </Dropdown.Item>

        <Dropdown.Item>
          <LogoutButton />
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
}

export default NavBar;
