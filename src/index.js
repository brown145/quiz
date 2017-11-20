import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// TODO: look into bundlers - https://react.semantic-ui.com/usage#bundlers
import 'semantic-ui-css/semantic.min.css';
import './css/app.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
