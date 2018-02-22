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
            <a>here</a>
        </Link>
    </div>
)

export default withRedux(initStore)(connect(state => state)(Index))
