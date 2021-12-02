import { Component, Fragment } from 'react';
import {
    Col,
    Row
} from 'reactstrap';
import ImageDisplay from './ImageDisplay';
import MenuButton from './MenuButton';

class Gallery extends Component {
    render() {
        return (
            <Fragment>
                <MenuButton />

                <Col>
                    <ImageDisplay image="image1.png" />
                    <ImageDisplay image="image2.png" />
                    <ImageDisplay image="image3.png" />
                    <ImageDisplay image="image4.png" />
                </Col>
            </Fragment>
        )
    }
}

export default Gallery;