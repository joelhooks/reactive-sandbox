var Rx              = require('rx'),
    React           = require('react/addons'),
    MainView        = require('./views/MainView.jsx'),
    Actions         = require('./actions/Actions'),
    NoteStore       = require('./stores/NoteStore');

var store = new NoteStore('test');
Actions.register(store.updates);

React.renderComponent(
    MainView({ notes: store.notes }),
    document.getElementById('app')
); 




