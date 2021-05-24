import React from 'react';
import './Header.scss';

/**
 * Header component, displaying title and description
 * @component
 * @returns Titile and description
 */
const Header = () => {
  return (
    <header className="header">
      <p>Encryption Tool</p>
      <p>An encryption utility implementing Feistel Cipher</p>
    </header>
  );
}
 
export default Header;