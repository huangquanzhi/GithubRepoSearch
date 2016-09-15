import {
  PULL_UP_VISIBLE,
  PULL_UP_SET_TITLE
} from '../constants/states';

const initialState = {
  pullupBar_visible: false,
  pullupBar_title: "Search"
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case PULL_UP_VISIBLE:
      return Object.assign({}, state, {
        pullupBar_visible: action.open
      });
    case PULL_UP_SET_TITLE:
      return Object.assign({}, state, {
        pullupBar_title: action.title
      });
    default:
      return state;
  }
};

export default search;