'use strict';


// for NodeJS
import React from 'react';
import { render } from 'react-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider ,connect } from 'react-redux';

const Redux = {
    createStore,
    bindActionCreators,
}

const ReactRedux = {
    Provider,
    connect,
}

const ReactDOM = {
    render
}

const initialState = {
  todos: []
}
 
// reducer
// ******************************************************************************************************************
// Important!!! Object.assign({}, currentState, newTodo), `{}` must be at first parameters, it can't be currentState.
// ******************************************************************************************************************
function myReducer(currentState, action) {
  if(typeof currentState === 'undefined') {
    return initialState
  }
  else if(action.type === 'INCREMENT'){
    var newState = Object.assign({}, currentState)
    newState.todos.push(Math.ceil(Math.random()*20))
    // console.log(newState)
    return newState
  }
  else if(action.type === 'DECREMENT'){
    var newState = Object.assign({}, currentState)
    newState.todos.pop()
    return newState
  }
  else if(action.type === 'MODIFY'){
    var newState = Object.assign({}, currentState)
    newState.todos[action.index] = action.value
    return newState
  }
  else if(action.type === 'REMOVE'){
    var newState = Object.assign({}, currentState)
    newState.todos.splice(action.index, 1)
    return newState
  }

  return currentState
}

// presentation component
// `set refs` input tag's another handering way, ref: https://reactjs.org/docs/refs-and-the-dom.html#adding-a-ref-to-a-dom-element
const Counter = (props) => (
    <div>
    <button onClick={props.onIncrement}>Add</button>
    <button onClick={props.onDecrement}>Sub</button>
    <hr />
    {
        props.value.todos.map((obj, idx) => (
            <div key={idx}>
            <label>{idx}</label>
            &nbsp;
            <input value={obj} onChange={props.onChange(idx)} style={{width: 350}}/>
            &nbsp;
            <button onClick={props.onRemove(idx)}>Del</button>
        </div>
        ))
    }
    <pre>{JSON.stringify(props.value, null, 2)}</pre>
  </div>
)

var App = (props) => {
    return (
        <Counter
            value={props.value}
            onIncrement={() => props.onIncrement()}
            onDecrement={() => props.onDecrement()}
            onChange={(index) => (e) => props.onChange(index, e.target.value)}
            onRemove={(index) => () => props.onRemove(index)}
        />
    )
}

var mapStoreStateToProps = function(state){
    return {
    value: {
        todos: state.todos
    }
  }
}

var mapDispatchToProps = function(dispatch) {
    var actionCreators = {
    onIncrement: () => ({ type: 'INCREMENT' }),
    onDecrement: () => ({ type: 'DECREMENT' }),
    onChange: (index, value) => ({ type: 'MODIFY', index: index, value: value }),
    onRemove: (index) => ({ type: 'REMOVE', index: index }),
  }
  return Redux.bindActionCreators(actionCreators, dispatch)
}

/*
class App extends React.Component {
    render(){
        var props = this.props
        return (
            <Counter
                value={props.value}
                onIncrement={() => props.onIncrement({ type: 'INCREMENT' })}
                onDecrement={() => props.onDecrement({ type: 'DECREMENT' })}
                onModify={(index) => (e) => props.onModify({ type: 'MODIFY', index: index, value: e.target.value })}
                onRemove={(index) => () => props.onRemove({ type: 'REMOVE', index: index})}
            />
        )
    }
}
*/

App = ReactRedux.connect(mapStoreStateToProps, mapDispatchToProps)(App)

// store created from reducer
const store = Redux.createStore(myReducer)

/* store.subscribe(() => console.log(store.getState()) */

const root = document.getElementById('root')
// var Provider = ReactRedux.Provider;

const renderByRedux = () => ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    root
)

renderByRedux()
