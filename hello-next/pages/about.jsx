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
                <button onClick={self.props.INCREMENT}>Add</button>
                <button onClick={self.props.DECREMENT}>Sub</button>
                <button onClick={self.props.RESET}>Reset</button>
            </div>
        )
    }
}

const mapDispatchToProps = function(dispatch){
    // same effect when you use bindActionCreator
    return {
        INCREMENT: () => dispatch({type: 'INCREMENT'}),
        DECREMENT: () => dispatch({type: 'DECREMENT'}),
        RESET: () => dispatch({type: 'RESET'}),
    }
}

// var c=bindActionCreators;
// debugger;

export default withRedux(initStore, null, mapDispatchToProps)(connect(state => state)(About))

// state => state equals to (state) => state
// 
// ref: https://github.com/zeit/next.js/blob/master/examples/with-redux/pages/index.js
// ref: https://github.com/zeit/next.js/blob/master/examples/with-redux/components/Page.js
// 
// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
// ref: https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
