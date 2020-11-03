const React = require('react');
const ReactDOM = require('react-dom');

const App = require('./App');

const root = document.getElementById('react-root');

ReactDOM.render(<div>
  <App />
</div>, root);