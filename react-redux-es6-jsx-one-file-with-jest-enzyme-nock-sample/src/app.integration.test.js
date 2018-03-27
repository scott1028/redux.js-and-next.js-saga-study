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

import nock from 'nock';
import React from 'react';
import { mount } from 'enzyme'
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

import toJson from 'enzyme-to-json'

import colors from 'colors';


it('integration test sample', (done) => {
    // setTimeout(function(){
    //     console.log(111);
    // }, 3000)
    const store = createStore(myReducer)
    const wrapper = mount(
        <Provider store={store}>
            <App />
        </Provider>,
    )

    console.log(colors.red(wrapper.html()))
    
    nock('http://www.example.com').get('/a1').reply(200, { mockSuccess: true })
    wrapper.find('button').first().simulate('click')
    nock('http://www.example.com').get('/a1').reply(200, { mockSuccess: true });
    wrapper.find('button').first().simulate('click')
    nock('http://www.example.com').get('/a1').reply(200, { mockSuccess: true });
    wrapper.find('button').first().simulate('click')
    
    // trigger catch of fetch
    wrapper.find('button').first().simulate('click')

    setTimeout(function(){
        console.log(colors.red(wrapper.html()))
        wrapper.update()  // due to state update, you have to re-render wrapper
        wrapper.find('button').last().simulate('click')
        console.log(colors.red(wrapper.html()))
        expect(toJson(wrapper)).toMatchSnapshot()
        done();
    }, 1000)
})