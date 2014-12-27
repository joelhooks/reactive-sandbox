/**
 * @jsx React.DOM
 */

/*jshint node:true*/
'use strict';

var React           = require('react/addons'),
    Actions         = require('../actions/Actions'),
    EventHandler    = require('../utils/eventHandler');

var ENTER_KEY = 13;

var Header = React.createClass({
    componentWillMount: function () {
        var newFieldKeyDown = EventHandler.create();
        var enterEvent = newFieldKeyDown.filter(event => event.keyCode === ENTER_KEY)
        
        enterEvent.forEach(function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

        enterEvent
            .map(function (event) {
                return event.target.value.trim();
            })
            .filter(function (value) {
                return !!value;
            }).subscribe(Actions.create);

        enterEvent
            .forEach(function (event) {
                event.target.value = '';
            });
        

        this.handlers = {
            newFieldKeyDown: newFieldKeyDown
        };
    },
    
    render: function () {
        return (
            <header id="header">
                <h1>Notes</h1>
                <input
                    id="new-note"
                    placeholder="What needs to be remembered?"
                    autoFocus={true}
                    onKeyDown={this.handlers.newFieldKeyDown}
                />
            </header>
        );
    }
});

module.exports = Header;