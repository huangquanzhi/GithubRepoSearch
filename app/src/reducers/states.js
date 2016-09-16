import {
  PULL_UP_VISIBLE,
  PULL_UP_SET_TITLE,
  NOTIFICATION_SHOW,
  NOTIFICATION_SET_MESSAGE
} from '../constants/states';

const initialState = {
  pullupBar_visible: false,
  pullupBar_title: "Search",
  notification: {
    visible: false,
    message: ''
  }
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
    case NOTIFICATION_SHOW:
      return Object.assign({}, state, {
        notification: Object.assign({}, state.notification, {
          visible: action.show
        })
      });
    case NOTIFICATION_SET_MESSAGE:
      return Object.assign({}, state, {
        notification: Object.assign({}, state.notification, {
          message: action.message
        })
      });
    default:
      return state;
  }
};

export default search;