var creds = require('./creds')
var _ = window._ = require('lodash');
var $ = window.jQuery = require('jquery');
var Rx = window.Rx = require('rx/dist/rx.all');
var Observable = Rx.Observable;

var results = $('.results');

var refreshButton = $('.refresh');
var refreshClickStream = Observable.fromEvent(refreshButton, 'click');

var requestStream = refreshClickStream
  .startWith('initial click')
  .map(function() {
    var offset = Math.floor(Math.random()*500);
    return 'https://api.github.com/users?since=' + offset;
  });

var responseStream = requestStream
  .flatMap(function(requestUrl) {
    function make_base_auth(user, password) {
      var tok = user + ':' + password;
      var hash = btoa(tok);
      return "Basic " + hash;
    }
    return Observable.fromPromise(
      $.ajax
        ({
          type: "GET",
          url: requestUrl,
          dataType: 'json',
          async: true,
          beforeSend: function (xhr){ 
              xhr.setRequestHeader('Authorization', make_base_auth(creds.username, creds.password)); 
          }
      }).promise()
    )
  })

var suggestion1Stream = responseStream
  .map(function(listUsers) {
    return _.first(_.shuffle(listUsers));
  })

var suggestion2Stream = responseStream
  .map(function(listUsers) {
    return _.first(_.shuffle(listUsers));
  })

var suggestion3Stream = responseStream
  .map(function(listUsers) {
    return _.first(_.shuffle(listUsers));
  })

function updateSuggestion(selector, suggestion) {
  var suggestionEl = $(selector),
   avatarEl = suggestionEl.find('img'),
   usernameEl = suggestionEl.find('.username');
  avatarEl.attr('src',suggestion.avatar_url);
  usernameEl.text(suggestion.login);
  usernameEl.attr('href', suggestion.html_url);
}

suggestion1Stream.subscribe(function(suggestion) {
  updateSuggestion('.suggestion1', suggestion)
})

suggestion2Stream.subscribe(function(suggestion) {
  updateSuggestion('.suggestion2', suggestion)
})

suggestion3Stream.subscribe(function(suggestion) {
  updateSuggestion('.suggestion3', suggestion)
})




