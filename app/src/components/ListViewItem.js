import React, { Component, PropTypes } from 'react';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const propTypes = {
  data: PropTypes.object
};

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.handleImageOnClick = this.handleImageOnClick.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  handleImageOnClick() {
    const { data } = this.props;
    window.open(data.url, '_blank');
  }

  renderImage() {
    const { data } = this.props;
    return (
      <img src={data.img} alt="avatar_image" onClick={this.handleImageOnClick}/>
    )
  }

  render() {
    const { data } = this.props;
    return (
      <GridTile className="grid__view__item"
                key={data.img}
                title={data.title}
                subtitle={<span>Stars <b>{data.stars}</b> - Language <b>{data.language}</b></span>}
                actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
      >
        { this.renderImage() }
      </GridTile>
    );
  }
}

ListViewItem.propTypes = propTypes;

export default ListViewItem;