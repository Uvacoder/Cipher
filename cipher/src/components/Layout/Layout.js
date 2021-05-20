import React from 'react';
import './Layout.scss';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import {ReactComponent as Github} from '../../Images/github.svg';

const GITHUB_LINK = "https://github.com/patrykbura/Cipher"

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