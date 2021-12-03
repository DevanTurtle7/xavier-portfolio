import { Component } from 'react';
import {
    Col, Row
} from 'reactstrap';

class ImageDisplay extends Component {
    render() {
        const image = require(`../images/${this.props.image}`).default

        return (
            <Row className="justify-content-center mx-auto">
                <Col xs={9} md={7} lg={5} className="image-display my-4">
                    <Row className="mx-auto">
                        <img src={image} alt='portrait'/>
                    </Row>
                    <Row className="mx-auto">
                        <p className="image-description mb-0 mt-2">
                            {this.props.label}, {this.props.year}
                        </p>
                    </Row>
                    <Row className="image-description mx-auto">
                        <p>{this.props.description}</p>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default ImageDisplay;