import { Component } from 'react';
import {
    Col, Row
} from 'reactstrap';

class ImageDisplay extends Component {
    render() {
        const image = require(`../images/${this.props.image}`).default

        return (
            <Row className="justify-content-center">
                <Col xs={7} lg={5} className="image-display my-4">
                    <Row>
                        <img src={image} alt='portrait' />
                    </Row>
                    <Row>
                        <p className="text-center mb-0 mt-2">
                            <b>{this.props.label}</b>
                            , {this.props.year}
                        </p>
                    </Row>
                    <Row>
                        <p className="text-center">{this.props.description}</p>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default ImageDisplay;