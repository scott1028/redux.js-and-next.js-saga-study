import Link from 'next/link'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { connect } from 'react-redux'

import Navbar from '../components/navbar'
import { initStore } from '../stores/store'


class About extends React.Component {
    static getInitialProps({ store, isServer }){
        store.dispatch({
            type: 'INIT'
        });
        return store.getState();
    }
    constructor(props){
        super(props);
    }
    render(){
        var self = this;
        return (
            <div>
                <Navbar />
                <p>About Next.js = { self.props.value }</p>
                <Link href="/" prefetch>
                    <a>home</a>
                </Link>
                <hr />
                <button onClick={self.props.INCREMENT}>Add</button>
                <button onClick={self.props.DECREMENT}>Sub</button>
                <button onClick={self.props.RESET}>Reset</button>
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch){
    // Option-1: same effect when you use bindActionCreator
    // return {
    //     INCREMENT: () => dispatch({type: 'INCREMENT'}),
    //     DECREMENT: () => dispatch({type: 'DECREMENT'}),
    //     RESET: () => dispatch({type: 'RESET'}),
    // }

    // Option-2
    // using bindActionCreator to create it
    return bindActionCreators({
        INCREMENT: () => { return { type: 'INCREMENT' } },
        DECREMENT: () => { return { type: 'DECREMENT' } },
        RESET: () => { return { type: 'RESET' } },
    }, dispatch);
}

const mapStateToProps = function(state){
    // ref: https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    // choose required fields to optimize your state to props for best performation.
    // if return all fields of state from your store, you will get bad performance.
    // example:
    //   return { value: state.value }
    return { value: state.value }
}

// var c=bindActionCreators;
// debugger;

export default withRedux(initStore, null, mapDispatchToProps)(connect(mapStateToProps)(About))

// state => state equals to (state) => state
// 
// ref: https://github.com/zeit/next.js/blob/master/examples/with-redux/pages/index.js
// ref: https://github.com/zeit/next.js/blob/master/examples/with-redux/components/Page.js
// 
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// ref: https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
//
// ref: https://redux.js.org/api-reference/bindactioncreators
// ref: https://github.com/zeit/next.js#with-url-object
// ref: https://github.com/zeit/next.js#custom-server-and-routing
// ref: https://github.com/zeit/next.js/tree/canary/examples/with-next-routes
