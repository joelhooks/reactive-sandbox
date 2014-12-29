var React           = require('react/addons'),
    ReactRouter     = require('react-router'),
    {Link}          = require('react-router'),
    di              = require('di'),
    _               = require('lodash');

var Footer = function() {
  return React.createClass({
        propTypes: {
            todoList: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        render: function() {
            console.log("RENDER:", this.props.todoList)
            var nbrcompleted = _.filter(this.props.todoList, "isComplete").length,
                nbrtotal = this.props.todoList.length,
                nbrincomplete = nbrtotal-nbrcompleted,
                clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
                footerClass = React.addons.classSet({hidden: !nbrtotal }),
                completedLabel = "Clear completed (" + nbrcompleted + ")",
                itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
            return (
                <footer id="footer" className={footerClass}>
                    <span id="todo-count"><strong>{nbrincomplete}</strong>{itemsLeftLabel}</span>
                    <ul id="filters">
                        <li>
                          <Link activeClassName="selected" to="All">All</Link>
                        </li>
                        <li>
                          <Link activeClassName="selected" to="Active">Active</Link>
                        </li>
                        <li>
                          <Link activeClassName="selected" to="Complete">Complete</Link>
                        </li>
                    </ul>
                    <button id="clear-completed" className={clearButtonClass} >{completedLabel}</button>
                </footer>
            );
        }
    });
}

di.annotate(Footer, new di.Inject());

module.exports = Footer;