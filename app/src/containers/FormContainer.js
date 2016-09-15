import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LOADING_SPINNER_TIMEOUT } from '../constants/settings';

import * as searchActionCreator from '../actions/search';
import * as statesActionCreator from '../actions/states';

import TextInput from '../components/TextInput';
import ListView from '../components/ListView';
import Dropdown from '../components/DropDown';
import PullupBar from '../components/PullupBar';


const propTypes = {
  search: PropTypes.object,
  searchActions: PropTypes.object,
  states: PropTypes.object,
  statesActions: PropTypes.object,
};

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.getOrderList = this.getOrderList.bind(this);
    this.getSortList = this.getSortList.bind(this);
    this.renderSpinner = this.renderSpinner.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.renderPullUpBar = this.renderPullUpBar.bind(this);
    this.handleOrderOnChange = this.handleOrderOnChange.bind(this);
    this.handleSortOnChange = this.handleSortOnChange.bind(this);
    this.handleSearchOnChange = this.handleSearchOnChange.bind(this);
    this.handlePullupBarClick = this.handlePullupBarClick.bind(this);
  }

  componentDidMount() {
    setTimeout(()=> {
      this.loading = false;
      this.searchChanged = false;
      this.forceUpdate();
    }, LOADING_SPINNER_TIMEOUT);
  }

  getOrderList() {
    return ["DESC", "ASC"]
  }

  getSortList() {
    return ["BEST", "STARS", "FORKS", "UPDATED"];
  }

  renderSpinner() {
    return (
      <div>
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      </div>
    )
  }

  handleOrderOnChange(e, i, v) {
    const { searchActions } = this.props;
    searchActions.setSearchOrder(v);
    this.searchChanged = true;
  }

  handleSortOnChange(e, i, v) {
    const { searchActions } = this.props;
    searchActions.setSearchSort(v);
    this.searchChanged = true;
  }

  handleSearchOnChange(value) {
    const { searchActions } = this.props;
    searchActions.setSearchStrings(value);
    this.searchChanged = true;
  }

  handlePullupBarClick(e) {
    const { search, searchActions, states, statesActions } = this.props;
    if (search.searchStrings !== "") {
      if (this.searchChanged) {
        searchActions.loadRepositories(search.searchStrings, search.searchSort, search.searchOrder);
        this.searchChanged = false;
      }
      // set pull up bar title
      (!states.pullupBar_visible) ?
        statesActions.setPullupBarTitle("Close")
        :
        statesActions.setPullupBarTitle("Search");

      statesActions.showPullupBar(!states.pullupBar_visible);
      e.stopPropagation();
    }
  }

  renderPullUpBar() {
    const { search, states } = this.props;

    const searchStatus = search.searchResultStatus;

    let renderElement = "";

    if (searchStatus.success) {
      renderElement = <ListView cols={3} data={search.searchResults }/>;
    } else if (searchStatus.success == false) {
      renderElement = <h1>{searchStatus.message}</h1>;
    } else {
      renderElement = this.renderSpinner();
    }

    return (
      <PullupBar
        onClick={this.handlePullupBarClick}
        open={states.pullupBar_visible}
        title={states.pullupBar_title}
      >
        {renderElement}
      </PullupBar>
    )
  }

  renderForm() {
    const { search } = this.props;

    return (
      <div id="main__form">
        <div id="main__form__elements">
          <div id="main__form__elements__logo">
            <img
              src="https://assets-cdn.github.com/images/modules/logos_page/Octocat.png"
              width="300" height="300"
              alt="github"/>
          </div>
          <div id="main__form__elements__input">

            <div>
              <TextInput
                id="form__search_input"
                onChangeAction={this.handleSearchOnChange}
                value={search.searchString}
                hindText="Search For ... "/>
            </div>
            <div>
              <Dropdown
                data={this.getSortList()}
                value={search.searchSort}
                onChange={this.handleSortOnChange}
              />
            </div>
            <div>
              <Dropdown
                data={this.getOrderList()}
                value={search.searchOrder}
                onChange={this.handleOrderOnChange}
              />
            </div>

          </div>

        </div>
        { this.renderPullUpBar() }
      </div>
    )
  }

  render() {
    if (!this.loading) {
      return this.renderForm();
    }
    return this.renderSpinner();
  }
}

FormContainer.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    search: state.search,
    states: state.states
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(searchActionCreator, dispatch),
    statesActions: bindActionCreators(statesActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);