import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from './MenuButton';

class Contact extends Component {
    render() {
        return (
            <Col>
                <MenuButton />
                <h1>Contact</h1>
            </Col>
        )
    }
}

export default Contact;