import {
  LOAD_DATA,
  SEARCH_SET_SEARCHSORT,
  SEARCH_SET_SEARCHORDER,
  SEARCH_SET_SEARCHSTRING,
  SEARCH_RESULT_STATUS
} from '../constants/search';

const initialState = {
  searchStrings: '',
  searchSort: 'BEST',
  searchOrder: 'DESC',
  searchResults: [],
  searchResultStatus: {
    success: false,
    message: ''
  }
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return Object.assign({}, state, {
        searchResults: action.data
      });
    case SEARCH_SET_SEARCHSORT:
      return Object.assign({}, state, {
        searchSort: action.sort
      });
    case SEARCH_SET_SEARCHORDER:
      return Object.assign({}, state, {
        searchOrder: action.order
      });
    case SEARCH_SET_SEARCHSTRING:
      return Object.assign({}, state, {
        searchStrings: action.value
      });
    case SEARCH_RESULT_STATUS:
      return Object.assign({}, state, {
        searchResultStatus: Object.assign({}, state, {
          success: action.success,
          message: action.message
        }),
      });
    default:
      return state;
  }
};

export default search;