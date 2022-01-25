import '../style/LightStyle.css';
import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar';
import MetaTags from 'react-meta-tags';

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
                <MetaTags>
                    <meta name="theme-color" content="#ffffff" />
                </MetaTags>

                <Navbar />
                <Col className="art">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;