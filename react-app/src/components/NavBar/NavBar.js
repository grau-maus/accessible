import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import AddUser from '../User/AddUser';
import GetUser from '../User/GetUser';
import AddInsurance from '../Insurance/AddInsurance';
import GetInsurance from '../Insurance/GetInsurance';
import AddPhysician from '../Physician/AddPhysician';
import GetPhysician from '../Physician/GetPhysician';
import AddPatient from '../Patient/AddPatient';
import GetPatient from '../Patient/GetPatient';
import AddTask from '../Task/AddTask';
import GetTask from '../Task/GetTask';
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
              <AddTask />
            </Dropdown.Item>
            <Dropdown.Item>
              My tasks
            </Dropdown.Item>
            <Dropdown.Item>
              <GetTask />
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id='patients-dropdown' title='Patients'>
            <Dropdown.Item>
              <AddPatient />
            </Dropdown.Item>
            <Dropdown.Item>
              <GetPatient />
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id='physicians-dropdown' title='Physicians'>
            <Dropdown.Item>
              <AddPhysician />
            </Dropdown.Item>
            <Dropdown.Item>
              <GetPhysician />
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id='insurance-dropdown' title='Insurance'>
            <Dropdown.Item>
              <AddInsurance />
            </Dropdown.Item>
            <Dropdown.Item>
              <GetInsurance />
            </Dropdown.Item>
          </DropdownButton>

          <DropdownButton id='profile-dropdown' title={profileButton}>
            {user.role === 'admin' && adminFeatures}
            <Dropdown.Item>
              My profile
            </Dropdown.Item>
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
