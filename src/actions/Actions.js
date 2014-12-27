var Rx = require('rx');

class Actions {
  register(updates) {
    this.updates = updates;
    this.create = new Rx.Subject();
    this.init();
  }

  init() {
    this.create
      .map(function (title) {
        return function (notes) {
          return notes.concat({
            title: title
          });
        };
      })
      .subscribe(this.updates);
  }
}

module.exports = new Actions();