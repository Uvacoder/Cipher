import React from 'react';
import './Layout.scss';
import LayoutHeader from '../LayoutHeader/LayoutHeader'
import LayoutFooter from '../LayoutFooter/LayoutFooter'
import LayoutMain from '../LayoutMain/LayoutMain'

function MainLayout() {
 
  return (
    <div className="app-layout">
      <div className="app-layout__container"> 
        <LayoutHeader/>
        <LayoutMain />
        <LayoutFooter />
      </div>
    </div>
  );
}
 
export default MainLayout;