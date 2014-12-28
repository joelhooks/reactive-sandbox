var Rx = require('rx'),
    di = require('di'),
    NoteStore = require('../stores/NoteStore'),
    _ = require('lodash');

class Actions {
  constructor(NoteStore) {
    this.updates = NoteStore.updates;
    this.create = new Rx.Subject();
    this.complete = new Rx.Subject();
    this.init();
  }
  init() {
    this.create
      .map((title) => {
        return (notes) => {
          return notes.concat({
            title: title
          });
        };
      })
      .subscribe(this.updates);

    this.complete
      .map((title) => {
        return (notes) => {
          return _.reject(notes, (note) => title === note.title )
        }
      })
      .subscribe(this.updates);
  }
}

di.annotate(Actions, new di.Inject(NoteStore));

module.exports = Actions;