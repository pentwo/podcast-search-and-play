import React from 'react';

const headerStyle = {
  fontFamily: 'var(--displayFont), sans-serif',
  fontSize: 'clamp(2.5rem, 8vw, 4rem)'
};

const Header = () => (
  <header>
    <h1 style={headerStyle}>Search a Podcast</h1>
  </header>
);

export default Header;
