import {
    myReducer,
    mapDispatchToProps,
    mapStoreStateToProps,
    App
} from './app'

console.log({
    myReducer,
    mapDispatchToProps,
    mapStoreStateToProps,
    App
})

import React from 'react';
import { mount } from 'enzyme'
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

import colors from 'colors';

test('integration test sample', () => {
	const store = createStore(myReducer)
	const wrapper = mount(
		<Provider store={store}>
            <App />
        </Provider>,
	)
	console.log(colors.red(wrapper.html()))
	wrapper.find('button').first().simulate('click')
	wrapper.find('button').first().simulate('click')
	wrapper.find('button').first().simulate('click')
	console.log(colors.red(wrapper.html()))
	wrapper.find('button').first().simulate('click')
	console.log(colors.red(wrapper.html()))
	wrapper.find('button').filterWhere( n => n.text().includes('Del')).first().simulate('click')
	console.log(colors.red(wrapper.html()))
})