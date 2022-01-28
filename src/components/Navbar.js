import { Component, Fragment } from 'react';
import {
    Col,
    Row,
} from 'reactstrap';
import Blackout from './Blackout';
import MenuButton from './MenuButton';
import BlackoutTitle from './BlackoutTitle';

class Navbar extends Component {
    render() {
        let darkMode = this.props.darkMode === true
        let classNames = "justify-content-between mx-auto navbar"

        if (darkMode) {
            classNames += " dark-mode"
        }

        return (
            <Fragment>
                <BlackoutTitle text="xavier sylvia-jackson" />

                <Row className={classNames}>
                    <Col xs={11}>
                        <Blackout text="xavier sylvia-jackson" darkMode={darkMode} />
                    </Col>
                    <Col xs={1}>
                        <MenuButton darkMode={darkMode} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default Navbar;