import '../style/Other.css';
import { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import Navbar from '../components/Navbar'
import MediaDisplay from '../components/MediaDisplay';
import SideLine from '../components/SideLine';
import MetaTags from 'react-meta-tags';

class Other extends Component {
    render() {
        document.body.style.backgroundColor = "black"

        let mediaDisplays = []
        let media = this.props.media;

        for (var i = 0; i < media.length; i++) {
            let current = media[i]

            mediaDisplays.push(<MediaDisplay
                data={current}
                darkMode
                key={i}
            />)

        }

        return (
            <Fragment>
                <MetaTags>
                    <meta name="theme-color" content="#000000" />
                </MetaTags>

                <Navbar darkMode />

                <Col className="other">
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Other;