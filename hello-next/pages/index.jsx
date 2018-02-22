import Link from 'next/link'
import withRedux from 'next-redux-wrapper'
import { connect } from 'react-redux'

import Navbar from '../components/navbar'
import { initStore } from '../stores/store'


const Index = (props) => (
    <div>
        <Navbar />
        <p>Hello Next.js = { props.value }</p>
        <Link href="/about" prefetch>
            <a>about</a>
        </Link>
        <hr />
        <button onClick={props.DECREMENT}>Sub</button>
    </div>
)

const mapDispatchToProps = function(dispatch){
    // same effect when you use bindActionCreator
    return {
        DECREMENT: () => dispatch({type: 'DECREMENT'}),
    }
}

const mapStateToProps = function(state){
    // ref: https://github.com/reactjs/react-redux/blob/master/docs/api.md#inject-dispatch-and-every-field-in-the-global-state
    // choose required fields to optimize your state to props for best performation.
    // if return all fields of state from your store, you will get bad performance.
    // example:
    //   return { value: state.value }
    return { value: state.value }
}

export default withRedux(initStore, null, mapDispatchToProps)(connect(mapStateToProps)(Index))
