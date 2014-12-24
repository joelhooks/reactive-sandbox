'use strict';

var React = require('react');
window.React = React;

var MyComponent = require('./components/mycomponent');

React.render( <MyComponent />, document.getElementById('content'));