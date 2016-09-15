import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FontIcon from 'material-ui/FontIcon';

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};

class PullupBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  handleOnClick(e) {
    const { onClick } = this.props;
    onClick(e);
  }

  renderContent() {
    const { children, open } = this.props;
    return (
      <div
        className={classNames({
        "pull-up-bar__content": true,
        "pull-bar__content_visible-show": open
        })}
      >
        { children }
      </div>
    )
  }

  render() {

    const { open, title } = this.props;

    return (
      <div className={classNames({
          "pull-up-bar": true,
          "pull-up-bar_visible-show": open
          })}>
        <div
          className={classNames({
            "pull-up-bar__heading": true,
            "pull-up-bar__heading_visible-show": open
          })}
          onClick={this.handleOnClick}>
          <h1> { title } </h1>
        </div>
        { this.renderContent()}
      </div>
    );
  }
}

PullupBar.propTypes = propTypes;

export default PullupBar;
