import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FormContainer from './containers/FormContainer';

import * as apiActionCreator from './actions/search';



const propTypes = {
  config: PropTypes.object,
  searchActions: PropTypes.object
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main>
        <FormContainer/>
      </main>
    )
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchActions: bindActionCreators(apiActionCreator, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);