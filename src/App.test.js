import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter as Router } from 'react-router-dom'
import App from './App';

it('renders without crashing', () => {
  const context = {}
  ReactDOM.render(
    <Router context={context}>
      <App />
    </Router>,
    document.createElement('div')
  );
});
