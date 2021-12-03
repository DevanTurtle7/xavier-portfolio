import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from '../components/MenuButton';

class Sketchbook extends Component {
    render() {
        return (
            <Col>
                <MenuButton />
                <h1>Sketchbook</h1>
            </Col>
        )
    }
}

export default Sketchbook;