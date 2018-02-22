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

export default withRedux(initStore, null, mapDispatchToProps)(connect(state => state)(Index))
