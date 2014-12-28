var React           = require('react/addons'),
    MainView        = require('./views/MainView.jsx'),
    { Route }       = require('react-router'),
    di              = require('di');

var Routes = (MainView) => {
   return (
    <Route handler={MainView} />
  )
 }

di.annotate(Routes, new di.Inject(MainView));

module.exports = Routes