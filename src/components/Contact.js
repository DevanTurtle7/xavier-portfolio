import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from './MenuButton';
import Blackout from './Blackout';

class Contact extends Component {
    render() {
        return (
            <Col>
                <MenuButton />
                <h1>Contact</h1>
                <Blackout text="Xavier Sylvia-Jackson"/>
            </Col>
        )
    }
}

export default Contact;