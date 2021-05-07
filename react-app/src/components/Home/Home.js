import React from 'react';

import './Home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <div className='home-nav-spacer'></div>

      <div className='dashboard-container'>
        <div className='dashboard-navbar'>
          <div className='dashboard-navbar-left'>
            <p>hello user</p>
            <p>January 01, 2029</p>
          </div>

          <div className='dashboard-navbar-right'>
            <p>company name</p>
            <p>company address</p>
          </div>
        </div>

        <div className='dashboard-body'>
          <div className='dashboard-body-left'>
            <div className='dashboard-task-header'>
              <p>Tasks this month:</p>
            </div>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
            <h3>task container</h3>
          </div>

          <div className='dashboard-body-right'>
            <div className='dashboard-body-right-insurance'>
              <div className='dashboard-insurance-header'>
                <p>Insurance:</p>
              </div>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
              <h3>insurance container</h3>
            </div>

            <div className='dashboard-body-right-physician'>
              <div className='dashboard-physicians-header'>
                <p>3rd party medical staff:</p>
              </div>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
              <h3>physician container</h3>
            </div>
          </div>
        </div>

        <div className='dashboard-footer'>
          <h4>Patient birthdays:</h4>
          <h3>patient</h3>
          <h3>patient</h3>
          <h3>patient</h3>
          <h3>patient</h3>
          <h3>view all birthdays</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
