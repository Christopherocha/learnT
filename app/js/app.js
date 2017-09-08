import React from 'react';
import ReactDOM from 'react-dom';

import Main from './components/Main.js';

class App extends React.Component{
    render(){
        return (
            <div>
                <Main/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
)