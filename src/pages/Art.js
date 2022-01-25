import '../style/LightStyle.css';
import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar'

class Art extends Component {
    render() {
        document.body.style.backgroundColor = "white"

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
                <Col className="art">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;