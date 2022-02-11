import { Component, Fragment } from 'react';
import {
    Col,
} from 'reactstrap';
import MediaDisplay from '../components/MediaDisplay';
import Navbar from '../components/Navbar';
import MetaTags from 'react-meta-tags';
import TextDisplay from '../components/TextDisplay';

const BG_COLOR = "#fff"
const TEXT_COLOR = "#000"

class Art extends Component {
    render() {
        document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
        document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);

        let displays = []
        let media = this.props.media;
        let pageTag = "art"

        for (var i = 0; i < media.length; i++) {
            let current = media[i]
            let type = current.type

            if (type === "media") {
                displays.push(<MediaDisplay
                    data={current}
                    tag={pageTag}
                    viewable={true}
                    key={current.docId + i.toString()}
                />)
            } else if (type === "text") {
                displays.push(<TextDisplay
                    data={current}
                    tag={pageTag}
                    key={current.docId + i.toString()}
                />)
            }
        }

        return (
            <Fragment>
                <MetaTags>
                    <meta name="theme-color" content="#ffffff" />
                </MetaTags>

                <Navbar />
                <Col className="art">
                    {displays}
                </Col>
            </Fragment>
        )
    }
}

export default Art;