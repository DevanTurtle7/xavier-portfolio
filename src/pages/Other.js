import { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import Navbar from '../components/Navbar'
import MediaDisplay from '../components/MediaDisplay';

class Other extends Component {
    render() {
        let mediaDisplays = []
        let media = this.props.media;

        for (var i = 0; i < media.length; i++) {
            let current = media[i]

            mediaDisplays.push(<MediaDisplay
                data={current}
                key={i}
            />)

        }

        return (
            <Fragment>
                <Navbar />
                <Col className="other">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Other;