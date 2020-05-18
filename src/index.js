import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import Assistant from "./util/assistant";
import * as serviceWorker from './serviceWorker';

window.addEventListener("load" , () => {
    window.interactiveCanvas.getHeaderHeightPx().then((headerHeight) => {
        window.headerHeight= headerHeight;
        document.body.style.marginTop = `${headerHeight}px`;    })
});


ReactDOM.render(
  <React.StrictMode>
    <App  ref={(ourComponent) => {window.app = ourComponent}}/>
  </React.StrictMode>,
  document.getElementById('root')
);


const assistant = new Assistant();
assistant.setCallbacks();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
