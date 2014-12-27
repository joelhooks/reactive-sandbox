var React           = require('react/addons'),
    Rx              = require('rx');

var NoteView = React.createClass({

  componentWillMount: function() {
  },

  render: function() {
    return (
      <li>
        {this.props.note}
      </li>
    )
  }
})

module.exports = NoteView;