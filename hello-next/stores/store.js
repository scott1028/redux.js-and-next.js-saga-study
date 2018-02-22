'use strict';


import { createStore, applyMiddleware } from 'redux'


function myReducer(state = {
  value: 0
}, action = {}) {
  console.log(action);
  switch (action.type) {
    case 'INCREMENT':
      return Object.assign({}, state, {
        value: state.value + 1
      });
    case 'DECREMENT':
      return Object.assign({}, state, {
        value: state.value - 1
      });
    case 'RESET':
      return Object.assign({}, state, {
        value: 0
      });
    case 'INIT':
      return state;
    default:
      return state;
  }
}

export const initStore = (initialState = myReducer()) => {
  return createStore(myReducer, initialState)
}
