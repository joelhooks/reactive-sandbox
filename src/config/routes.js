var Router = require('react-router'),
  Routes = Router.Routes,
  Route = Router.Route,
  React = require('react');

var TodoMain = React.createFactory(require('../app/components/todo/todo-main'));
var TodoApp = React.createFactory(require('../app/components/todo/todo-app'));

var routes = (
  <Routes location="history">
    <Route handler={TodoApp}>
      <Route name="/" handler={TodoMain} state="all" />
      <Route name="completed" state="completed" path="/completed" handler={TodoMain} />
      <Route name="active" path="/active" state="all" handler={TodoMain} />
    </Route>
  </Routes>
);
module.exports = routes;