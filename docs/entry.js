
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.js';
reactComponents['App'] = Component0;

import Component1 from '../src/Components/Footer/Footer.js';
reactComponents['Footer'] = Component1;

import Component2 from '../src/Components/Header/Header.js';
reactComponents['Header'] = Component2;

import Component3 from '../src/Components/Login/Login.js';
reactComponents['Login'] = Component3;

import Component4 from '../src/Components/Layout/Layout.js';
reactComponents['MainLayout'] = Component4;

import Component5 from '../src/Components/Selector/Selector.js';
reactComponents['Selector'] = Component5;

import Component6 from '../src/Components/TextArea/TextArea.js';
reactComponents['TextArea'] = Component6;