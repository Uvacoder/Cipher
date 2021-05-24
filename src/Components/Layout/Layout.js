import React from 'react';
import './Layout.scss';
import Header from 'Components/Header/Header'
import Footer from 'Components/Footer/Footer'
import Main from 'Containers/Main/Main'
import {ReactComponent as Github} from 'Images/github.svg';
import {ReactComponent as Doc} from 'Images/doc.svg';

const GITHUB_LINK = "https://github.com/patrykbura/Cipher"
const DOCUMENTATION_LINK = "./docs"

/**
 * Main layout component
 * @component
 * @returns Header, Main and Footer
 */
const MainLayout = () => {
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
      <a href={ DOCUMENTATION_LINK }>
        <Doc className="app-layout__doc"/>
      </a>
    </div>
  );
}
 
export default MainLayout;