import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalendarAlt, faPlus, faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import Home from './components/Home';
import Calendar from './components/Calendar';
import New from './components/New';
import View from './components/View';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="dashboard">
        {/* Page Content */}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/new" element={<New />} />
            <Route path="/view" element={<View />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

        {/* Footer Navigation */}
        <nav className="footer-nav">
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faHome} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/calendar"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faCalendarAlt} /> Calendar
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/new"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faPlus} /> New
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/view"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faEye} /> View
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                <FontAwesomeIcon icon={faUser} /> Profile
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
