var React           = require('react/addons'),
    Router          = require('./app/router'),
    di              = require('di');

var injector = new di.Injector([]);

var router = injector.get(Router);

router.run((Handler) => {
  React.render(<Handler />, document.body);
});




