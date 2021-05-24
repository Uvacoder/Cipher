import React from 'react';
import './Footer.scss';

/**
 * Footer component displaying about
 * @component
 * @returns Paragraphs with infromations about author and app
 */
const Footer = () => {
  return (
    <footer className="footer">
      <p>You can read more about Feistel Cipher on <a href="https://en.wikipedia.org/wiki/Feistel_cipher">Wikipedia</a></p>
      <p>Patryk Bura, May 2021</p>
    </footer>
  );
}
 
export default Footer;