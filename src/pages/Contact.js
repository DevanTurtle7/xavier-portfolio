import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from '../components/MenuButton';
import Blackout from '../components/Blackout';

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