import { Component } from 'react';
import {
    Col, Row
} from 'reactstrap';

class ImageDisplay extends Component {
    render() {
        const image = require(`../images/${this.props.image}`).default

        return (
            <Row>
                <Col md={{ space: 6, offset: 3 }} className="w-50 my-4">
                    <Row>
                        <img src={image} alt='portrait' />
                    </Row>
                    <Row>
                        <p className="text-center">Image</p>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default ImageDisplay;