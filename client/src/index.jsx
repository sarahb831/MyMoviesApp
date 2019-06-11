import React from 'react';
import ReactDOM from 'react-dom';

import MainView from './components/main-view/main-view';

// Import statement indicating need to bundle ./index.scss
import './index.scss';

// Main component
class myMoviesApplication extends React.Component {
  render() {
    return <MainView/>;
  }
}

//Find root of our app using this class name
const container = document.getElementsByClassName('app-container')[0];

//Instruct React to render our app in root DOM element
ReactDOM.render(React.createElement(myMoviesApplication),container);
