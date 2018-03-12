'use strict';
//
// 簡單介紹 Redux & Redux-Saga 的運作流程原理
// >> Saga is a redux middleware, it works like reducer and be charged in listening action and invoking callback of action.
// >> 可再搭配 redux-saga-thunk 讓 Action 被 Dispatch 之後 Return 一個 Promise 把 Saga Function 中 Trigger 的 Action 相關資訊用
// >> Promise 傳回給調用 dispatch 的程式碼處!!!
// >>   store.dispatch(action).then((payload) => { ... });
// >>
// >> Ref: https://github.com/diegohaz/redux-saga-thunk
//


// saga 部份[Start]
const saga = require('redux-saga');
const sagaFunc = require('redux-saga/effects');

// create saga middleware for store of redux
const sagaMiddleware = saga.default()

// define saga function
function* rootSaga() {
    // using synchronous func take
    // while(true){
    //     yield take('INCREMENT_ASYNC')
    //     yield delay(1000)
    //     yield put({ type: 'INCREMENT' })
    // }
    //
    // or
    //
    // only saga catch this action
    yield sagaFunc.takeEvery(ACTION_SAGA, function* (arg1, arg2, arg3, actionObj){
        // test saga func passed parameters
        // Ref: https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args
        console.log('[test saga func passed parameters]', [arguments]);
        console.log("\r\n", arg1, arg2, arg3, actionObj, "\r\n");

        // get from store.dispatch ACTION_SAGA
        console.log(`[takeEvery start]`, actionObj);

        // a async trick, wait 1.5 seconds
        yield saga.delay(1500)
        
        // test normal function
        var result1 = yield sagaFunc.call(function (val) { return val + 10 }, 100)
        console.log(result1, (new Date()).getTime());
        yield saga.delay(1500)

        // test normal function return a promise
        var result2 = yield sagaFunc.call(function (val) {
            return new Promise(function (res, rej) {
                res(val + 200)
            }).then(function (data) {
                return data + 50
            })
        }, 100)
        console.log(result2, (new Date()).getTime());
        yield saga.delay(1500)

        // test generator function
        var result3 = yield sagaFunc.call(function* (val) {
            var result = yield val + 10;
            return result;
        }, -100)
        console.log(result3, (new Date()).getTime());
        yield saga.delay(1500)

        // equals store.dispatch({ type: ACTION_2, data: 'triggered-from-saga-123' })
        yield sagaFunc.put(createAction(ACTION_2, `triggered-from-saga-123_${(new Date()).getTime()}`))
    }, { arg: 1 }, { arg: 2 }, { arg: 3})

    // [Define to listen another action here]
    // yield sagaFunc.takeEvery(ACTION_1, function* (actionObj) {
    //     // both saga and reducer catch this action
    //     console.log(`[takeEvery start]`, actionObj);
    // })
}
// saga 部份[End]

const redux = require('redux');

// Define Action factory and Actions
const ACTION_1 = 'action-1';
const ACTION_2 = 'action-2';
const ACTION_3 = 'action-3';
const ACTION_SAGA = 'action-SAGA';


// Define Actions factory
// In advanced topic, you can use `Redux Thunk middleware` to create a asynchronous action by action factory for async actions.
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

    // ACTION-SAGA will go through here then passed to saga middleware.
    // console.log(`[Other Actions received by reducer]`, action)
    return state;
};


// Create Store by Reducer
let store = redux.createStore(myReducer, redux.applyMiddleware(sagaMiddleware));
console.log(`Init state of store:`, store.getState())


// saga 部份[Start]
// startup saga, it must be after store created.
sagaMiddleware.run(rootSaga);
// saga 部份[End]


// Define Callback Action
let unsubscribe = store.subscribe(function(){
    console.log(store.getState());
});


// Trigger!!
// You can do ajax first and do createAction in callback block.
// ***All flow work unidirectional.***
//  => [The dispatcher creates a action at the moment.] -> [The Reducer of store creates next state.] -> [The subscriber invokes callback.]
store.dispatch(createAction(ACTION_1, `hello-${(new Date()).getTime()}`));
store.dispatch(createAction(ACTION_2));
store.dispatch(createAction(ACTION_3));
store.dispatch(createAction(ACTION_SAGA, `hi-saga-${(new Date()).getTime()}`));


// release subscribe & wait saga async function finish due to testcase
unsubscribe();
