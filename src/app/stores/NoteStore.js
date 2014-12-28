var Rx = require('rx'),
    localStore = require('../utils/store')

class NoteStore { 
  constructor() {
    var key = 'notes'
    this.updates = new Rx.BehaviorSubject(localStore(key))

    this.notes = this.updates.scan((notes, operation) => {
      return operation(notes);
    })

    this.notes.forEach((update) => {
      localStore(key, update)
    })
  }
}

module.exports = NoteStore