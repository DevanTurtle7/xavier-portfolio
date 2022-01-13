import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import MediaDisplay from '../components/MediaDisplay';
import CarouselDisplay from '../components/CarouselDisplay';
import Navbar from '../components/Navbar'

class Art extends Component {
    render() {
        let mediaDisplays = []
        let media = this.props.media;

        for (var i = 0; i < media.length; i++) {
            let current = media[i]

            mediaDisplays.push(<CarouselDisplay
                data={current}
                key={i}
            />)

        }

        return (
            <Fragment>
                <Navbar />
                <Col className="art">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;