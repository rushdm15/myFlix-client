// client/src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { MainView } from './components/main-view/main-view';
import { Button } from "@blueprintjs/core";

// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

// Main component (will eventually use all the others) 
class MyFlixApplication extends React.Component {
    render() {
        return <MainView />;
        // return (
        //     <div className="my-flix">
        //       <Button intent="success" text="button content" onClick={incrementCounter} />
        //     </div>
        //   );
    }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication),
    container);


