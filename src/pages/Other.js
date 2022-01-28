import '../style/Other.css';
import { Component, Fragment } from 'react';
import { Col } from 'reactstrap';
import Navbar from '../components/Navbar'
import MediaDisplay from '../components/MediaDisplay';
import SideLine from '../components/SideLine';

class Other extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stick: false
        }
    }

    onScroll = () => {
        let stick = window.scrollY >= 70

        if (stick != this.state.stick) {
            this.setState({stick: stick})
        }
    }

    componentDidMount() {
        this.onScroll()
        window.addEventListener('scroll', this.onScroll);
    }

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
                <Navbar darkMode />

                <Col className="other">
                    <SideLine left="40px" stick={this.state.stick} />
                    <SideLine left="50px" stick={this.state.stick} desktopOnly />
                    {mediaDisplays}
                </Col>
            </Fragment>
        )
    }
}

export default Other;