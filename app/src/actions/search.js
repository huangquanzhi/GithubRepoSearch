import {
  LOAD_DATA,
  SEARCH_SET_SEARCHSTRING,
  SEARCH_SET_SEARCHSORT,
  SEARCH_SET_SEARCHORDER,
  SEARCH_RESULT_STATUS
} from '../constants/search';

import {
  GITHUB_SEARCH_REPOSITORIES
} from '../constants/settings';


const setSearchStatus = (success, message) => {
  return { type: SEARCH_RESULT_STATUS, success, message };
};

export const setSearchResult = (data) => {
  return { type: LOAD_DATA, data };
};

export const setSearchStrings = (value) => {
  return { type: SEARCH_SET_SEARCHSTRING, value };
};

export const setSearchSort = (sort) => {
  // if (typeof sort === 'number') {
  //   switch (sort) {
  //     case 0:
  //       sort = "STARS";
  //       break;
  //     case 1:
  //       sort = "FORKS";
  //       break;
  //     case 2:
  //       sort = "UPDATED";
  //       break;
  //     default:
  //       sort = null;
  //   }
  //   return { type: SEARCH_SET_SEARCHSORT, sort }
  // }

  return { type: SEARCH_SET_SEARCHSORT, sort }
};

export const setSearchOrder = (order) => {
  return { type: SEARCH_SET_SEARCHORDER, order }

};

const createQuery = (search, sort, order) => {
  let query;

  if (typeof search === 'string') {
    query = GITHUB_SEARCH_REPOSITORIES + "?q=";
    // split by empty space
    let searchItems = search.split(" ");
    // setting query
    searchItems.map((data, index) => {
      if (index === searchItems.length - 1) {
        query += data;
      } else {
        query += data + "+";
      }
    });

    // setting sort
    if (sort != null) {
      query += "&sort=" + sort;
    }
    // setting order
    query += "&order=" + order;
  }

  return query;
};

export const loadRepositories = (search, sort, order) => {
  return (dispatch, getState) => {
    // fetching from URL
    if (search != "") {
      let url = createQuery(search, sort, order);
      if (url) {
        fetch(url)
          .then((response) => {
            // reset search status and add loading
            dispatch(setSearchStatus(null, ""));
            if (response.status === 200) {
              return response.json();
            } else {
              dispatch(setSearchStatus(false, "Failed to get data from server. Request Code " + response.status))
            }
          })
          .then((data) => {
            if (data.total_count > 0) {
              dispatch(setSearchResult(data.items));
              dispatch(setSearchStatus(true, ""));
            } else {
              dispatch(setSearchStatus(false, "Results found: " + data.total_count));
            }
          });
      }
    } else {
      dispatch(setSearchStatus(false, "No search string set."));
      dispatch(setSearchResult([]));
    }
  }
};