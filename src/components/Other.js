import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from './MenuButton';

class Other extends Component {
    render() {
        return (
            <Col>
                <MenuButton />
                <h1>Other</h1>
            </Col>
        )
    }
}

export default Other;