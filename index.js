'use strict';
// 簡單介紹 Redux 的運作流程原理
// Object.assign:
// => 要注意順序愈後面的參數若出現相同的 Member 會覆蓋前者的結果，所以 current state 不能寫在最後面。

const redux = require('redux');


// Define Action factory and Actions
const ACTION_1 = 'action-1';
const ACTION_2 = 'action-2';
const ACTION_3 = 'action-3';

function createAction(type, data = null){
    return {
        type: type,
        data: data,
    }
};


// Define Reducer
function myReducer(state = {}, action){
    if(action.type === ACTION_1)
        return Object.assign({}, state, {
            action: action.type,
            data: action.data
        });
    if(action.type === ACTION_2)
        return Object.assign({}, state, {
            action: action.type,
            data: action.data
        });
    return state;
};


// Create Store by Reducer
let store = redux.createStore(myReducer);
console.log(`Init state of store:`, store.getState())


// Define Callback Action
let unsubscribe = store.subscribe(function(){
    console.log(store.getState());
});


// Trigger!!
// You can do ajax first and do createAction in callback block.
// ***All flow work unidirectional.***
//  => [The dispatcher creates a action at the moment.] -> [The Reducer of store creates next state.] -> [The subscriber invokes callback.]
store.dispatch(createAction(ACTION_1, '123'));
store.dispatch(createAction(ACTION_2));
store.dispatch(createAction(ACTION_3));


// release subscribe
unsubscribe();
