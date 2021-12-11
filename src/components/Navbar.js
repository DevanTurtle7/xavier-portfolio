import { Component } from 'react';
import {
    Col,
    Row,
} from 'reactstrap';
import Blackout from './Blackout';
import MenuButton from './MenuButton';

class Navbar extends Component {
    render() {
        return (
            <Row className="justify-content-between mx-auto navbar">
                <Col xs={11}>
                    <Blackout text="xavier Sylvia-Jackson" />
                </Col>
                <Col xs={1}>
                    <MenuButton />
                </Col>
            </Row>
        )
    }
}

export default Navbar;