import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import AddUser from '../User/AddUser';
import GetUser from '../User/GetUser';
import { logout } from '../../store/session';

import './NavBar.css';

const NavBar = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const profileButton = (<i className='fas fa-id-card-alt' />);
  const adminFeatures = (
    <>
      <Dropdown.Item>
        <AddUser />
      </Dropdown.Item>
      <Dropdown.Item>
        <GetUser />
      </Dropdown.Item>
    </>
  );

  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='navbar-container'>
      <div className='navbar-logo'>
        <i className='fas fa-ambulance' />
        <h3>accessible health care</h3>
      </div>
      <div className='navbar-right'>
        <div className='navbar-company-name'>
          <h4>Super Health Inc.</h4>
        </div>
        <div className='navbar-dropdowns'>
          <DropdownButton id='tasks-dropdown' title='Tasks'>
            <Dropdown.Item>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id='patients-dropdown' title='Patients'>
            <Dropdown.Item>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id='physicians-dropdown' title='Physicians'>
            <Dropdown.Item>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id='insurance-dropdown' title='Insurance'>
            <Dropdown.Item>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </Dropdown.Item>
          </DropdownButton>
          <DropdownButton id='profile-dropdown' title={profileButton}>
            {user.role === 'admin' && adminFeatures}

            <Dropdown.Item onClick={onLogout}>
              Log out
            </Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
