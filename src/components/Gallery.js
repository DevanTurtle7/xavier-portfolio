import { Component, Fragment } from 'react';
import {
    Col,
    Row,
    Container
} from 'reactstrap';
import Blackout from './Blackout';
import ImageDisplay from './ImageDisplay';
import MenuButton from './MenuButton';

class Gallery extends Component {
    render() {
        return (
            <Fragment>
                <Row className="justify-content-between mx-auto">
                    <Col xs={11}>
                        <Blackout text="Xavier Sylvia-Jackson" />
                    </Col>
                    <Col xs={1}>
                        <MenuButton />
                    </Col>
                </Row>

                <Col className="gallery">
                    <ImageDisplay image="image1.png" label="Image Title" year={2021} description="Description" />
                    <ImageDisplay image="image2.png" label="Painting" year={2020} description="Mixed media" />
                    <ImageDisplay image="image3.png" label="Another One" year={2019} description="Acrylic painting" />
                    <ImageDisplay image="image4.png" label="Final" year={2020} description="Sculpture" />
                </Col>
            </Fragment>
        )
    }
}

export default Gallery;