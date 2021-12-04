import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import ImageDisplay from '../components/ImageDisplay';
import Navbar from '../components/Navbar'

class Admin extends Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
               <Navbar/>
               <h1>Admin</h1>
            </Fragment>
        )
    }
}

export default Admin;