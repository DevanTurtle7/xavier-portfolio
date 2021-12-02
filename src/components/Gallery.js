import { Component } from 'react';
import {
    Col
} from 'reactstrap';
import MenuButton from './MenuButton';

class Gallery extends Component {
    render() {
        return (
            <Col>
                <MenuButton />
                <h1>Gallery</h1>
            </Col>
        )
    }
}

export default Gallery;