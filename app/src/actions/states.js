import {
  PULL_UP_VISIBLE,
  PULL_UP_SET_TITLE,
  NOTIFICATION_SHOW,
  NOTIFICATION_SET_MESSAGE
} from '../constants/states';


export const showPullupBar = (open) => {
  if (typeof open === 'boolean') {
    return { type: PULL_UP_VISIBLE, open };
  }
  return { type: null };
};

export const setPullupBarTitle = (title) => {
  return { type: PULL_UP_SET_TITLE, title };
};

export const showNotification = (show) => {
  if (typeof show === 'boolean') {
    return { type: NOTIFICATION_SHOW, show };
  }
  return { type: null };
};

export const setNitificationMessage = (message) => {
  return { type: NOTIFICATION_SET_MESSAGE, message };
};