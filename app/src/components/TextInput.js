import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const propTypes = {
  hindText: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  onChangeAction: PropTypes.func,
};

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleOnchange = this.handleOnchange.bind(this);
  }

  handleOnchange(e) {
    const { onChangeAction } = this.props;
    onChangeAction(e.target.value);
  }

  render() {
    const { hindText, id, text } = this.props;
    return (
      <TextField
        id = {id}
        hintText={hindText}
        fullWidth={true}
        value={text}
        onChange={this.handleOnchange}
      />
    );
  }
}

TextInput.propTypes = propTypes;

export default TextInput;