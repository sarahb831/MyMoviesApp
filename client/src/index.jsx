import React from 'react';
import ReactDOM from 'react-dom';

// Import statement indicating need to bundle ./index.scss
import './index.scss';

// Main component
class myMoviesApplicaiton extends React.Component {
  render() {
    return(
      <div className = "my-movies">
        <div>Good morning</div>
      </div>
    );
  }
}
//Finds root of app
const container = document.getElementsByClassName('app-container')[0];
//Instructs React to render your app in root DOM element
ReactDOM.render(React.createELement(myMoviesApplication),container);
