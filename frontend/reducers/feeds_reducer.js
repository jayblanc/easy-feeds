import { RECEIVE_FEEDS_RESULTS } from '../actions/discovery_actions';
import
  { RECEIVE_ALL_SUBSCRIPTIONS, REMOVE_FEED,
  RECEIVE_NEW_FEED, RECEIVE_FEED }
from '../actions/subscription_actions';
import { CLEAR_ENTITIES } from '../actions/session_actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const feedsById = (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FEEDS_RESULTS:
      newState = merge({}, state, action.feeds.byId);
      return newState;
    case RECEIVE_ALL_SUBSCRIPTIONS:
    case RECEIVE_FEED:
    case RECEIVE_NEW_FEED:
      newState = merge({}, state, action.feeds.byId, action.subscriptions.byId );
      return newState;
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
  }
};

const allFeedsResults = (state = [], action) => {
  Object.freeze(state);
  let newState;

  switch (action.type) {
    case RECEIVE_FEEDS_RESULTS:
      return action.results;
    case CLEAR_ENTITIES:
      return [];
    default:
      return state;
  }
};

const feedsReducer = combineReducers({
  byId: feedsById,
  results: allFeedsResults
});

export default feedsReducer;
