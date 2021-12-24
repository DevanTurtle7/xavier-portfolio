import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import ImageDisplay from '../components/ImageDisplay';
import VideoDisplay from '../components/VideoDisplay';
import Navbar from '../components/Navbar'

class Art extends Component {
    render() {
        let mediaDisplays = []
        let media = this.props.media;

        for (var i = 0; i < media.length; i++) {
            let current = media[i]
            let type = current.type

            if (type === "image") {
                mediaDisplays.push(<ImageDisplay
                    data={current}
                    key={i}
                />)
            } else if (type === "video") {
                mediaDisplays.push(<VideoDisplay
                    data={current}
                    key={i}
                />)
            }
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