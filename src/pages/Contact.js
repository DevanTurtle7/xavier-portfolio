import { Component, Fragment } from 'react';
import { Col, Row } from 'reactstrap';
import Navbar from '../components/Navbar'

class Contact extends Component {
    render() {
        return (
            <Col>
                <Navbar />

                <a className="email" href="mailto: xaviersylviajackson@gmail.com">
                    xaviersylviajackson@gmail.com
                </a>
            </Col>
        )
    }
}

export default Contact;