'use strict';

var React = require('react'),
  MyComponent = React.createClass({
    render: function () {
      return (
        <h1 className="MyComponent">Welcome to React!</h1>
      )
    }
  });

module.exports = MyComponent;