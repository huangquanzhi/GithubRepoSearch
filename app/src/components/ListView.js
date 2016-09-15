import React, { Component, PropTypes } from 'react';
import { GridList } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

import ListViewItem from './ListViewItem';

const propTypes = {
  cols: PropTypes.number,
  data: PropTypes.array,
};

class ListView extends Component {
  constructor(props) {
    super(props);
    this.loadListviewData = this.loadListviewData.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  loadListviewData() {
    const { data } = this.props;

    let listViewData = [];

    data.map((repo, index) => {
      listViewData.push({
        img: repo.owner.avatar_url,
        title: repo.full_name,
        author: repo.owner.login,
        url: repo.html_url,
        forks: repo.forks,
        stars: repo.stargazers_count,
        watchers: repo.watchers,
        language: repo.language
      })
    });

    return listViewData;
  }

  renderItems() {
    const { data } = this.props;

    return this.loadListviewData().map((repo, index) => {
      return <ListViewItem key={index} data={repo}/>
    })
  }

  render() {
    const { cols } = this.props;
    return (
      <GridList
        cols={cols}
        className="grid__view"
        cellHeight={300}>
        { this.renderItems() }
      </GridList>
    );
  }
}

ListView.propTypes = propTypes;

export default ListView;