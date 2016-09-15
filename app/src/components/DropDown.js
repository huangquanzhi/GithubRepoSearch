import React, { Component, PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  data: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string
};

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  handleOnChange(e,i,v) {
    const { onChange } = this.props;
    onChange(e,i,v);
  }

  renderItems() {
    const { data } = this.props;

    return data.map((value, index) => {
      return <MenuItem key={value + "_" + index} value={value} primaryText={value}/>
    })
  }

  render() {
    const { value } = this.props;
    return (
      <SelectField className="select-field__menu" value={value} onChange={this.handleOnChange}>
        { this.renderItems() }
      </SelectField>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;