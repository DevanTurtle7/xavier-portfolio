/**
 * A header bar that contains navigation including the artists name and the
 * navigation menu. Also contains the component that animates the page's
 * <title> attribute.
 * 
 * Props:
 *  NONE
 * 
 * @author Devan Kavalchek
 */

import { Fragment } from 'react';
import { Col, Row } from 'reactstrap';

import Blackout from './Blackout';
import MenuButton from './MenuButton';
import BlackoutTitle from './BlackoutTitle';

const ARTIST_NAME = "xavier sylvia-jackson"

function Navbar(props) {
    return (
        <Fragment>
            <BlackoutTitle text={ARTIST_NAME} />

            <Row className="justify-content-between mx-auto navbar">
                <Col xs={11}>
                    <Blackout text={ARTIST_NAME} />
                </Col>
                <Col xs={1}>
                    <MenuButton />
                </Col>
            </Row>
        </Fragment>
    )
}

export default Navbar;