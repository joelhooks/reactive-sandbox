var React           = require('react/addons'),
    Rx              = require('rx'),
    NoteList        = require('./NoteList.jsx'),
    Header          = require('./Header.jsx');

var MainView = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    var notes = this.props.notes;
    notes
      .map((notes) => {
        return {
          notes: notes
        }
      })
      .subscribe(this.setState.bind(this))
  },

  render: function() {
    return (
      <div>
      <h1>This is just a test.</h1>
      <Header />
      <NoteList notes={this.state.notes} />
      </div>
    )
  }
})

module.exports = MainView;