import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUsers, FiBook } from 'react-icons/fi';
import { TfiAnnouncement } from "react-icons/tfi";
import LogoutButton from '../Logout/Logout';

export const TeaNav = ({ onSelect }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navStyle = (path) => ({
    color: isActive(path) ? 'orange' : 'white',
    textDecoration: 'none',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    borderRadius: '4px',
    marginBottom: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: isActive(path) ? 'rgba(255, 165, 0, 0.1)' : 'transparent',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  });

  const iconStyle = {
    marginRight: '12px',
    fontSize: '1.1rem',
    color: 'inherit'
  };

  // Navigation items
  const navItems = [
    { path: '/teachers/', icon: <FiHome style={iconStyle} />, label: 'Home' },
    { path: '/teachers/managestudents', icon: <FiUsers style={iconStyle} />, label: 'Manage Students' },
    { path: '/teachers/uploadmarks', icon: <FiUsers style={iconStyle} />, label: 'Upload marks' },
    { path: '/teachers/reports', icon: <FiBook style={iconStyle} />, label: 'Reports' },
    { path: '/teachers/announcements', icon: <TfiAnnouncement style={iconStyle} />, label: 'Announcements' }
  ];

  return (
    <div
      className="d-flex flex-column justify-content-between p-4"
      style={{ 
        backgroundColor: '#1d3557',
        minHeight: '100vh',
      }}
    >
      <div>
        {/* Logo */}
        <div className="mb-5 d-flex align-items-center">
          <img
            src="http://192.168.1.12/images/maimt_logo.png"
            alt="UrLevel Logo"
            width="35"
            height="35"
            className="me-2"
          />
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
            <span style={{ color: 'orange' }}>Ur</span>Level
          </span>
        </div>

        {/* Nav Items */}
        <Nav className="flex-column">
          {navItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path} 
              style={navStyle(item.path)}
              onClick={onSelect}
              aria-current={isActive(item.path) ? 'page' : undefined}
            >
              {item.icon} {item.label}
            </NavLink>
          ))}
        </Nav>
      </div>

      {/* Footer */}
      <div>
        <LogoutButton />
        <div 
          className="text-center mt-3 p-2 fw-bold"
          aria-label="Teacher privileges"
          style={{ color: 'orange' }}
        >
          TEACHER
        </div>
      </div>
    </div>
  );
};