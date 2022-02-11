import '../style/Other.css';
import { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import Navbar from '../components/Navbar'
import MediaDisplay from '../components/MediaDisplay';
import SideLine from '../components/SideLine';
import MetaTags from 'react-meta-tags';
import TextDisplay from '../components/TextDisplay';

const BG_COLOR = "#000"
const TEXT_COLOR = "#fff"

class Other extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stick: false
        }
    }

    onScroll = () => {
        let stick = window.scrollY >= 70

        if (stick !== this.state.stick) {
            this.setState({ stick: stick })
        }
    }

    componentDidMount() {
        this.onScroll()
        window.addEventListener('scroll', this.onScroll);
    }

    render() {
        document.documentElement.style.setProperty('--bs-body-bg', BG_COLOR);
        document.documentElement.style.setProperty('--bs-body-color', TEXT_COLOR);

        let displays = []
        let media = this.props.media;
        let pageTag = "other"

        for (var i = 0; i < media.length; i++) {
            let current = media[i]
            let type = current.type

            if (type === "media") {
                displays.push(<MediaDisplay
                    data={current}
                    centered={false}
                    tag={pageTag}
                    viewable={false}
                    key={current.docId + i.toString()}
                />)
            } else if (type === "text") {
                displays.push(<TextDisplay
                    data={current}
                    tag={pageTag}
                    centered={false}
                    key={current.docId + i.toString()}
                />)
            }
        }

        return (
            <Fragment>
                <MetaTags>
                    <meta name="theme-color" content="#000000" />
                </MetaTags>

                <Navbar />

                <Col className="other">
                    <SideLine left="35px" stick={this.state.stick} />
                    <SideLine left="50px" stick={this.state.stick} desktopOnly />
                    {displays}
                </Col>
            </Fragment>
        )
    }
}

export default Other;