// Header.js
import React from 'react';
import logo from '../logo.svg'; // Replace with the path to your logo image

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <img src={logo} alt="Logo" style={{ width: '50px', height: '50px' }} />
      </div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle}>Home</button>
        <button style={buttonStyle}>Search</button>
      </div>
    </header>
  );
};

const headerStyle = {
  background: '#333',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
};

const logoStyle = {
  marginRight: 'auto', // Pushes the logo to the left
};

const buttonContainerStyle = {
  display: 'flex',
};

const buttonStyle = {
  marginLeft: '1rem',
  padding: '0.5rem 1rem',
  background: '#555',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Header;
