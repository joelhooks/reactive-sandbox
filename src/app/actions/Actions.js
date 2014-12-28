var Rx = require('rx'),
    di = require('di'),
    NoteStore = require('../stores/NoteStore');

class Actions {
  constructor(NoteStore) {
    this.updates = NoteStore.updates;
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

di.annotate(Actions, new di.Inject(NoteStore));

module.exports = Actions;