var Rx = require('rx');

var subject = new Rx.BehaviorSubject([]);
var subject2 = new Rx.Subject();
var subject3 = new Rx.Subject();

var updates = subject.scan((x, y) => {
  return y(x)
});

subject2.map(x => {
  return function(stuff) {
      return stuff.concat(x);
  }
}).subscribe(subject);


subject3.map(x => {
  return function(stuff) {
      return stuff.concat(x+2);
  }
}).subscribe(subject);

updates.forEach(x => {
  console.log('3', x)
})

subject2.onNext(2)
subject2.onNext(7)

subject3.onNext(4)
subject3.onNext(8)