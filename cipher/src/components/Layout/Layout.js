import React from 'react';
import './Layout.scss';
import LayoutHeader from '../LayoutHeader/LayoutHeader'
import LayoutFooter from '../LayoutFooter/LayoutFooter'
import LayoutMain from '../LayoutMain/LayoutMain'
import {ReactComponent as Github} from '../../Images/github.svg';

const GITHUB_LINK = "https://github.com/patrykbura/Cipher"

function MainLayout() {
 
  return (
    <div className="app-layout">
      <div className="app-layout__container"> 
        <LayoutHeader/>
        <LayoutMain />
        <LayoutFooter />
      </div>
      <a href={ GITHUB_LINK }>
        <Github className="app-layout__github"/>
      </a>
    </div>
  );
}
 
export default MainLayout;