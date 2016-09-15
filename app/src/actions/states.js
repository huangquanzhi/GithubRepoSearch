import {
  PULL_UP_VISIBLE,
  PULL_UP_SET_TITLE
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