import React from 'react';
import './Layout.scss';
import Header from 'Components/Header/Header'
import Footer from 'Components/Footer/Footer'
import Main from 'Components/Main/Main'
import {ReactComponent as Github} from 'Images/github.svg';

const GITHUB_LINK = "https://github.com/patrykbura/Cipher"

/**
 * Main layout component
 * @component
 * @returns Header, Main and Footer
 */
function MainLayout() {
  return (
    <div className="app-layout">
      <div className="app-layout__container"> 
        <Header/>
        <Main />
        <Footer />
      </div>
      <a href={ GITHUB_LINK }>
        <Github className="app-layout__github"/>
      </a>
    </div>
  );
}
 
export default MainLayout;